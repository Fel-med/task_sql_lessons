(function () {
  const FOUNDATION_CITY_ID = "foundation-city";
  const DATA_PREP_CITY_ID = "data-prep-city";
  const LOCKED_ISLAND_MESSAGE_KEY = "sqlKingdomLockedIslandMessage";
  const LOCKED_BUILDING_MESSAGE_KEY = "sqlKingdomLockedBuildingMessage";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getProgressApi() {
    return window.SQLKingdomProgress;
  }

  function cityKeyFromId(cityId) {
    return cityId.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  function dispatchProgressEvent(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function getCityDefaultProgress(cityId) {
    const progressApi = getProgressApi();
    const defaults = progressApi?.createDefaultProgress?.() || {};

    if (cityId === FOUNDATION_CITY_ID) {
      return {
        buildings: clone(defaults.buildings || {}),
        badges: {
          sqlFoundations: false
        }
      };
    }

    if (cityId === DATA_PREP_CITY_ID) {
      return clone(defaults.cities?.dataPrepCity || {});
    }

    return clone(defaults.cities?.[cityKeyFromId(cityId)] || {});
  }

  function resetGlobalProgress() {
    const progressApi = getProgressApi();
    if (!progressApi) return null;
    return progressApi.resetAllProgress();
  }

  function resetFoundationCity(progress) {
    const foundationDefaults = getCityDefaultProgress(FOUNDATION_CITY_ID);
    progress.buildings = foundationDefaults.buildings;
    progress.badges = {
      ...(progress.badges || {}),
      ...foundationDefaults.badges
    };
    return progress;
  }

  function resetCityProgress(cityId) {
    const progressApi = getProgressApi();
    if (!progressApi) return null;

    const progress = progressApi.getGameProgress();

    if (cityId === FOUNDATION_CITY_ID) {
      resetFoundationCity(progress);
    } else {
      progress.cities = progress.cities || {};
      progress.cities[cityKeyFromId(cityId)] = getCityDefaultProgress(cityId);
    }

    return progressApi.saveGameProgress(progress);
  }

  function handleResetByMode({ resetMode = "global", cityId = "" } = {}) {
    const isLocalReset = resetMode === "local";
    const progress = isLocalReset ? resetCityProgress(cityId) : resetGlobalProgress();
    const message = isLocalReset ? "This city was reset." : "Progress reset.";

    dispatchProgressEvent("sqlKingdom:reset", {
      progress,
      message,
      resetMode,
      cityId
    });

    return {
      progress,
      message,
      resetMode,
      cityId
    };
  }

  function guardIslandAccess(islandId, redirectUrl = "index.html") {
    const progressApi = getProgressApi();
    if (!progressApi || islandId === FOUNDATION_CITY_ID) return true;

    if (progressApi.isIslandUnlocked(islandId)) return true;

    try {
      sessionStorage.setItem(LOCKED_ISLAND_MESSAGE_KEY, "This island is still locked.");
    } catch (error) {
      // Session storage can be unavailable in strict browser modes; redirect still protects access.
    }

    if (!window.location.pathname.endsWith(redirectUrl)) {
      window.location.replace(redirectUrl);
    }

    return false;
  }

  function guardDataPrepBuildingAccess(buildingId, redirectUrl = "index_city_2.html", message = "Complete Filter Factory first.", islandRedirectUrl = "index.html") {
    const progressApi = getProgressApi();
    if (!progressApi) return true;

    if (!guardIslandAccess(DATA_PREP_CITY_ID, islandRedirectUrl)) return false;
    if (progressApi.isDataPrepBuildingUnlocked?.(buildingId)) return true;

    try {
      sessionStorage.setItem(LOCKED_BUILDING_MESSAGE_KEY, message);
    } catch (error) {
      // Access protection should still work if session storage is blocked.
    }

    if (!window.location.pathname.endsWith(redirectUrl)) {
      window.location.replace(redirectUrl);
    }

    return false;
  }

  function consumeGuardMessage() {
    try {
      const message = sessionStorage.getItem(LOCKED_BUILDING_MESSAGE_KEY) || sessionStorage.getItem(LOCKED_ISLAND_MESSAGE_KEY) || "";
      sessionStorage.removeItem(LOCKED_BUILDING_MESSAGE_KEY);
      sessionStorage.removeItem(LOCKED_ISLAND_MESSAGE_KEY);
      return message;
    } catch (error) {
      return "";
    }
  }

  window.SQLKingdomResetSystem = {
    FOUNDATION_CITY_ID,
    DATA_PREP_CITY_ID,
    getCityDefaultProgress,
    resetGlobalProgress,
    resetCityProgress,
    guardIslandAccess,
    guardDataPrepBuildingAccess,
    handleResetByMode,
    consumeGuardMessage
  };
})();

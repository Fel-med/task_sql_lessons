(function () {
  const STORAGE_KEY = "sqlCityProgress";
  const FOUNDATION_ISLAND_ID = "foundation-city";
  const DATA_PREP_ISLAND_ID = "data-prep-city";
  const DATAWORKS_CITADEL_ISLAND_ID = "dataworks-citadel";
  const PLAYABLE_ISLAND_IDS = [
    FOUNDATION_ISLAND_ID,
    DATA_PREP_ISLAND_ID,
    DATAWORKS_CITADEL_ISLAND_ID
  ];
  const DATA_PREP_BUILDING_ORDER = [
    "filterFactory",
    "summaryTower",
    "joinJunction",
    "subqueryMines",
    "cleaningClinic"
  ];
  const PLAYABLE_DATA_PREP_BUILDING_IDS = ["filterFactory", "summaryTower", "joinJunction", "subqueryMines", "cleaningClinic"];
  const DATAWORKS_CITADEL_BUILDING_ORDER = [
    "rankingObservatory",
    "schemaArchitectHall",
    "featurePipelineWorks",
    "sqlalchemyEngineRoom"
  ];
  const PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS = [...DATAWORKS_CITADEL_BUILDING_ORDER];
  const UNLOCK_MESSAGES = {
    [DATA_PREP_ISLAND_ID]: "New island unlocked: Data Prep City!",
    [DATAWORKS_CITADEL_ISLAND_ID]: "New island unlocked: Dataworks Citadel!"
  };

  const BUILDING_DEFAULTS = {
    dataVault: {
      unlocked: true,
      completed: false,
      newlyUnlocked: false,
      entered: false,
      quizPassed: false,
      discoveredMarkers: [],
      highestRoomUnlocked: 0
    },
    tableDepartment: {
      unlocked: false,
      completed: false,
      newlyUnlocked: false,
      entered: false,
      quizPassed: false,
      discoveredMarkers: [],
      highestRoomUnlocked: 0
    },
    keyBridgeHall: {
      unlocked: false,
      completed: false,
      newlyUnlocked: false,
      entered: false,
      quizPassed: false,
      discoveredMarkers: [],
      highestRoomUnlocked: 0
    },
    queryLab: {
      unlocked: false,
      completed: false,
      newlyUnlocked: false,
      entered: false,
      quizPassed: false,
      discoveredMarkers: [],
      highestRoomUnlocked: 0
    }
  };

  const DATA_PREP_BUILDING_DEFAULTS = {
    filterFactory: {
      unlocked: true,
      completed: false,
      reward: ""
    },
    summaryTower: {
      unlocked: false,
      completed: false,
      reward: ""
    },
    joinJunction: {
      unlocked: false,
      completed: false,
      reward: ""
    },
    subqueryMines: {
      unlocked: false,
      completed: false,
      reward: ""
    },
    cleaningClinic: {
      unlocked: false,
      completed: false,
      reward: ""
    }
  };

  const DATA_PREP_CITY_DEFAULTS = {
    buildings: DATA_PREP_BUILDING_DEFAULTS,
    rewards: [],
    completed: false,
    badge: ""
  };

  const DATAWORKS_CITADEL_BUILDING_DEFAULTS = {
    rankingObservatory: {
      unlocked: true,
      completed: false,
      reward: ""
    },
    schemaArchitectHall: {
      unlocked: false,
      completed: false,
      reward: ""
    },
    featurePipelineWorks: {
      unlocked: false,
      completed: false,
      reward: ""
    },
    sqlalchemyEngineRoom: {
      unlocked: false,
      completed: false,
      reward: ""
    }
  };

  const DATAWORKS_CITADEL_DEFAULT_REWARDS = {
    rankingObservatory: "Schema Architect Hall Key",
    schemaArchitectHall: "Feature Pipeline Works Key",
    featurePipelineWorks: "SQLAlchemy Engine Room Key",
    sqlalchemyEngineRoom: "Dataworks Citadel Badge"
  };

  const DATAWORKS_CITADEL_DEFAULTS = {
    buildings: DATAWORKS_CITADEL_BUILDING_DEFAULTS,
    rewards: [],
    completed: false,
    badge: ""
  };

  const DEFAULT_PROGRESS = {
    buildings: BUILDING_DEFAULTS,
    badges: {
      sqlFoundations: false
    },
    cities: {
      dataPrepCity: DATA_PREP_CITY_DEFAULTS,
      dataworksCitadel: DATAWORKS_CITADEL_DEFAULTS
    },
    unlockEverythingUsed: false,
    kingdom: {
      unlockedIslands: [FOUNDATION_ISLAND_ID],
      seenUnlockMessages: {},
      pendingUnlockMessage: null
    }
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createDefaultProgress() {
    return clone(DEFAULT_PROGRESS);
  }

  function parseSavedProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved && typeof saved === "object" ? saved : null;
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  function mergeGameProgress(saved) {
    const progress = createDefaultProgress();
    if (!saved || typeof saved !== "object") return progress;

    if (saved.buildings && typeof saved.buildings === "object") {
      Object.keys(progress.buildings).forEach((buildingId) => {
        if (saved.buildings[buildingId] && typeof saved.buildings[buildingId] === "object") {
          Object.assign(progress.buildings[buildingId], saved.buildings[buildingId]);
          if (!Array.isArray(progress.buildings[buildingId].discoveredMarkers)) {
            progress.buildings[buildingId].discoveredMarkers = [];
          }
        }
      });
    }

    if (saved.badges && typeof saved.badges === "object") {
      Object.assign(progress.badges, saved.badges);
    }

    if (typeof saved.unlockEverythingUsed === "boolean") {
      progress.unlockEverythingUsed = saved.unlockEverythingUsed;
    }

    if (saved.cities && typeof saved.cities === "object") {
      progress.cities = {
        ...progress.cities,
        ...saved.cities
      };
    }

    if (saved.kingdom && typeof saved.kingdom === "object") {
      const kingdom = saved.kingdom;
      if (Array.isArray(kingdom.unlockedIslands)) {
        progress.kingdom.unlockedIslands = [...kingdom.unlockedIslands];
      }
      if (kingdom.seenUnlockMessages && typeof kingdom.seenUnlockMessages === "object") {
        progress.kingdom.seenUnlockMessages = { ...kingdom.seenUnlockMessages };
      }
      if (typeof kingdom.pendingUnlockMessage === "string" || kingdom.pendingUnlockMessage === null) {
        progress.kingdom.pendingUnlockMessage = kingdom.pendingUnlockMessage;
      }
    }

    progress.buildings.dataVault.unlocked = true;
    return progress;
  }

  function ensureDataPrepCityProgress(progress) {
    progress.cities = progress.cities || {};
    const dataPrepCity = progress.cities.dataPrepCity && typeof progress.cities.dataPrepCity === "object"
      ? progress.cities.dataPrepCity
      : {};

    dataPrepCity.buildings = dataPrepCity.buildings && typeof dataPrepCity.buildings === "object"
      ? dataPrepCity.buildings
      : {};

    DATA_PREP_BUILDING_ORDER.forEach((buildingId) => {
      dataPrepCity.buildings[buildingId] = {
        ...clone(DATA_PREP_BUILDING_DEFAULTS[buildingId]),
        ...(dataPrepCity.buildings[buildingId] || {})
      };

      if (!PLAYABLE_DATA_PREP_BUILDING_IDS.includes(buildingId)) {
        dataPrepCity.buildings[buildingId].unlocked = false;
      }
    });

    dataPrepCity.buildings.filterFactory.unlocked = true;

    if (dataPrepCity.filterFactory?.completed) {
      dataPrepCity.buildings.filterFactory.completed = true;
      dataPrepCity.buildings.filterFactory.reward = dataPrepCity.buildings.filterFactory.reward || "Summary Tower Key";
    }

    if (dataPrepCity.summaryTower?.completed) {
      dataPrepCity.buildings.summaryTower.completed = true;
      dataPrepCity.buildings.summaryTower.reward = dataPrepCity.buildings.summaryTower.reward || "Join Junction Key";
    }

    if (dataPrepCity.joinJunction?.completed) {
      dataPrepCity.buildings.joinJunction.completed = true;
      dataPrepCity.buildings.joinJunction.reward = dataPrepCity.buildings.joinJunction.reward || "Subquery Mines Key";
    }

    if (dataPrepCity.subqueryMines?.completed) {
      dataPrepCity.buildings.subqueryMines.completed = true;
      dataPrepCity.buildings.subqueryMines.reward = dataPrepCity.buildings.subqueryMines.reward || "Cleaning Clinic Key";
    }

    if (dataPrepCity.cleaningClinic?.completed) {
      dataPrepCity.buildings.cleaningClinic.completed = true;
      dataPrepCity.buildings.cleaningClinic.reward = dataPrepCity.buildings.cleaningClinic.reward || "Data Prep City Badge";
    }

    if (dataPrepCity.buildings.filterFactory.completed) {
      dataPrepCity.buildings.summaryTower.unlocked = true;
    }

    if (dataPrepCity.buildings.summaryTower.completed) {
      dataPrepCity.buildings.joinJunction.unlocked = true;
    }

    if (dataPrepCity.buildings.joinJunction.completed) {
      dataPrepCity.buildings.subqueryMines.unlocked = true;
    }

    if (dataPrepCity.buildings.subqueryMines.completed) {
      dataPrepCity.buildings.cleaningClinic.unlocked = true;
    }

    dataPrepCity.rewards = Array.isArray(dataPrepCity.rewards) ? dataPrepCity.rewards : [];
    DATA_PREP_BUILDING_ORDER.forEach((buildingId) => {
      const reward = dataPrepCity.buildings[buildingId].reward;
      if (reward && !dataPrepCity.rewards.includes(reward)) {
        dataPrepCity.rewards.push(reward);
      }
    });

    if (dataPrepCity.buildings.cleaningClinic.completed) {
      dataPrepCity.completed = true;
      dataPrepCity.badge = dataPrepCity.badge || "Data Prep City Badge";
      if (!dataPrepCity.rewards.includes(dataPrepCity.badge)) {
        dataPrepCity.rewards.push(dataPrepCity.badge);
      }
    } else {
      dataPrepCity.completed = Boolean(dataPrepCity.completed && dataPrepCity.badge);
      dataPrepCity.badge = dataPrepCity.completed ? (dataPrepCity.badge || "Data Prep City Badge") : "";
    }

    progress.cities.dataPrepCity = dataPrepCity;
    return dataPrepCity;
  }

  function ensureDataworksCitadelProgress(progress) {
    progress.cities = progress.cities || {};
    const dataworksCitadel = progress.cities.dataworksCitadel && typeof progress.cities.dataworksCitadel === "object"
      ? progress.cities.dataworksCitadel
      : {};

    dataworksCitadel.buildings = dataworksCitadel.buildings && typeof dataworksCitadel.buildings === "object"
      ? dataworksCitadel.buildings
      : {};

    DATAWORKS_CITADEL_BUILDING_ORDER.forEach((buildingId) => {
      dataworksCitadel.buildings[buildingId] = {
        ...clone(DATAWORKS_CITADEL_BUILDING_DEFAULTS[buildingId]),
        ...(dataworksCitadel.buildings[buildingId] || {})
      };

      if (!PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS.includes(buildingId)) {
        dataworksCitadel.buildings[buildingId].unlocked = false;
      }

      const legacyBuilding = dataworksCitadel[buildingId];
      if (legacyBuilding?.completed) {
        dataworksCitadel.buildings[buildingId].completed = true;
        dataworksCitadel.buildings[buildingId].reward =
          dataworksCitadel.buildings[buildingId].reward ||
          legacyBuilding.reward ||
          DATAWORKS_CITADEL_DEFAULT_REWARDS[buildingId];
      }
    });

    dataworksCitadel.buildings.rankingObservatory.unlocked = true;

    DATAWORKS_CITADEL_BUILDING_ORDER.forEach((buildingId, index) => {
      if (!dataworksCitadel.buildings[buildingId].completed) return;
      const nextBuildingId = DATAWORKS_CITADEL_BUILDING_ORDER[index + 1];
      if (nextBuildingId && PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS.includes(nextBuildingId)) {
        dataworksCitadel.buildings[nextBuildingId].unlocked = true;
      }
    });

    dataworksCitadel.rewards = Array.isArray(dataworksCitadel.rewards) ? dataworksCitadel.rewards : [];
    DATAWORKS_CITADEL_BUILDING_ORDER.forEach((buildingId) => {
      const reward = dataworksCitadel.buildings[buildingId].reward;
      if (reward && !dataworksCitadel.rewards.includes(reward)) {
        dataworksCitadel.rewards.push(reward);
      }
    });

    if (dataworksCitadel.buildings.sqlalchemyEngineRoom.completed) {
      dataworksCitadel.completed = true;
      dataworksCitadel.badge = dataworksCitadel.badge || "Dataworks Citadel Badge";
      if (!dataworksCitadel.rewards.includes(dataworksCitadel.badge)) {
        dataworksCitadel.rewards.push(dataworksCitadel.badge);
      }
    } else {
      dataworksCitadel.completed = Boolean(dataworksCitadel.completed && dataworksCitadel.badge);
      dataworksCitadel.badge = dataworksCitadel.completed
        ? (dataworksCitadel.badge || "Dataworks Citadel Badge")
        : "";
    }

    progress.cities.dataworksCitadel = dataworksCitadel;
    return dataworksCitadel;
  }

  function isFoundationCityComplete(progress) {
    return Boolean(
      progress?.badges?.sqlFoundations ||
      progress?.buildings?.queryLab?.completed
    );
  }

  function isDataPrepCityComplete(progress) {
    return Boolean(
      progress?.cities?.dataPrepCity?.completed ||
      progress?.cities?.dataPrepCity?.badge ||
      progress?.cities?.dataPrepCity?.buildings?.cleaningClinic?.completed ||
      progress?.cities?.dataPrepCity?.cleaningClinic?.completed
    );
  }

  function normalizeIslandList(progress) {
    const current = Array.isArray(progress.kingdom.unlockedIslands)
      ? progress.kingdom.unlockedIslands
      : [];
    progress.kingdom.unlockedIslands = [...new Set(current.filter((id) => PLAYABLE_ISLAND_IDS.includes(id)))];
    if (!progress.kingdom.unlockedIslands.includes(FOUNDATION_ISLAND_ID)) {
      progress.kingdom.unlockedIslands.unshift(FOUNDATION_ISLAND_ID);
    }
  }

  function ensureKingdomShape(progress) {
    if (!progress.kingdom || typeof progress.kingdom !== "object") {
      progress.kingdom = createDefaultProgress().kingdom;
    }

    if (!progress.kingdom.seenUnlockMessages || typeof progress.kingdom.seenUnlockMessages !== "object") {
      progress.kingdom.seenUnlockMessages = {};
    }

    if (typeof progress.kingdom.pendingUnlockMessage !== "string") {
      progress.kingdom.pendingUnlockMessage = null;
    }

    normalizeIslandList(progress);
    return progress;
  }

  function ensureKingdomProgress(progress, options = {}) {
    ensureKingdomShape(progress);
    ensureDataPrepCityProgress(progress);
    ensureDataworksCitadelProgress(progress);

    if (isFoundationCityComplete(progress)) {
      unlockIslandInProgress(progress, DATA_PREP_ISLAND_ID, {
        queueMessage: Boolean(options.queueMigrationMessage)
      });
    }

    if (isDataPrepCityComplete(progress)) {
      unlockIslandInProgress(progress, DATAWORKS_CITADEL_ISLAND_ID, {
        queueMessage: Boolean(options.queueMigrationMessage)
      });
    }

    return progress;
  }

  function getGameProgress(options = {}) {
    const progress = ensureKingdomProgress(mergeGameProgress(parseSavedProgress()), options);
    saveGameProgress(progress);
    return progress;
  }

  function saveGameProgress(progress) {
    const normalized = ensureKingdomProgress(mergeGameProgress(progress));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function isIslandUnlocked(islandId, progress = getGameProgress()) {
    ensureKingdomProgress(progress);
    return progress.kingdom.unlockedIslands.includes(islandId);
  }

  function unlockIslandInProgress(progress, islandId, options = {}) {
    if (!PLAYABLE_ISLAND_IDS.includes(islandId)) return false;
    ensureKingdomShape(progress);
    const alreadyUnlocked = progress.kingdom.unlockedIslands.includes(islandId);
    if (!alreadyUnlocked) {
      progress.kingdom.unlockedIslands.push(islandId);
    }

    const messageAlreadySeen = Boolean(progress.kingdom.seenUnlockMessages[islandId]);
    if (!alreadyUnlocked && options.queueMessage && !messageAlreadySeen) {
      progress.kingdom.pendingUnlockMessage = islandId;
    }

    return !alreadyUnlocked;
  }

  function unlockIsland(islandId, options = {}) {
    const progress = getGameProgress();
    const unlockedNow = unlockIslandInProgress(progress, islandId, options);
    saveGameProgress(progress);
    return unlockedNow;
  }

  function markFoundationComplete(progress, options = {}) {
    progress.badges.sqlFoundations = true;
    unlockIslandInProgress(progress, DATA_PREP_ISLAND_ID, {
      queueMessage: Boolean(options.queueMessage)
    });
    return progress;
  }

  function unlockDataPrepBuildingInProgress(progress, buildingId) {
    if (!PLAYABLE_DATA_PREP_BUILDING_IDS.includes(buildingId)) return false;
    const dataPrepCity = ensureDataPrepCityProgress(progress);
    const building = dataPrepCity.buildings[buildingId];
    const alreadyUnlocked = Boolean(building.unlocked);
    building.unlocked = true;
    return !alreadyUnlocked;
  }

  function markDataPrepBuildingComplete(progress, buildingId, reward = "") {
    const dataPrepCity = ensureDataPrepCityProgress(progress);
    const building = dataPrepCity.buildings[buildingId];
    if (!building) return progress;

    building.unlocked = true;
    building.completed = true;
    if (reward) {
      building.reward = reward;
      if (!dataPrepCity.rewards.includes(reward)) {
        dataPrepCity.rewards.push(reward);
      }
    }

    const nextBuildingId = DATA_PREP_BUILDING_ORDER[DATA_PREP_BUILDING_ORDER.indexOf(buildingId) + 1];
    if (nextBuildingId && PLAYABLE_DATA_PREP_BUILDING_IDS.includes(nextBuildingId)) {
      dataPrepCity.buildings[nextBuildingId].unlocked = true;
    }

    if (buildingId === "cleaningClinic") {
      dataPrepCity.completed = true;
      dataPrepCity.badge = reward || "Data Prep City Badge";
      if (!dataPrepCity.rewards.includes(dataPrepCity.badge)) {
        dataPrepCity.rewards.push(dataPrepCity.badge);
      }
      unlockIslandInProgress(progress, DATAWORKS_CITADEL_ISLAND_ID, { queueMessage: true });
    }

    return progress;
  }

  function getDataPrepBuildingProgress(buildingId, progress = getGameProgress()) {
    const dataPrepCity = ensureDataPrepCityProgress(progress);
    return dataPrepCity.buildings[buildingId] || null;
  }

  function isDataPrepBuildingUnlocked(buildingId, progress = getGameProgress()) {
    return Boolean(getDataPrepBuildingProgress(buildingId, progress)?.unlocked);
  }

  function unlockDataworksCitadelBuildingInProgress(progress, buildingId) {
    if (!PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS.includes(buildingId)) return false;
    const dataworksCitadel = ensureDataworksCitadelProgress(progress);
    const building = dataworksCitadel.buildings[buildingId];
    const alreadyUnlocked = Boolean(building.unlocked);
    building.unlocked = true;
    return !alreadyUnlocked;
  }

  function markDataworksCitadelBuildingComplete(progress, buildingId, reward = "") {
    const dataworksCitadel = ensureDataworksCitadelProgress(progress);
    const building = dataworksCitadel.buildings[buildingId];
    if (!building) return progress;

    building.unlocked = true;
    building.completed = true;
    if (reward) {
      building.reward = reward;
      if (!dataworksCitadel.rewards.includes(reward)) {
        dataworksCitadel.rewards.push(reward);
      }
    }

    const nextBuildingId = DATAWORKS_CITADEL_BUILDING_ORDER[
      DATAWORKS_CITADEL_BUILDING_ORDER.indexOf(buildingId) + 1
    ];
    if (nextBuildingId && PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS.includes(nextBuildingId)) {
      dataworksCitadel.buildings[nextBuildingId].unlocked = true;
    }

    if (buildingId === "sqlalchemyEngineRoom") {
      dataworksCitadel.completed = true;
      dataworksCitadel.badge = reward || "Dataworks Citadel Badge";
      if (!dataworksCitadel.rewards.includes(dataworksCitadel.badge)) {
        dataworksCitadel.rewards.push(dataworksCitadel.badge);
      }
    }

    return progress;
  }

  function getDataworksCitadelBuildingProgress(buildingId, progress = getGameProgress()) {
    const dataworksCitadel = ensureDataworksCitadelProgress(progress);
    return dataworksCitadel.buildings[buildingId] || null;
  }

  function isDataworksCitadelBuildingUnlocked(buildingId, progress = getGameProgress()) {
    return Boolean(getDataworksCitadelBuildingProgress(buildingId, progress)?.unlocked);
  }

  function resetAllProgress() {
    const progress = createDefaultProgress();
    saveGameProgress(progress);
    return progress;
  }

  function consumePendingUnlockMessage() {
    const progress = getGameProgress();
    const islandId = progress.kingdom.pendingUnlockMessage;
    if (!islandId || !UNLOCK_MESSAGES[islandId]) return "";

    progress.kingdom.pendingUnlockMessage = null;
    progress.kingdom.seenUnlockMessages[islandId] = true;
    saveGameProgress(progress);
    return UNLOCK_MESSAGES[islandId];
  }

  window.SQLKingdomProgress = {
    STORAGE_KEY,
    FOUNDATION_ISLAND_ID,
    DATA_PREP_ISLAND_ID,
    DATAWORKS_CITADEL_ISLAND_ID,
    PLAYABLE_ISLAND_IDS: [...PLAYABLE_ISLAND_IDS],
    DATA_PREP_BUILDING_ORDER: [...DATA_PREP_BUILDING_ORDER],
    PLAYABLE_DATA_PREP_BUILDING_IDS: [...PLAYABLE_DATA_PREP_BUILDING_IDS],
    DATAWORKS_CITADEL_BUILDING_ORDER: [...DATAWORKS_CITADEL_BUILDING_ORDER],
    PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS: [...PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS],
    createDefaultProgress,
    getGameProgress,
    saveGameProgress,
    ensureKingdomProgress,
    ensureDataPrepCityProgress,
    ensureDataworksCitadelProgress,
    isIslandUnlocked,
    unlockIsland,
    unlockIslandInProgress,
    unlockDataPrepBuildingInProgress,
    markDataPrepBuildingComplete,
    getDataPrepBuildingProgress,
    isDataPrepBuildingUnlocked,
    unlockDataworksCitadelBuildingInProgress,
    markDataworksCitadelBuildingComplete,
    getDataworksCitadelBuildingProgress,
    isDataworksCitadelBuildingUnlocked,
    resetAllProgress,
    markFoundationComplete,
    consumePendingUnlockMessage
  };
})();

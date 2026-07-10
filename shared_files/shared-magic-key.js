(function () {
  const FOUNDATION_CITY_ID = "foundation-city";
  const DATA_PREP_CITY_ID = "data-prep-city";
  const MAGIC_KEY_MESSAGE = "Magic Master Key activated!";

  const FOUNDATION_ROOM_LAST_INDEXES = {
    dataVault: 6,
    tableDepartment: 7,
    keyBridgeHall: 7,
    queryLab: 9
  };

  const FOUNDATION_MARKER_IDS = {
    dataVault: ["shelf", "server", "computer", "board"],
    tableDepartment: ["board", "row", "column", "dataset"],
    keyBridgeHall: ["primaryBoard", "goldenKey", "bridge", "foreignBoard"],
    queryLab: ["filter", "console", "sort", "limit", "ml"]
  };

  function dispatchProgressEvent(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function getProgressApi() {
    return window.SQLKingdomProgress;
  }

  function unlockFoundationCity(progress) {
    Object.entries(FOUNDATION_ROOM_LAST_INDEXES).forEach(([buildingId, lastIndex]) => {
      const building = progress.buildings?.[buildingId];
      if (!building) return;

      building.unlocked = true;
      building.completed = true;
      building.entered = true;
      building.newlyUnlocked = false;
      building.quizPassed = true;
      building.discoveredMarkers = [...FOUNDATION_MARKER_IDS[buildingId]];
      building.highestRoomUnlocked = lastIndex;
    });

    progress.badges = {
      ...(progress.badges || {}),
      sqlFoundations: true
    };
  }

  function unlockPlayableIslands(progress) {
    const progressApi = getProgressApi();
    const playableIslandIds = Array.isArray(progressApi?.PLAYABLE_ISLAND_IDS)
      ? progressApi.PLAYABLE_ISLAND_IDS
      : [FOUNDATION_CITY_ID, DATA_PREP_CITY_ID];

    playableIslandIds.forEach((islandId) => {
      progressApi?.unlockIslandInProgress?.(progress, islandId, { queueMessage: false });
    });
  }

  function unlockPlayableDataPrepBuildings(progress) {
    const progressApi = getProgressApi();
    const playableBuildingIds = Array.isArray(progressApi?.PLAYABLE_DATA_PREP_BUILDING_IDS)
      ? progressApi.PLAYABLE_DATA_PREP_BUILDING_IDS
      : ["filterFactory", "summaryTower", "joinJunction", "subqueryMines", "cleaningClinic"];

    playableBuildingIds.forEach((buildingId) => {
      progressApi?.unlockDataPrepBuildingInProgress?.(progress, buildingId);
    });
  }

  function activateMagicMasterKey(options = {}) {
    const progressApi = getProgressApi();
    if (!progressApi) return null;

    const progress = progressApi.getGameProgress();
    unlockFoundationCity(progress);
    unlockPlayableIslands(progress);
    unlockPlayableDataPrepBuildings(progress);
    progress.unlockEverythingUsed = true;

    const savedProgress = progressApi.saveGameProgress(progress);
    const message = options.message || MAGIC_KEY_MESSAGE;

    if (options.showToast !== false) {
      window.SQLKingdomMenu?.showToast?.(message);
    }

    dispatchProgressEvent("sqlKingdom:unlockAll", {
      progress: savedProgress,
      message
    });

    return savedProgress;
  }

  window.SQLKingdomMagicKey = {
    activateMagicMasterKey
  };

  window.activateMagicMasterKey = activateMagicMasterKey;
})();

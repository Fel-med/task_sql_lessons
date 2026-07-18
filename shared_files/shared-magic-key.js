(function () {
  const FOUNDATION_CITY_ID = "foundation-city";
  const DATA_PREP_CITY_ID = "data-prep-city";
  const MAGIC_KEY_MESSAGE = "Magic Master Key activated!";

  const PLAYABLE_BUILDINGS_CONFIG = {
    // City 1 (Foundation City)
    dataVault: {
      cityKey: "buildings",
      lastIndex: 6,
      markerIds: ["shelf", "server", "computer", "board"],
      questionIds: []
    },
    tableDepartment: {
      cityKey: "buildings",
      lastIndex: 7,
      markerIds: ["board", "row", "column", "dataset"],
      questionIds: []
    },
    keyBridgeHall: {
      cityKey: "buildings",
      lastIndex: 7,
      markerIds: ["primaryBoard", "goldenKey", "bridge", "foreignBoard"],
      questionIds: []
    },
    queryLab: {
      cityKey: "buildings",
      lastIndex: 9,
      markerIds: ["filter", "console", "sort", "limit", "ml"],
      questionIds: []
    },
    // City 2 (Data Prep City)
    filterFactory: {
      cityKey: "dataPrepCity",
      lastIndex: 6,
      markerIds: ["machine", "panel", "pipe"],
      questionIds: ["and", "in", "between", "like", "not"]
    },
    summaryTower: {
      cityKey: "dataPrepCity",
      lastIndex: 7,
      markerIds: ["screen", "console", "meter"],
      questionIds: ["count", "sum", "avg", "group-by", "having", "where-having"]
    },
    joinJunction: {
      cityKey: "dataPrepCity",
      lastIndex: 7,
      markerIds: ["rail", "connector", "merger"],
      questionIds: ["inner", "left", "key", "null", "full", "prep"]
    },
    subqueryMines: {
      cityKey: "dataPrepCity",
      lastIndex: 8,
      markerIds: ["tunnel", "crystal", "scanner"],
      questionIds: ["definition", "inner-first", "in", "above-average", "correlated", "prep"]
    },
    cleaningClinic: {
      cityKey: "dataPrepCity",
      lastIndex: 8,
      markerIds: ["nullScanner", "cleaningConsole", "validationMonitor"],
      questionIds: ["null", "is-null", "coalesce", "case", "cast", "negative-price", "ml-cleaning"]
    },
    // City 3 (Dataworks Citadel)
    rankingObservatory: {
      cityKey: "dataworksCitadel",
      lastIndex: 8,
      markerIds: ["rankingChart", "telescope", "partitionTubes", "timeClock"],
      questionIds: ["window-purpose", "row-number", "rank-gap", "partition", "running-total", "rolling-leakage"]
    },
    schemaArchitectHall: {
      cityKey: "dataworksCitadel",
      lastIndex: 8,
      markerIds: ["schemaMap", "blueprintTable", "relationshipBoard", "integrityKey"],
      questionIds: ["first-normal-form", "second-normal-form", "third-normal-form", "many-to-many", "foreign-key", "check-constraint"]
    },
    featurePipelineWorks: {
      cityKey: "dataworksCitadel",
      lastIndex: 8,
      markerIds: ["rawData", "processingEngine", "featureOutput", "labelOutput"],
      questionIds: ["feature", "aggregation", "label", "sample-row", "join", "leakage"]
    },
    sqlalchemyEngineRoom: {
      cityKey: "dataworksCitadel",
      lastIndex: 8,
      markerIds: ["databasePortal", "ormBlueprint", "sessionCore", "crudConsole"],
      questionIds: ["orm", "engine", "session", "model", "read", "commit"]
    }
  };

  function dispatchProgressEvent(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function getProgressApi() {
    return window.SQLKingdomProgress;
  }

  function unlockAllPlayableBuildingRooms(progress) {
    Object.entries(PLAYABLE_BUILDINGS_CONFIG).forEach(([buildingId, config]) => {
      if (config.cityKey === "buildings") {
        progress.buildings = progress.buildings || {};
        progress.buildings[buildingId] = progress.buildings[buildingId] || {
          unlocked: false,
          completed: false,
          newlyUnlocked: false,
          entered: false,
          quizPassed: false,
          discoveredMarkers: [],
          highestRoomUnlocked: 0
        };
        const building = progress.buildings[buildingId];
        building.unlocked = true;
        building.entered = true;
        building.newlyUnlocked = false;
        building.quizPassed = true;
        building.discoveredMarkers = [...config.markerIds];
        building.highestRoomUnlocked = config.lastIndex;
      } else {
        const cityKey = config.cityKey;
        progress.cities = progress.cities || {};
        progress.cities[cityKey] = progress.cities[cityKey] || {};

        progress.cities[cityKey].buildings = progress.cities[cityKey].buildings || {};
        progress.cities[cityKey].buildings[buildingId] = progress.cities[cityKey].buildings[buildingId] || {
          unlocked: false,
          completed: false,
          reward: ""
        };
        progress.cities[cityKey].buildings[buildingId].unlocked = true;

        progress.cities[cityKey][buildingId] = progress.cities[cityKey][buildingId] || {
          discoveredMarkers: [],
          highestRoomUnlocked: 0,
          quizPassed: false,
          completed: false,
          correctQuizAnswers: []
        };
        const template = progress.cities[cityKey][buildingId];
        template.highestRoomUnlocked = config.lastIndex;
        template.quizPassed = true;
        template.discoveredMarkers = [...config.markerIds];
        template.correctQuizAnswers = [...config.questionIds];
      }
    });
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

  function unlockPlayableDataworksCitadelBuildings(progress) {
    const progressApi = getProgressApi();
    const playableBuildingIds = Array.isArray(progressApi?.PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS)
      ? progressApi.PLAYABLE_DATAWORKS_CITADEL_BUILDING_IDS
      : ["rankingObservatory", "schemaArchitectHall", "featurePipelineWorks", "sqlalchemyEngineRoom"];

    playableBuildingIds.forEach((buildingId) => {
      progressApi?.unlockDataworksCitadelBuildingInProgress?.(progress, buildingId);
    });
  }

  function activateMagicMasterKey(options = {}) {
    const progressApi = getProgressApi();
    if (!progressApi) return null;

    const progress = progressApi.getGameProgress();
    unlockAllPlayableBuildingRooms(progress);
    unlockPlayableIslands(progress);
    unlockPlayableDataPrepBuildings(progress);
    unlockPlayableDataworksCitadelBuildings(progress);
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

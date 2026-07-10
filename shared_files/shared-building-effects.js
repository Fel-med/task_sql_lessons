(function () {
  function getBuildingId(hotspot) {
    return hotspot.dataset.buildingEffect || hotspot.dataset.buildingId || hotspot.dataset.building;
  }

  function isDisabled(hotspot) {
    return hotspot.classList.contains("locked")
      || hotspot.classList.contains("is-disabled")
      || hotspot.getAttribute("aria-disabled") === "true";
  }

  function getEffectTargets(scene, buildingId) {
    return {
      layers: scene.querySelectorAll(`[data-building-layer="${buildingId}"]`),
      glows: scene.querySelectorAll(`[data-building-glow="${buildingId}"]`),
      signs: scene.querySelectorAll(`[data-building-sign="${buildingId}"], .building-sign[data-building="${buildingId}"]`)
    };
  }

  function setBuildingHover(scene, buildingId, isHovered) {
    const targets = getEffectTargets(scene, buildingId);

    targets.layers.forEach((layer) => {
      layer.classList.toggle("is-hovered", isHovered);
    });

    targets.glows.forEach((glow) => {
      glow.classList.toggle("is-hovered", isHovered);
    });

    targets.signs.forEach((sign) => {
      if (!isHovered && sign.classList.contains("is-new")) return;
      sign.classList.toggle("is-lit", isHovered);
      sign.classList.toggle("is-active", isHovered);
    });
  }

  function initBuildingEffects(options = {}) {
    const scene = options.scene || document.querySelector(options.sceneSelector || ".city-scene");
    if (!scene) return;

    const hotspots = scene.querySelectorAll(options.hotspotSelector || ".city-building-hotspot");

    hotspots.forEach((hotspot) => {
      const buildingId = getBuildingId(hotspot);
      if (!buildingId) return;

      hotspot.addEventListener("mouseenter", () => {
        if (isDisabled(hotspot)) return;
        setBuildingHover(scene, buildingId, true);
      });

      hotspot.addEventListener("focus", () => {
        if (isDisabled(hotspot)) return;
        setBuildingHover(scene, buildingId, true);
      });

      hotspot.addEventListener("mouseleave", () => {
        setBuildingHover(scene, buildingId, false);
      });

      hotspot.addEventListener("blur", () => {
        setBuildingHover(scene, buildingId, false);
      });
    });
  }

  window.SQLCityBuildingEffects = {
    init: initBuildingEffects,
    setHover: setBuildingHover
  };
})();

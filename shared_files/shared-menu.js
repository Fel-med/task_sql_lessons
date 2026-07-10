(function () {
  let toastTimer;

  function showToast(message) {
    if (!message) return;
    let toast = document.querySelector("#sharedToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "shared-toast";
      toast.id = "sharedToast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  window.SQLKingdomMenu = {
    ...(window.SQLKingdomMenu || {}),
    showToast
  };

  function createMenu(options = {}) {
    const page = options.page || document.querySelector("[data-menu-page]")?.dataset.menuPage || "kingdom";
    const title = options.title || document.querySelector("[data-menu-title]")?.dataset.menuTitle || "SQL Kingdom Menu";
    const includeReturn = page !== "kingdom";
    const includeReferences = options.includeReferences ?? true;
    const resetMode = options.resetMode || (page === "kingdom" ? "global" : "local");
    const cityId = options.cityId || (resetMode === "local" ? page : "");
    const resetLabel = resetMode === "local" ? "Reset This City" : "Reset Everything";
    const basePath = options.basePath || document.querySelector("[data-menu-base]")?.dataset.menuBase || "";

    const button = document.createElement("button");
    button.className = "burger-btn";
    button.id = "sharedBurgerBtn";
    button.type = "button";
    button.setAttribute("aria-label", "Open menu");
    button.setAttribute("aria-controls", "sharedCityMenu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = "<span></span><span></span><span></span>";

    const backdrop = document.createElement("div");
    backdrop.className = "menu-backdrop";
    backdrop.id = "sharedMenuBackdrop";

    const menu = document.createElement("aside");
    menu.className = "city-menu";
    menu.id = "sharedCityMenu";
    menu.setAttribute("aria-hidden", "true");

    menu.innerHTML = `
      <button class="menu-close" id="sharedMenuClose" type="button" aria-label="Close menu">X</button>
      <h2>${title}</h2>
      ${includeReturn ? `<a class="return-kingdom-btn" href="${basePath}index.html">Return to SQL Kingdom</a>` : ""}
      <div class="unlock-everything-card">
        <img src="${basePath}res/magic-master-key.webp" class="magic-key-img" alt="Magic master key">
        <button class="unlock-all-btn" id="sharedUnlockAllBtn" type="button">Magic Master Key</button>
        <button class="reset-all-btn" id="sharedResetAllBtn" type="button">${resetLabel}</button>
      </div>
      ${includeReferences ? `
        <section class="shared-menu-references" aria-label="SQL references">
          <h3 class="shared-menu-references__title">References</h3>
          <a class="shared-menu-reference-card" href="https://www.w3schools.com/sql/default.asp" target="_blank" rel="noopener noreferrer">
            <img class="shared-menu-reference-icon" src="${basePath}res/w3schools.webp" alt="" aria-hidden="true">
            <span class="shared-menu-reference-title">W3Schools SQL Tutorial</span>
          </a>
          <a class="shared-menu-reference-card" href="https://www.geeksforgeeks.org/sql/sql-tutorial/" target="_blank" rel="noopener noreferrer">
            <img class="shared-menu-reference-icon" src="${basePath}res/geeksforgeeks.webp" alt="" aria-hidden="true">
            <span class="shared-menu-reference-title">GeeksforGeeks SQL Tutorial</span>
          </a>
        </section>
      ` : ""}
    `;

    document.body.append(button, backdrop, menu);

    const closeButton = menu.querySelector("#sharedMenuClose");
    const unlockButton = menu.querySelector("#sharedUnlockAllBtn");
    const resetButton = menu.querySelector("#sharedResetAllBtn");

    function openMenu() {
      menu.classList.add("open");
      backdrop.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      menu.classList.remove("open");
      backdrop.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
    }

    function useMagicMasterKey() {
      window.SQLKingdomMagicKey?.activateMagicMasterKey?.();
    }

    function resetEverything() {
      if (!window.SQLKingdomResetSystem) return;
      const result = window.SQLKingdomResetSystem.handleResetByMode({
        resetMode,
        cityId
      });
      showToast(result.message);
    }

    button.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);
    unlockButton.addEventListener("click", useMagicMasterKey);
    resetButton.addEventListener("click", resetEverything);

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.SQLKingdomMenu = {
      openMenu,
      closeMenu,
      showToast
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => createMenu());
  } else {
    createMenu();
  }
})();

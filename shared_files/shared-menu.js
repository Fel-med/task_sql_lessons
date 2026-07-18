(function () {
  let toastTimer;

  const REFERENCE_GROUPS = [
    {
      title: "SQL & Databases",
      items: [
        {
          title: "W3Schools SQL Tutorial",
          description: "Beginner SQL syntax and examples",
          href: "https://www.w3schools.com/sql/default.asp",
          image: "res/w3schools.webp",
          fallback: "W3"
        },
        {
          title: "GeeksforGeeks SQL Tutorial",
          description: "SQL explanations and practice topics",
          href: "https://www.geeksforgeeks.org/sql/sql-tutorial/",
          image: "res/geeksforgeeks.webp",
          fallback: "GFG"
        },
        {
          title: "PostgreSQL Official Tutorial",
          description: "Relational databases and SQL with PostgreSQL",
          href: "https://www.postgresql.org/docs/current/tutorial.html",
          image: "res/postgresql.webp",
          fallback: "PG"
        }
      ]
    },
    {
      title: "Machine Learning & Python",
      items: [
        {
          title: "Google ML Crash Course",
          description: "Practical introduction to machine learning",
          href: "https://developers.google.com/machine-learning/crash-course",
          image: "res/google-ml.webp",
          fallback: "ML"
        },
        {
          title: "scikit-learn User Guide",
          description: "ML models, preprocessing, and evaluation",
          href: "https://scikit-learn.org/stable/user_guide.html",
          image: "res/scikit-learn.webp",
          fallback: "SK"
        },
        {
          title: "SQLAlchemy ORM Quick Start",
          description: "Python ORM models, sessions, and queries",
          href: "https://docs.sqlalchemy.org/en/21/orm/quickstart.html",
          image: "res/sqlalchemy.webp",
          fallback: "SA"
        }
      ]
    }
  ];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderReferenceCard(reference, basePath) {
    const title = escapeHtml(reference.title);
    const description = escapeHtml(reference.description);
    const href = escapeHtml(reference.href);
    const image = escapeHtml(`${basePath}${reference.image}`);
    const fallback = escapeHtml(reference.fallback);

    return `
      <a
        class="shared-menu-reference-card"
        href="${href}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${title}: ${description}"
      >
        <span class="shared-menu-reference-media" aria-hidden="true">
          <img
            class="shared-menu-reference-icon"
            src="${image}"
            alt=""
            onerror="this.hidden=true; this.nextElementSibling.hidden=false"
          >
          <span class="shared-menu-reference-fallback" hidden>${fallback}</span>
        </span>
        <span class="shared-menu-reference-copy">
          <span class="shared-menu-reference-title">${title}</span>
          <span class="shared-menu-reference-description">${description}</span>
        </span>
      </a>
    `;
  }

  function renderReferences(basePath) {
    return REFERENCE_GROUPS.map((group) => `
      <div class="shared-menu-reference-group">
        <h4 class="shared-menu-reference-group-title">${escapeHtml(group.title)}</h4>
        ${group.items.map((reference) => renderReferenceCard(reference, basePath)).join("")}
      </div>
    `).join("");
  }

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
    if (document.querySelector("#sharedBurgerBtn") || document.querySelector("#sharedCityMenu")) return;

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
      <h2>${escapeHtml(title)}</h2>
      ${includeReturn ? `<a class="return-kingdom-btn" href="${basePath}index.html">Return to SQL Kingdom</a>` : ""}
      <div class="unlock-everything-card">
        <img src="${basePath}res/magic-master-key.webp" class="magic-key-img" alt="Magic master key">
        <button class="unlock-all-btn" id="sharedUnlockAllBtn" type="button">Magic Master Key</button>
        <button class="reset-all-btn" id="sharedResetAllBtn" type="button">${resetLabel}</button>
      </div>
      ${includeReferences ? `
        <section class="shared-menu-references" aria-label="Learning references">
          <h3 class="shared-menu-references__title">References</h3>
          ${renderReferences(basePath)}
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

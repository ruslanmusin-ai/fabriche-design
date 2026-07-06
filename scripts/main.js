(function () {
  const { siteConfig, collectionData, pageContent, formConfig } = window;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", () => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  });

  const collectionState = {
    activeColorId: collectionData.colors[0]?.id || null,
  };

  const modal = document.getElementById("request-modal");
  const requestForm = document.getElementById("request-form");
  const formStatus = document.getElementById("form-status");
  const submitButton = document.getElementById("submit-button");
  const collectionModalContent = document.getElementById("collection-modal-content");
  const privacyModal = document.getElementById("privacy-modal");
  const privacyModalFrame = document.getElementById("privacy-modal-frame");
  const privacyModalTitle = document.getElementById("privacy-modal-title");
  let modalCloseTimer = null;
  let privacyModalCloseTimer = null;
  let collectionModalGalleryIndex = 0;
  let collectionModalMillingsIndex = 0;

  function setupPlaceholders() {
    document.querySelectorAll(".image-card").forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;

      const markPlaceholder = () => {
        card.dataset.fallbackLabel = img.dataset.fallbackLabel || "Добавьте изображение в assets";
        card.classList.add("is-placeholder");
      };

      img.addEventListener("error", markPlaceholder, { once: true });
      if (!img.getAttribute("src")) {
        markPlaceholder();
      }
    });
  }

  function populateHeaderAndFooter() {
    const footerAddress = document.getElementById("footer-address");
    const footerPhone = document.getElementById("footer-phone");
    const footerEmail = document.getElementById("footer-email");
    const privacyLink = document.getElementById("privacy-link");
    const offerLink = document.getElementById("offer-link");
    const consentPolicyLink = document.getElementById("consent-policy-link");
    const consentOfferLink = document.getElementById("consent-offer-link");

    if (footerAddress) {
      footerAddress.innerHTML = "";
      const addressLines = Array.isArray(siteConfig.address)
        ? siteConfig.address
        : String(siteConfig.address).split("\n");

      addressLines.forEach((line) => {
        const row = document.createElement("span");
        row.className = "footer-address-line";
        row.textContent = line.trim();
        footerAddress.appendChild(row);
      });
    }
    if (footerPhone) {
      footerPhone.textContent = siteConfig.phone;
      footerPhone.href = siteConfig.phoneHref;
    }
    if (footerEmail) {
      footerEmail.textContent = siteConfig.email;
      footerEmail.href = `mailto:${siteConfig.email}`;
    }
    if (privacyLink) {
      privacyLink.href = siteConfig.legal.privacy;
    }
    if (offerLink) {
      offerLink.href = siteConfig.legal.offer;
    }
    if (consentPolicyLink) {
      consentPolicyLink.href = siteConfig.legal.privacy;
    }
    if (consentOfferLink) {
      consentOfferLink.href = siteConfig.legal.offer;
    }

    renderSocialLinks("header-socials");
    renderSocialLinks("mobile-menu-socials");
    renderSocialLinks("footer-socials");
  }

  function renderSocialLinks(elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    siteConfig.socials.forEach((social) => {
      const link = document.createElement("a");
      link.href = social.href;
      if (social.href.startsWith("http")) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      link.setAttribute("aria-label", social.label);
      link.className = "contact-icon";
      link.innerHTML = `<img src="${social.icon}" alt="${social.label}" loading="lazy" decoding="async" />`;
      container.appendChild(link);
    });
  }

  function populateHero() {
    const heroFacts = document.getElementById("hero-facts");
    if (!heroFacts) return;
    heroFacts.innerHTML = "";

    siteConfig.heroFacts.forEach((fact) => {
      const item = document.createElement("li");
      item.textContent = fact;
      heroFacts.appendChild(item);
    });
  }

  function renderCollectionSwatches() {
    const container = document.getElementById("collection-swatches");
    if (!container) return;
    container.innerHTML = "";

    collectionData.colors.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "swatch-button";
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(item.id === collectionState.activeColorId));
      button.dataset.colorId = item.id;
      button.innerHTML = `
        <span class="swatch-dot" style="background:${item.color}"></span>
        <span>${item.name}</span>
      `;
      button.addEventListener("click", () => {
        collectionState.activeColorId = item.id;
        renderCollectionSwatches();
        renderActiveCollection();
      });
      container.appendChild(button);
    });
  }

  function renderActiveCollection() {
    const current = collectionData.colors.find((item) => item.id === collectionState.activeColorId);
    if (!current) return;

    const colorName = document.getElementById("color-name");
    const colorDescription = document.getElementById("color-description");
    const gallery = document.getElementById("kitchen-gallery");
    const millingRow = document.getElementById("milling-row");

    if (!colorName || !colorDescription || !gallery || !millingRow) return;

    colorName.textContent = current.name;
    colorDescription.textContent = current.description;

    gallery.innerHTML = "";
    current.kitchens.forEach((kitchen) => {
      const card = document.createElement("div");
      card.className = "image-card gallery-card";
      card.innerHTML = `
        <img src="${kitchen.image}" alt="${kitchen.title}" loading="lazy" decoding="async" data-fallback-label="Добавьте ${kitchen.image.split("/").pop()}" />
      `;
      gallery.appendChild(card);
    });

    millingRow.innerHTML = "";
    current.millings.forEach((milling) => {
      const chip = document.createElement("div");
      chip.className = "milling-chip";
      chip.textContent = milling;
      millingRow.appendChild(chip);
    });

    setupPlaceholders();
  }

  function setupGalleryControls() {
    const gallery = document.getElementById("kitchen-gallery");
    const prev = document.getElementById("gallery-prev");
    const next = document.getElementById("gallery-next");
    if (!gallery || !prev || !next) return;

    prev.addEventListener("click", () => {
      gallery.scrollBy({ left: -260, behavior: "smooth" });
    });
    next.addEventListener("click", () => {
      gallery.scrollBy({ left: 260, behavior: "smooth" });
    });
  }

  function setupLuxuryMotion() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.querySelector(".hero-section");
    const heroImage = document.querySelector(".hero-backdrop img");
    const heroCopy = document.querySelector(".hero-copy-overlay");

    if (hero) {
      requestAnimationFrame(() => {
        hero.classList.add("is-loaded");
      });
    }

    if (!prefersReducedMotion && hero && heroImage && heroCopy) {
      const updateHeroParallax = () => {
        const rect = hero.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
        const imageShift = progress * -26;
        const copyShift = progress * -14;

        heroImage.style.transform = `scale(1.06) translate3d(0, ${imageShift}px, 0)`;
        heroCopy.style.transform = `translate3d(0, ${copyShift}px, 0)`;
      };

      updateHeroParallax();
      window.addEventListener("scroll", updateHeroParallax, { passive: true });
      window.addEventListener("resize", updateHeroParallax);
    }

    const revealGroups = [
      [".section-heading", "left"],
      [".mission-copy p", "up"],
      [".mission-benefits .advantage-process-card", "scale"],
      [".mission-banner-card", "scale"],
      [".collection-banner-card", "scale"],
      [".collection-carousel-header", "right"],
      [".collection-carousel-card", "scale"],
      [".about-copy", "up"],
      [".portrait-card", "scale"],
      [".catalog-copy > *", "left"],
      [".catalog-card", "scale"],
      [".footer-group", "up"],
      [".legal-detail-row", "up"],
      [".legal-summary-line", "up"]
    ];

    revealGroups.forEach(([selector, animation]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.dataset.animate = animation;
        element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
      });
    });

    if (prefersReducedMotion) {
      document.querySelectorAll("[data-animate]").forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    });

    document.querySelectorAll("[data-animate]").forEach((element) => {
      observer.observe(element);
    });
  }

  function renderCollectionCarousel() {
    const container = document.getElementById("collection-carousel");
    if (!container || !Array.isArray(collectionData.cards)) return;

    container.innerHTML = "";

    collectionData.cards.forEach((card) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "collection-carousel-card image-card";
      item.setAttribute("aria-label", `${card.title} ${card.place}`);
      item.innerHTML = `
        <img
          src="${card.image}"
          alt="${card.title} — ${card.place}"
          loading="lazy"
          decoding="async"
          data-fallback-label="Добавьте ${card.image.split("/").pop()}"
        />
      `;
      item.addEventListener("click", () => {
        openCollectionModal(card.id);
      });
      container.appendChild(item);
    });
  }

  function setupCollectionCarouselControls() {
    const carousel = document.getElementById("collection-carousel");
    const prev = document.getElementById("collection-carousel-prev");
    const next = document.getElementById("collection-carousel-next");
    if (!carousel || !prev || !next) return;

    const step = 180;

    prev.addEventListener("click", () => {
      carousel.scrollBy({ left: -step, behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      carousel.scrollBy({ left: step, behavior: "smooth" });
    });
  }

  function renderCollectionModalCard(card) {
    const copy = document.getElementById("collection-modal-copy");
    const kitchenGallery = {
      main: document.getElementById("collection-modal-gallery-main"),
      rail: document.getElementById("collection-modal-gallery"),
      prev: document.getElementById("collection-gallery-prev"),
      next: document.getElementById("collection-gallery-next"),
    };
    const millingGallery = {
      main: document.getElementById("collection-modal-gallery-main-secondary"),
      caption: document.getElementById("collection-modal-milling-caption"),
      rail: document.getElementById("collection-modal-gallery-secondary"),
      prev: document.getElementById("collection-gallery-prev-secondary"),
      next: document.getElementById("collection-gallery-next-secondary"),
    };
    if (
      !copy ||
      !kitchenGallery.main || !kitchenGallery.rail || !kitchenGallery.prev || !kitchenGallery.next ||
      !millingGallery.main || !millingGallery.caption || !millingGallery.rail || !millingGallery.prev || !millingGallery.next
    ) return;

    const toneLine = card.code
      ? `${card.place} (${card.code} ${card.title})`
      : `${card.place} (${card.title})`;

    const moodLine = card.mood
      ? `<p><strong>Образ:</strong> ${card.mood}</p>`
      : `<p><strong>Образ:</strong> описание будет добавлено.</p>`;
    const associationsLine = card.associations
      ? `<p><strong>Ассоциации:</strong> ${card.associations}</p>`
      : `<p><strong>Ассоциации:</strong> будут добавлены.</p>`;
    const colorLine = card.description
      ? `<p><strong>Цвет:</strong> ${card.description}</p>`
      : `<p><strong>Цвет:</strong> описание будет добавлено.</p>`;

    copy.innerHTML = `
      <p class="collection-modal-tone">${toneLine}</p>
      ${moodLine}
      ${associationsLine}
      ${colorLine}
    `;

    const renderPrimaryImage = (main, current, emptyText) => {
      main.innerHTML = "";
      if (!current) {
        main.innerHTML = `<p class="collection-modal-empty">${emptyText}</p>`;
        return;
      }
      main.innerHTML = `
        <div class="collection-modal-gallery-main-frame">
          <img
            src="${current.image}"
            alt="${current.title}"
            decoding="async"
            data-fallback-label="Добавьте ${current.image.split("/").pop()}"
          />
        </div>
      `;
    };

    const buildGalleryRail = ({ items, rail, onSelect, emptyText, showTitles = false }) => {
      rail.innerHTML = "";

      if (items?.length) {
        items.forEach((item, itemIndex) => {
          const frame = document.createElement("button");
          frame.type = "button";
          frame.className = "collection-modal-gallery-card image-card";
          frame.setAttribute("aria-label", item.title);
          frame.innerHTML = `
            <img
              src="${item.image}"
              alt="${item.title}"
              loading="lazy"
              decoding="async"
              data-fallback-label="Добавьте ${item.image.split("/").pop()}"
            />
            ${showTitles ? `<span class="collection-modal-gallery-card-title">${item.title}</span>` : ""}
          `;
          frame.addEventListener("click", () => onSelect(itemIndex));
          rail.appendChild(frame);
        });
        return;
      }

      const empty = document.createElement("p");
      empty.className = "collection-modal-empty";
      empty.textContent = emptyText;
      rail.appendChild(empty);
    };

    const scrollThumbnailIntoCarousel = (container, element) => {
      if (!element) return;
      const targetLeft = element.offsetLeft - (container.clientWidth - element.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    };

    const updateGalleryBlock = ({ items, index, main, rail, prev, next, emptyText, caption = null }) => {
      renderPrimaryImage(main, items?.[index], emptyText);
      if (caption) {
        caption.textContent = items?.[index]?.title || "";
      }

      if (items?.length) {
        Array.from(rail.children).forEach((frame, itemIndex) => {
          frame.classList.toggle("is-active", itemIndex === index);
        });
        prev.hidden = false;
        next.hidden = false;
        scrollThumbnailIntoCarousel(rail, rail.children[index]);
        return;
      }
      prev.hidden = true;
      next.hidden = true;
    };

    const handleKitchenSelect = (nextIndex) => {
      collectionModalGalleryIndex = nextIndex;
      updateGalleryBlock({
        items: card.kitchens,
        index: collectionModalGalleryIndex,
        main: kitchenGallery.main,
        rail: kitchenGallery.rail,
        prev: kitchenGallery.prev,
        next: kitchenGallery.next,
        emptyText: "Фото фасадов будут добавлены в ассеты.",
      });
      setupPlaceholders();
    };

    const handleMillingSelect = (nextIndex) => {
      collectionModalMillingsIndex = nextIndex;
      updateGalleryBlock({
        items: card.millings,
        index: collectionModalMillingsIndex,
        main: millingGallery.main,
        caption: millingGallery.caption,
        rail: millingGallery.rail,
        prev: millingGallery.prev,
        next: millingGallery.next,
        emptyText: "Фрезеровки будут добавлены в ассеты.",
      });
      setupPlaceholders();
    };

    buildGalleryRail({
      items: card.kitchens,
      rail: kitchenGallery.rail,
      emptyText: "Фото фасадов будут добавлены в ассеты.",
      onSelect: handleKitchenSelect,
    });

    buildGalleryRail({
      items: card.millings,
      rail: millingGallery.rail,
      showTitles: true,
      emptyText: "Фрезеровки будут добавлены в ассеты.",
      onSelect: handleMillingSelect,
    });

    const renderAllGalleries = () => {
      updateGalleryBlock({
        items: card.kitchens,
        index: collectionModalGalleryIndex,
        main: kitchenGallery.main,
        rail: kitchenGallery.rail,
        prev: kitchenGallery.prev,
        next: kitchenGallery.next,
        emptyText: "Фото фасадов будут добавлены в ассеты.",
      });

      updateGalleryBlock({
        items: card.millings,
        index: collectionModalMillingsIndex,
        main: millingGallery.main,
        caption: millingGallery.caption,
        rail: millingGallery.rail,
        prev: millingGallery.prev,
        next: millingGallery.next,
        emptyText: "Фрезеровки будут добавлены в ассеты.",
      });
    };

    collectionModalGalleryIndex = 0;
    collectionModalMillingsIndex = 0;
    renderAllGalleries();

    kitchenGallery.prev.onclick = () => {
      if (!card.kitchens?.length) return;
      collectionModalGalleryIndex = (collectionModalGalleryIndex - 1 + card.kitchens.length) % card.kitchens.length;
      renderAllGalleries();
      kitchenGallery.prev.blur();
    };
    kitchenGallery.next.onclick = () => {
      if (!card.kitchens?.length) return;
      collectionModalGalleryIndex = (collectionModalGalleryIndex + 1) % card.kitchens.length;
      renderAllGalleries();
      kitchenGallery.next.blur();
    };

    millingGallery.prev.onclick = () => {
      if (!card.millings?.length) return;
      collectionModalMillingsIndex = (collectionModalMillingsIndex - 1 + card.millings.length) % card.millings.length;
      renderAllGalleries();
      millingGallery.prev.blur();
    };
    millingGallery.next.onclick = () => {
      if (!card.millings?.length) return;
      collectionModalMillingsIndex = (collectionModalMillingsIndex + 1) % card.millings.length;
      renderAllGalleries();
      millingGallery.next.blur();
    };

    setupPlaceholders();
  }

  function openCollectionModal(cardId) {
    const card = collectionData.cards.find((item) => item.id === cardId);
    if (!card || !modal || !collectionModalContent || !requestForm) return;

    const placeLabels = {
      "Сардиния": "SARDINIA",
      "Пьемонт": "PIEDMONT",
      "Позитано": "POSITANO",
      "Амальфи": "AMALFI",
      "Лацио": "LAZIO",
      "Умбрия": "UMBRIA",
      "Ломбардия": "LOMBARDY",
      "Сорренто": "SORRENTO",
      "Сицилия": "SICILY",
      "Венето": "VENETO",
    };

    clearTimeout(modalCloseTimer);
    modal.hidden = false;
    modal.classList.add("is-collection");
    modal.classList.remove("is-closing");
    document.body.style.overflow = "hidden";

    document.getElementById("modal-kicker").textContent = "Коллекция";
    document.getElementById("modal-title").textContent = `${card.title.toUpperCase()} - ${placeLabels[card.place] || card.place.toUpperCase()}`;
    document.getElementById("modal-description").textContent = "";

    requestForm.hidden = true;
    collectionModalContent.hidden = false;
    renderCollectionModalCard(card);

    requestAnimationFrame(() => {
      modal.classList.add("is-active");
    });
  }

  function getAdvantageIcon(icon) {
    const icons = {
      gem: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.8 20 9l-8 11.2L4 9l8-5.2Z" />
          <path d="M8.2 6.3 12 9l3.8-2.7" />
          <path d="M4.4 9h15.2" />
          <path d="M12 9v11" />
        </svg>
      `,
      shield: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.8 18.8 6.6v5.9c0 4-2.7 7.2-6.8 8.7-4.1-1.5-6.8-4.7-6.8-8.7V6.6L12 3.8Z" />
          <path d="m8.8 12.3 2.1 2.2 4.4-4.7" />
          <path d="M12 3.8v17.4" opacity=".35" />
        </svg>
      `,
      spark: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3.8 2.2 5.9L20 12l-5.8 2.3L12 20.2l-2.2-5.9L4 12l5.8-2.3L12 3.8Z" />
          <path d="M18.2 4.7v2.8" />
          <path d="M19.6 6.1h-2.8" />
          <path d="M5.4 16.1v3.1" />
          <path d="M6.95 17.65H3.85" />
        </svg>
      `,
      layers: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 4.8 7.8 4.1L12 13 4.2 8.9 12 4.8Z" />
          <path d="m4.2 12.3 7.8 4.1 7.8-4.1" />
          <path d="m4.2 15.9 7.8 4.1 7.8-4.1" />
          <path d="M12 4.8V13" opacity=".35" />
        </svg>
      `,
      slab: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="5.2" width="15" height="13.6" rx="1.8" />
          <path d="M7.8 9.3h8.4" />
          <path d="M7.8 12h8.4" />
          <path d="M7.8 14.7h8.4" />
          <path d="M10.2 5.2v13.6" opacity=".35" />
        </svg>
      `,
      hand: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.7 11.5V7.2c0-.9.6-1.5 1.4-1.5s1.4.6 1.4 1.5v3.1" />
          <path d="M11.5 10.3V6.6c0-.9.6-1.5 1.4-1.5s1.4.6 1.4 1.5v3.7" />
          <path d="M14.3 10.8V7.9c0-.8.5-1.4 1.3-1.4s1.3.6 1.3 1.4v5.4c0 4-2.7 6.8-6.7 6.8-3.8 0-6.2-2.2-6.2-5.8v-1.5c0-1 .6-1.6 1.5-1.6h2.2Z" />
        </svg>
      `,
      ruler: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 16.8 16.8 5a1.8 1.8 0 0 1 2.5 0l.7.7a1.8 1.8 0 0 1 0 2.5L8.2 20a1.8 1.8 0 0 1-2.5 0l-.7-.7a1.8 1.8 0 0 1 0-2.5Z" />
          <path d="m13.1 6.9 4 4" />
          <path d="m10.7 9.3 1.7 1.7" />
          <path d="m8.3 11.7 1.7 1.7" />
          <path d="m5.9 14.1 1.7 1.7" />
        </svg>
      `,
      clock: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" />
          <path d="M12 7.8v4.5l3 1.8" />
        </svg>
      `,
    };

    return icons[icon] || icons.spark;
  }

  function populateAdvantages() {
    const showcase = document.getElementById("advantages-showcase");
    if (!showcase) return;
    showcase.innerHTML = "";
    const header = document.querySelector(".advantages-header");
    const kicker = header?.querySelector(".advantages-kicker");

    if (kicker && pageContent.advantagesSection?.kicker) {
      kicker.textContent = pageContent.advantagesSection.kicker;
    }

    const track = document.createElement("div");
    track.className = "advantages-track";

    pageContent.advantagesCards.forEach((entry) => {
      const item = document.createElement("article");
      item.className = "advantage-process-card";
      const titleMarkup = entry.title
        .split("|")
        .map((part) => `<span>${part}</span>`)
        .join("");
      item.innerHTML = `
        <div class="advantage-process-card__node" aria-hidden="true">
          ${getAdvantageIcon(entry.icon)}
        </div>
        <h3>${titleMarkup}</h3>
      `;
      track.appendChild(item);
    });

    showcase.appendChild(track);
  }

  function populateMission() {
    const missionCopy = document.getElementById("mission-copy");
    const missionBenefits = document.getElementById("mission-benefits");
    const missionSignoff = document.getElementById("mission-signoff");
    if (!missionCopy || !siteConfig.mission?.story) return;

    missionCopy.innerHTML = "";
    if (missionBenefits) {
      missionBenefits.innerHTML = "";
    }

    siteConfig.mission.story.forEach((paragraph, index) => {
      const element = document.createElement(index === siteConfig.mission.story.length - 1 ? "p" : "p");
      element.innerHTML = paragraph;
      if (index === siteConfig.mission.story.length - 1) {
        element.className = "mission-signoff";
      }
      missionCopy.appendChild(element);
    });

    if (missionBenefits && pageContent.advantagesCards?.length) {
      pageContent.advantagesCards.forEach((item) => {
        const titleMarkup = item.title
          .split("|")
          .map((part) => `<span>${part}</span>`)
          .join("");
        const benefit = document.createElement("div");
        benefit.className = "advantage-process-card";
        benefit.innerHTML = `
          <span class="advantage-process-card__node" aria-hidden="true">
            ${getAdvantageIcon(item.icon)}
          </span>
          <h3>${titleMarkup}</h3>
        `;
        missionBenefits.appendChild(benefit);
      });
    }

    if (missionSignoff) {
      missionSignoff.innerHTML = siteConfig.mission.signoff || "";
    }
  }

  function populateAbout() {
    const intro = document.getElementById("about-intro");
    const middle = document.getElementById("about-middle");
    const outro = document.getElementById("about-outro");
    if (intro) intro.innerHTML = `<p>${siteConfig.about.intro || ""}</p>`;
    if (middle) middle.innerHTML = `<p>${siteConfig.about.middle || ""}</p>`;
    if (outro) outro.innerHTML = `<p>${siteConfig.about.outro || ""}</p>`;
  }

  function populateOrganization() {
    const organizationMeta = document.getElementById("organization-meta");
    if (!organizationMeta) return;
    organizationMeta.innerHTML = "";

    siteConfig.organization.forEach((entry) => {
      const line = document.createElement("div");
      line.className = "meta-line";
      line.innerHTML = `
        <span class="meta-label">${entry.label}</span>
        <strong>${entry.value}</strong>
      `;
      organizationMeta.appendChild(line);
    });
  }

  function populateLegalCard() {
    const details = document.getElementById("legal-details");
    if (!details || !siteConfig.legalCard) return;

    const primaryWrap = document.createElement("div");
    primaryWrap.className = "legal-details-primary";
    const secondaryWrap = document.createElement("div");
    secondaryWrap.className = "legal-details-secondary";

    siteConfig.legalCard.summary.forEach((line) => {
      const element = document.createElement("p");
      element.className = "legal-summary-line";
      element.textContent = line;
      primaryWrap.appendChild(element);
    });

    const primaryLabels = new Set([
      "Наименование организации",
      "Сокращенное наименование организации",
      "Юридический адрес",
      "Фактический адрес",
      "ИНН",
      "КПП",
      "ОГРН",
      "Руководитель",
    ]);

    siteConfig.legalCard.details.forEach((entry) => {
      const row = document.createElement("div");
      const isPrimary = primaryLabels.has(entry.label);
      row.className = `legal-detail-row ${isPrimary ? "is-primary" : "is-secondary"}`;

      if (isPrimary) {
        row.innerHTML = `
          <span class="legal-detail-label">${entry.label}</span>
          <span class="legal-detail-value">${entry.value}</span>
        `;
        primaryWrap.appendChild(row);
      } else {
        row.innerHTML = `
          <span class="legal-detail-line"><span class="legal-detail-label">${entry.label}:</span> <span class="legal-detail-value">${entry.value}</span></span>
        `;
        secondaryWrap.appendChild(row);
      }
    });

    details.replaceChildren(primaryWrap, secondaryWrap);
  }

  function openModal(type) {
    const config = formConfig.requestTypes[type];
    if (!config) return;

    clearTimeout(modalCloseTimer);
    modal.hidden = false;
    modal.classList.remove("is-collection");
    modal.classList.remove("is-closing");
    document.body.style.overflow = "hidden";
    document.getElementById("modal-kicker").textContent = config.kicker;
    document.getElementById("modal-title").textContent = "Оставьте заявку, мы свяжемся с вами в ближайшее время";
    document.getElementById("modal-description").textContent = "";
    collectionModalContent.hidden = true;
    requestForm.hidden = false;
    document.getElementById("request-type").value = type;
    document.getElementById("message-input").value = config.defaultMessage;
    formStatus.textContent = "";
    formStatus.className = "form-status";
    requestAnimationFrame(() => {
      modal.classList.add("is-active");
    });
  }

  function closeModal() {
    modal.classList.remove("is-active");
    modal.classList.add("is-closing");
    document.body.style.overflow = "";
    clearTimeout(modalCloseTimer);
    modalCloseTimer = setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove("is-collection");
      modal.classList.remove("is-closing");
    }, 420);
  }

  function openPrivacyModal(title, pdfUrl) {
    if (!privacyModal || !privacyModalFrame || !pdfUrl || pdfUrl === "#") return;

    clearTimeout(privacyModalCloseTimer);
    privacyModal.hidden = false;
    privacyModal.classList.add("is-document");
    privacyModal.classList.remove("is-closing");
    if (privacyModalTitle) {
      privacyModalTitle.textContent = title || "Документ";
    }
    privacyModalFrame.src = pdfUrl;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      privacyModal.classList.add("is-active");
    });
  }

  function closePrivacyModal() {
    if (!privacyModal) return;

    privacyModal.classList.remove("is-active");
    privacyModal.classList.add("is-closing");
    document.body.style.overflow = !modal.hidden ? "hidden" : "";
    clearTimeout(privacyModalCloseTimer);
    privacyModalCloseTimer = setTimeout(() => {
      privacyModal.hidden = true;
      privacyModal.classList.remove("is-document");
      privacyModal.classList.remove("is-closing");
      if (privacyModalFrame) {
        privacyModalFrame.src = "";
      }
    }, 420);
  }

  function setupModal() {
    document.querySelectorAll("[data-open-modal]").forEach((button) => {
      button.addEventListener("click", () => openModal(button.dataset.openModal));
    });

    const privacyLink = document.getElementById("privacy-link");
    const offerLink = document.getElementById("offer-link");
    const consentPolicyLink = document.getElementById("consent-policy-link");

    [
      [privacyLink, "Политика конфиденциальности", siteConfig.legal?.privacy],
      [offerLink, "Отзыв согласия на обработку персональных данных", siteConfig.legal?.offer],
      [consentPolicyLink, "Политика конфиденциальности", siteConfig.legal?.privacy],
    ].forEach(([link, title, href]) => {
      if (!link || !href || href === "#") return;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openPrivacyModal(title, href);
      });
    });

    document.querySelectorAll("[data-close-modal]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });

    document.querySelectorAll("[data-close-privacy-modal]").forEach((element) => {
      element.addEventListener("click", closePrivacyModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) {
        closeModal();
      }
      if (event.key === "Escape" && privacyModal && !privacyModal.hidden) {
        closePrivacyModal();
      }
    });
  }

  function setupMobileMenu() {
    const toggle = document.querySelector(".burger-toggle");
    const menu = document.getElementById("mobile-menu");
    const closeButton = document.querySelector(".mobile-menu__close");

    if (!toggle || !menu || !closeButton) return;

    const setOpen = (isOpen) => {
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      menu.hidden = !isOpen;
      menu.classList.toggle("is-active", isOpen);
      document.body.classList.toggle("mobile-menu-open", isOpen);
      document.body.style.overflow = isOpen || !modal.hidden ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      const nextState = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(nextState);
    });

    closeButton.addEventListener("click", () => setOpen(false));

    menu.addEventListener("click", (event) => {
      if (event.target === menu) {
        setOpen(false);
      }
    });

    menu.querySelectorAll("a, [data-open-modal]").forEach((element) => {
      element.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });
  }

  function setFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type ? `is-${type}` : ""}`.trim();
  }

  async function submitViaFormspree(payload) {
    if (!formConfig.formspreeEndpoint) {
      throw new Error(formConfig.configErrorMessage);
    }

    const response = await fetch(formConfig.formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Не удалось отправить заявку через Formspree.");
    }
  }

  async function submitViaEmailJS(payload) {
    const { serviceId, templateId, publicKey } = formConfig.emailjs;
    if (!serviceId || !templateId || !publicKey) {
      throw new Error(formConfig.configErrorMessage);
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: payload,
      }),
    });

    if (!response.ok) {
      throw new Error("Не удалось отправить заявку через EmailJS.");
    }
  }

  function setupForm() {
    requestForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      submitButton.disabled = true;
      setFormStatus("Отправляем заявку...", "");

      const formData = new FormData(requestForm);
      const payload = {
        requestType: formData.get("requestType"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        consent: formData.get("consent") ? "yes" : "no",
        message: formData.get("message"),
        targetEmail: formConfig.submitEmail,
      };

      try {
        if (formConfig.provider === "emailjs") {
          await submitViaEmailJS(payload);
        } else {
          await submitViaFormspree(payload);
        }

        requestForm.reset();
        document.getElementById("request-type").value = payload.requestType;
        setFormStatus(formConfig.successMessage, "success");
      } catch (error) {
        setFormStatus(error.message || "Не удалось отправить заявку.", "error");
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  populateHeaderAndFooter();
  populateHero();
  renderCollectionCarousel();
  setupCollectionCarouselControls();
  renderCollectionSwatches();
  renderActiveCollection();
  setupGalleryControls();
  populateMission();
  populateAdvantages();
  populateAbout();
  populateOrganization();
  populateLegalCard();
  setupModal();
  setupMobileMenu();
  setupForm();
  setupPlaceholders();
  setupLuxuryMotion();
})();

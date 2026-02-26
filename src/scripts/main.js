import * as FilePond from "filepond";
import IMask from "imask";
import { Fancybox } from "@fancyapps/ui";
import {
  initHeroSlider,
  initTeamSlider,
  initEquipmentSlider,
  initProductionSlider,
  initArticlesSlider,
  initPortfolioSlider,
  initReviewsSlider,
  initGallerySlider,
  initDetailsSlider,
} from "./sliders.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "filepond/dist/filepond.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

document.addEventListener("DOMContentLoaded", () => {

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  const showMegaMenu = () => {
    const btn = document.querySelector(".menu__item--services");
    const megaMenu = document.querySelector(".mega-menu__outer");
    const megaMenuMobile = document.querySelector(".mega-menu-mobile__outer");
    const menu = document.querySelector(".menu");
    const burger = document.querySelector(".header__burger");
    const header = document.querySelector(".header");

    if (!btn || !megaMenu || !menu || !burger || !header || !megaMenuMobile) return;

    const openClass = "mega-menu__outer--opened";
    const openClassMobile = "mega-menu-mobile__outer--opened";
    const bodyLockClass = "locked";

    const openMenu = () => {
      const scrollbarWidth = getScrollbarWidth();

      if (window.innerWidth > 1024) {
        const menuBottomCoord = menu.getBoundingClientRect().bottom;
        megaMenu.classList.add(openClass);
        megaMenu.style.top = `${menuBottomCoord - 1}px`;
        megaMenu.style.maxHeight = `calc(100vh - ${menuBottomCoord}px)`;
      } else {
        const menuBottomCoord = header.getBoundingClientRect().bottom;
        megaMenuMobile.classList.add(openClassMobile);
        megaMenuMobile.style.top = `${menuBottomCoord - 1}px`;
        megaMenuMobile.style.maxHeight = `calc(100vh - ${menuBottomCoord}px)`;
      }

      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.classList.add(bodyLockClass);
    };

    const closeMenu = () => {
      megaMenu.classList.remove(openClass);
      megaMenuMobile.classList.remove(openClassMobile);

      document.body.style.paddingRight = "";
      document.body.classList.remove(bodyLockClass);
    };

    const toggleMenu = () => {
      const isOpen = megaMenu.classList.contains(openClass) || megaMenuMobile.classList.contains(openClassMobile);
      isOpen ? closeMenu() : openMenu();
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    megaMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    megaMenuMobile.addEventListener("click", (e) => {
      if (!e.target.closest("[data-fancybox]")) {
        e.stopPropagation();
      }
    });

    document.addEventListener("click", () => {
      closeMenu();
    });

    window.addEventListener("resize", () => {
      if (megaMenu.classList.contains(openClass)) {
        const menuBottomCoord = menu.getBoundingClientRect().bottom + window.scrollY;
        megaMenu.style.top = `${menuBottomCoord}px`;
      }
    });
  };
  const initAccordion = ({
    containerSelector = "[data-accordion]",
    triggerSelector = "[data-accordion-trigger]",
    contentSelector = "[data-accordion-content]",
    openClass = "is-open",
    single = false,
  } = {}) => {
    document.querySelectorAll(containerSelector).forEach((container) => {
      const trigger = container.querySelector(triggerSelector);
      const content = container.querySelector(contentSelector);

      if (!trigger || !content) return;

      trigger.addEventListener("click", () => {
        const isOpen = container.classList.contains(openClass);

        if (single) {
          document.querySelectorAll(`${containerSelector}.${openClass}`).forEach((opened) => {
            if (opened !== container) {
              closeItem(opened);
            }
          });
        }

        isOpen ? closeItem(container) : openItem(container);
      });
    });

    function openItem(container) {
      const content = container.querySelector("[data-accordion-content]");
      container.classList.add(openClass);
      content.classList.add(openClass);
      content.style.maxHeight = content.scrollHeight + "px";
    }

    function closeItem(container) {
      const content = container.querySelector("[data-accordion-content]");
      content.style.maxHeight = content.scrollHeight + "px";
      requestAnimationFrame(() => {
        content.style.maxHeight = "0px";
        content.classList.remove(openClass);
        container.classList.remove(openClass);
      });
    }
  };

  const initHeroDropZone = () => {
    const inputs = document.querySelectorAll("#hero-filepond ,#popup-calculation-filepond");
    if (inputs.length < 1) return;

    inputs.forEach((input) => {
      FilePond.create(input, {
        allowMultiple: true,
        maxFiles: 10,
        maxFileSize: "20MB",
        credits: false,

        acceptedFileTypes: ["application/pdf", "image/jpeg", "image/jpg", ".step", ".sldprt", ".dxf", ".ipt", ".prt", ".sat"],

        labelIdle: `
      <div class="hero-form__dropzone">
        <span class="hero-form__dropzone-text">Прикрепить файлы</span>
        <img src="/images/cloud.svg" alt="" class="hero-form__dropzone-icon" />
      </div>
    `,

        server: {
          process: null,
        },
      });
    });
  };

  const initClaculatorDropZone = () => {
    const input = document.querySelector("#calculator-filepond");
    if (!input) return;

    FilePond.create(input, {
      allowMultiple: false,
      maxFiles: 1,
      maxFileSize: "20MB",
      credits: false,

      acceptedFileTypes: ["application/pdf", ".dxf", ".dwg", ".ai"],

      labelIdle: `
      <div class="calculator__dropzone">
        <img src="/images/cloud.svg" alt="" class="calculator__dropzone-icon" />
        <div class="calculator__dropzone-title">Загрузите чертеж</div>
        <div class="calculator__dropzone-formats">Поддерживаемые форматы: .dxf, .dwg, .pdf, .ai</div>
        <div class="calculator__dropzone-button">Выбрать файл</div>
      </div>
    `,

      server: {
        process: null,
      },
      onwarning: (error) => {
        if (error.body === "Max files") {
          alert("Можно загрузить только один файл");
        }
      },
    });
  };

  const initPhoneMask = () => {
    const inputs = document.querySelectorAll(".hero-form__input-phone");
    if (inputs.length < 1) return;

    inputs.forEach((input) => {
      IMask(input, {
        mask: "+{7} (000) 000-00-00",
        lazy: false,
      });
    });
  };

  const initTabs = ({
    containerSelector = "[data-tabs]",
    triggerSelector = "[data-tab-trigger]",
    contentSelector = "[data-tab-content]",
    activeClass = "is-active",
    defaultIndex = 0,
  } = {}) => {
    document.querySelectorAll(containerSelector).forEach((container) => {
      const triggers = Array.from(container.querySelectorAll(triggerSelector)).filter((el) => el.closest(containerSelector) === container);

      const contents = Array.from(container.querySelectorAll(contentSelector)).filter((el) => el.closest(containerSelector) === container);

      if (!triggers.length || !contents.length) return;

      setActive(defaultIndex);

      triggers.forEach((trigger, index) => {
        trigger.addEventListener("click", () => {
          setActive(index);
        });
      });

      function setActive(index) {
        triggers.forEach((trigger, i) => {
          trigger.classList.toggle(activeClass, i === index);
        });

        contents.forEach((content, i) => {
          content.classList.toggle(activeClass, i === index);
        });
      }
    });
  };

  const initPartialCollapse = ({
    containerSelector = "[data-collapse]",
    triggerSelector = "[data-collapse-trigger]",
    contentSelector = "[data-collapse-content]",
    openClass = "is-open",
    collapsedRows = 6,
    duration = 300,
  } = {}) => {
    document.querySelectorAll(containerSelector).forEach((container) => {
      const trigger = container.querySelector(triggerSelector);
      const content = container.querySelector(contentSelector);
      const table = content?.querySelector("table");
      const textEl = trigger?.querySelector(".prices__table-collapse-text");

      if (!trigger || !content || !table || !textEl) return;

      const rows = table.querySelectorAll("tbody tr");
      if (rows.length <= collapsedRows) {
        trigger.style.display = "none";
        return;
      }

      const initialText = textEl.textContent.trim();

      content.style.overflow = "hidden";
      content.style.transition = `height ${duration}ms ease`;

      let collapsedHeight = calculateHeight();

      setCollapsed();

      trigger.addEventListener("click", () => {
        const isOpen = container.classList.contains(openClass);

        if (isOpen) {
          setCollapsed();
        } else {
          setExpanded();
        }
      });

      const resizeObserver = new ResizeObserver(() => {
        collapsedHeight = calculateHeight();

        if (!container.classList.contains(openClass)) {
          content.style.height = collapsedHeight + "px";
        }
      });

      resizeObserver.observe(table);

      window.addEventListener("resize", () => {
        collapsedHeight = calculateHeight();

        if (!container.classList.contains(openClass)) {
          content.style.height = collapsedHeight + "px";
        }
      });

      function calculateHeight() {
        let height = 0;

        for (let i = 0; i < collapsedRows; i++) {
          height += rows[i].offsetHeight;
        }

        const thead = table.querySelector("thead");
        if (thead) height += thead.offsetHeight;

        return height + 1;
      }

      function setCollapsed() {
        const currentHeight = content.scrollHeight;

        content.style.height = currentHeight + "px";

        requestAnimationFrame(() => {
          content.style.height = collapsedHeight + "px";
        });

        container.classList.remove(openClass);
        trigger.classList.remove(openClass);
        textEl.textContent = initialText;
      }

      function setExpanded() {
        content.style.height = content.scrollHeight + "px";
        container.classList.add(openClass);
        trigger.classList.add(openClass);
        textEl.textContent = "Свернуть";

        content.addEventListener(
          "transitionend",
          () => {
            if (container.classList.contains(openClass)) {
              content.style.height = "auto";
            }
          },
          { once: true },
        );
      }
    });
  };

  const initSelect = ({ selector = "[data-select]", openClass = "is-open", selectedClass = "is-selected" } = {}) => {
    document.querySelectorAll(selector).forEach((nativeSelect) => {
      if (nativeSelect.dataset.selectInit) return;
      nativeSelect.dataset.selectInit = "true";

      const wrapper = document.createElement("div");
      wrapper.className = "custom-select";

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-select__trigger";

      const triggerText = document.createElement("span");
      triggerText.className = "custom-select__text";

      const arrow = document.createElement("span");
      arrow.className = "custom-select__arrow";
      arrow.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0008 6.6631C9.89113 6.66247 9.78241 6.68349 9.68088 6.72496C9.57935 6.76643 9.48701 6.82753 9.40914 6.90477L4.40914 11.9048C4.25222 12.0617 4.16406 12.2745 4.16406 12.4964C4.16406 12.7184 4.25222 12.9312 4.40914 13.0881C4.56606 13.245 4.77889 13.3332 5.00081 13.3332C5.22272 13.3332 5.43555 13.245 5.59247 13.0881L10.0008 8.67143L14.4091 13.0798C14.5686 13.2163 14.7736 13.2876 14.9833 13.2795C15.1931 13.2714 15.392 13.1845 15.5404 13.0361C15.6889 12.8877 15.7758 12.6887 15.7839 12.479C15.792 12.2692 15.7207 12.0642 15.5841 11.9048L10.5841 6.90477C10.4289 6.75081 10.2194 6.66402 10.0008 6.6631Z" fill="#9E9E9E"/>
        </svg>
        `;

      const dropdown = document.createElement("div");
      dropdown.className = "custom-select__dropdown";

      const list = document.createElement("div");
      list.className = "custom-select__list";

      const isMultiple = nativeSelect.multiple;

      nativeSelect.style.display = "none";
      nativeSelect.parentNode.insertBefore(wrapper, nativeSelect);
      wrapper.appendChild(nativeSelect);
      wrapper.appendChild(trigger);
      trigger.appendChild(triggerText);
      trigger.appendChild(arrow);
      wrapper.appendChild(dropdown);
      dropdown.appendChild(list);

      function renderOptions() {
        list.innerHTML = "";

        [...nativeSelect.options].forEach((option, index) => {
          const item = document.createElement("div");
          item.className = "custom-select__option";
          item.textContent = option.textContent;
          item.dataset.value = option.value;

          if (option.selected) {
            item.classList.add(selectedClass);
          }

          item.addEventListener("click", () => {
            if (isMultiple) {
              option.selected = !option.selected;
              item.classList.toggle(selectedClass);
            } else {
              nativeSelect.value = option.value;
              close();
            }

            updateTrigger();
            nativeSelect.dispatchEvent(new Event("change"));
          });

          list.appendChild(item);
        });
      }

      function updateTrigger() {
        const selectedOptions = [...nativeSelect.selectedOptions];

        if (!selectedOptions.length) {
          triggerText.textContent = nativeSelect.options[0]?.textContent || "Выберите";
          return;
        }

        if (isMultiple) {
          triggerText.textContent = selectedOptions.map((o) => o.textContent).join(", ");
        } else {
          triggerText.textContent = selectedOptions[0].textContent;
        }
      }

      function open() {
        wrapper.classList.add(openClass);
      }

      function close() {
        wrapper.classList.remove(openClass);
      }

      trigger.addEventListener("click", () => {
        wrapper.classList.toggle(openClass);
      });

      document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) {
          close();
        }
      });

      renderOptions();
      updateTrigger();
    });
  };

  const initShowAllReviewServices = () => {
    const lists = document.querySelectorAll(".reviews__sevices-list");
    const amountToShow = 2;
    if (!lists.length) return;

    lists.forEach((list) => {
      const items = list.querySelectorAll(".reviews__services-item");

      if (items.length <= amountToShow) return;

      items.forEach((item, index) => {
        if (index >= amountToShow) {
          item.classList.add("is-hidden");
        }
      });

      if (!list.querySelector(".reviews__services-item--more")) {
        const moreItem = document.createElement("li");
        moreItem.className = "reviews__services-item reviews__services-item--more";
        moreItem.textContent = "...";

        list.appendChild(moreItem);
        moreItem.addEventListener("click", () => {
          moreItem.classList.add("is-hidden");
          items.forEach((item) => {
            item.classList.remove("is-hidden");
          });
        });
      }
    });
  };

  const loadYmaps = () => {
    return new Promise((resolve, reject) => {
      if (window.ymaps3) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/v3/?apikey=200ac953-8570-4b6d-a4e7-0b6995e5e33d&lang=ru_RU";
      script.onload = () => resolve();
      script.onerror = reject;

      document.head.appendChild(script);
    });
  };

  const initMap = async () => {
    try {
      await loadYmaps();
      await ymaps3.ready;
    } catch (e) {
      console.error("Yandex Maps load error", e);
      return;
    }
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    const map = new YMap(mapContainer, {
      location: {
        center: [37.693016, 55.700354],
        zoom: 17,
      },
      theme: "dark",
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const markerElement = document.createElement("div");
    markerElement.className = "map-marker";

    markerElement.innerHTML = `
    <svg class="map-marker__icon" width="36" height="45" viewBox="0 0 36 45" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.9945 0C14.4358 0.00187572 10.9574 1.05838 7.99876 3.03606C5.04013 5.01375 2.73397 7.82389 1.37157 11.1115C0.0091759 14.3992 -0.348337 18.0168 0.344192 21.5076C1.03672 24.9983 2.74822 28.2055 5.26252 30.724C8.52252 33.984 16.1945 38.7 16.6485 43.654C16.7165 44.394 17.2545 45 17.9945 45C18.7345 45 19.2745 44.394 19.3405 43.654C19.7945 38.7 27.4605 33.992 30.7185 30.734C33.2358 28.2165 34.9501 25.0091 35.6449 21.5175C36.3396 18.0258 35.9836 14.4065 34.6218 11.1171C33.26 7.82777 30.9535 5.01598 27.994 3.0372C25.0344 1.05842 21.5546 0.00148293 17.9945 0ZM17.9945 24.158C17.1858 24.158 16.3851 23.9987 15.638 23.6893C14.8908 23.3798 14.212 22.9262 13.6402 22.3544C13.0683 21.7825 12.6147 21.1037 12.3053 20.3566C11.9958 19.6094 11.8365 18.8087 11.8365 18C11.8365 17.1913 11.9958 16.3906 12.3053 15.6434C12.6147 14.8963 13.0683 14.2175 13.6402 13.6456C14.212 13.0738 14.8908 12.6202 15.638 12.3108C16.3851 12.0013 17.1858 11.842 17.9945 11.842C19.6277 11.842 21.194 12.4908 22.3489 13.6456C23.5037 14.8005 24.1525 16.3668 24.1525 18C24.1525 19.6332 23.5037 21.1995 22.3489 22.3544C21.194 23.5092 19.6277 24.158 17.9945 24.158Z"/>
    </svg>
    `;

    const marker = new YMapMarker({ coordinates: [37.6928, 55.700504] }, markerElement);

    map.addChild(marker);
  };

  Fancybox.bind("[data-fancybox]", {
    dragToClose: false,
  });


  showMegaMenu();
  initAccordion();
  initHeroSlider();
  initTeamSlider();
  initEquipmentSlider();
  initHeroDropZone();
  initClaculatorDropZone();
  initPhoneMask();
  initTabs();
  initPartialCollapse();
  initSelect();
  initPortfolioSlider();
  initReviewsSlider();
  initShowAllReviewServices();
  initProductionSlider();
  initArticlesSlider();
  initMap();
  initGallerySlider();
  initDetailsSlider();
});

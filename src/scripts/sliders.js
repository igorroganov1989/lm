import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";


const initHeroSlider = () => {
    const slider = document.querySelector(".hero-slider__wrapper");

    if (!slider) return;

    new Swiper(slider, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 1,
      navigation: {
        nextEl: slider.querySelector(".hero-slider__button-next"),
        prevEl: slider.querySelector(".hero-slider__button-prev"),
      },
    });
  };
  const initTeamSlider = () => {
    const slider = document.querySelector(".team__slider");

    if (!slider) return;

    new Swiper(slider, {
      modules: [Navigation],
      spaceBetween: 32,
      navigation: {
        nextEl: slider.querySelector(".team__slider-button-next"),
        prevEl: slider.querySelector(".team__slider-button-prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
        1648: {
          slidesPerView: 2,
        },
      },
    });
  };

  const initEquipmentSlider = () => {
    const slider = document.querySelector(".equipment__slider");

    if (!slider) return;

    new Swiper(slider, {
      modules: [Navigation],
      spaceBetween: 32,
      navigation: {
        nextEl: slider.querySelector(".equipment__slider-button-next"),
        prevEl: slider.querySelector(".equipment__slider-button-prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
        1648: {
          slidesPerView: 3,
        },
      },
    });
  };
  const initProductionSlider = () => {
    const sliders = document.querySelectorAll(".production__slider");

    if (sliders.length < 1) return;

    const baseConfig = {
      modules: [Navigation],
      spaceBetween: 32,
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
      },
    };

    sliders.forEach((slider) => {
      const isDetails = slider.classList.contains("details__slider");

      new Swiper(slider, {
        ...baseConfig,

        navigation: {
          nextEl: slider.querySelector(".production__slider-button-next"),
          prevEl: slider.querySelector(".production__slider-button-prev"),
        },

        breakpoints: {
          ...baseConfig.breakpoints,
          1648: {
            slidesPerView: isDetails ? 3 : 4,
          },
        },
      });
    });
  };

  const initArticlesSlider = () => {
    const slider = document.querySelector(".articles__slider");

    if (!slider) return;

    new Swiper(slider, {
      modules: [Navigation],
      spaceBetween: 32,
      navigation: {
        nextEl: slider.querySelector(".articles__slider-button-next"),
        prevEl: slider.querySelector(".articles__slider-button-prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
        1648: {
          slidesPerView: 3,
        },
      },
    });
  };

  const initPortfolioSlider = () => {
    const slider = document.querySelector(".portfolio__slider");

    if (!slider) return;

    new Swiper(slider, {
      modules: [Navigation],
      spaceBetween: 32,
      navigation: {
        nextEl: slider.querySelector(".portfolio__slider-button-next"),
        prevEl: slider.querySelector(".portfolio__slider-button-prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
        1648: {
          slidesPerView: 2,
        },
      },
    });
  };

  const initReviewsSlider = () => {
    const slider = document.querySelector(".reviews__slider");

    if (!slider) return;

    new Swiper(slider, {
      modules: [Navigation],
      spaceBetween: 32,
      navigation: {
        nextEl: slider.querySelector(".reviews__slider-button-next"),
        prevEl: slider.querySelector(".reviews__slider-button-prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
        1648: {
          slidesPerView: 3,
        },
      },
    });
  };

  
  const initGallerySlider = () => {
    document.querySelectorAll("[data-gallery]").forEach((gallery) => {
      const thumbsEl = gallery.querySelector(".gallery-slider__thumbs");
      const topEl = gallery.querySelector(".gallery-slider__top");
      const nextEl = gallery.querySelector(".gallery-slider__arrow-next");
      const prevEl = gallery.querySelector(".gallery-slider__arrow-prev");

      if (!thumbsEl || !topEl) return;

      const thumbs = new Swiper(thumbsEl, {
        modules: [Thumbs],
        spaceBetween: 16,
        slidesPerView: "auto",
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        freeMode: true,
        watchOverflow: true,
      });

      new Swiper(topEl, {
        modules: [Navigation, Thumbs],
        spaceBetween: 16,
        navigation: { nextEl, prevEl },
        thumbs: { swiper: thumbs },
      });
    });
  };

  const initDetailsSlider = () => {
    const slider = document.querySelector(".details-slider__wrapper");

    if (!slider) return;

    new Swiper(slider, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 1,
      navigation: {
        nextEl: slider.querySelector(".details-slider__arrow-next"),
        prevEl: slider.querySelector(".details-slider__arrow-prev"),
      },
    });
  };

  export {
  initHeroSlider,
  initTeamSlider,
  initEquipmentSlider,
  initProductionSlider,
  initArticlesSlider,
  initPortfolioSlider,
  initReviewsSlider,
  initGallerySlider,
  initDetailsSlider,
};
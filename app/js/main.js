//-------------Menu-burger----------------------
function menuBodyOpen() {
  const menuBtn = document.querySelector('.js-menu-btn');
  const menuBody = document.querySelector('.js-top-menu__list');
  //const menuCatalogBtn = document.querySelector('.js-menu-catalog')
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menuBody.classList.toggle('menu-open');
    document.documentElement.classList.remove('catalor-open');
    document.documentElement.classList.remove('_sub-menu-open');
  })
}
menuBodyOpen();
//-------------выподающий список-----------------
function headerPhones() {
  const phonesMenu = document.querySelector('.phones__menu');
  const phonesList = document.querySelector('.js-phones-menu-list');
  const phoneBtns = document.querySelectorAll('.js-phones-menu-btn');

  function showMenu() {
    phonesList.classList.toggle('_active');

  }
  phoneBtns.forEach(phoneBtn => {
    phoneBtn.addEventListener('click', showMenu)
  })
  //document.addEventListener('click', menu);

  // function menu(event) {
  //   if (event.target.closest('.js-phones-menu-btn')) {
  //     phonesMenu.classList.toggle('_active');
  //     //headerList.classList.toggle('_open');
  //   }
  //   if (!event.target.closest('.phones__menu')) {
  //     phonesMenu.classList.remove('_active');
  //     //headerList.classList.remove('_open');
  //   }
  // }
}
headerPhones();
//------------------Модальное окно phones-header-----
function modalPopup() {
  const btn = document.querySelectorAll('.btn');
  const modalOverlay = document.querySelector('.modal-overlay ');
  const modals = document.querySelectorAll('.modal-body');

  btn.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
    });
  });

  modalOverlay.addEventListener('click', (e) => {

    if (e.target == modalOverlay) {
      modalOverlay.classList.remove('modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });
    }
  })
}
modalPopup();
//-----------------------CATALOG-SUB-MENU------------------
function catalogSubMenu() {

  document.addEventListener('click', documentActions);

  const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block');
  if (menuBlocks.length) {
    menuBlocks.forEach(menuBlock => {
      const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length;
      menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
    })
  }

  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.closest('[data-parent]')) {
      const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
      const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
      if (subMenu) {
        const activeLink = document.querySelector('.sub-menu-active');
        const activeBlock = document.querySelector('.sub-menu-open');

        if (activeLink && activeLink !== targetElement) {
          activeLink.classList.remove('sub-menu-active');
          activeBlock.classList.remove('sub-menu-open');
          document.documentElement.classList.remove('_sub-menu-open');
        }
        document.documentElement.classList.toggle('_sub-menu-open');
        targetElement.classList.toggle('sub-menu-active');
        subMenu.classList.toggle('sub-menu-open');
      }
      e.preventDefault();
    }

    if (targetElement.closest('.menu-top-header__link-catalog')) {
      document.documentElement.classList.add('catalor-open');
      e.preventDefault();

      function menuCatalogOpen() {
        const menuCatalogBtn = document.querySelector('.js-menu-catalog-btn');
        const menuSubMenugBtn = document.querySelector('.js-menu-sub-menu-btn');
        menuCatalogBtn.addEventListener('click', function () {
          document.documentElement.classList.remove('catalor-open');
          document.querySelector('.sub-menu-active') ? document.querySelector('.sub-menu-active').classList.remove('sub-menu-active') : null;
          document.querySelector('.sub-menu-open') ? document.querySelector('.sub-menu-open').classList.remove('sub-menu-open') : null;
        })
        menuSubMenugBtn.addEventListener('click', function () {
          document.documentElement.classList.remove('_sub-menu-open');
        })
      }
      menuCatalogOpen();


    }
  }
}
catalogSubMenu();
//---------------home-slider-----------------------------------------
const swiper = new Swiper(".main-block__slider", {
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 40,
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".controll-main-block__dotts",
    clickable: true,
  },

 
  on: { 
    init: function (swiper) {
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
 //------------------------счетчик-фракции--------------------------------
      const allSlides = document.querySelector('.fraction-controll__all');
      const allSlidesItems = document.querySelectorAll('.slide-main-block:not(.swiper-slide-duplicate)');
      allSlides.innerHTML = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
    },
    slideChange: function (swiper) {
      const currentSlide = document.querySelector('.fraction-controll__current');
      currentSlide.innerHTML = swiper.realIndex + 1 < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
    }, 
    
    }
});
//-------------------------рейтинг звезд---------------------------
function ratingStars() {
  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }

  function initRatings() {
    let ratingActive, ratingValue;
    //перебераем все рейтенги-----
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }
    //инициализируем конкретный рейтинг
    function initRating(rating) {
      initRatingVars(rating);

      setRatingActiveWidth();

      if (rating.classList.contains('rating-set')) {
        setRating(rating);
      }
    }

    //функция инициализация переменных (ratingActive, ratingValue)---
    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    }

    //функция изъменения активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    //функция возможности указывать оценку
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating__item');
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener('mouseenter', function (e) {
          //Обновление переменной
          initRatingVars(rating);
          //Обновление активных звезд
          setRatingActiveWidth(ratingItem.value);
        });
        ratingItem.addEventListener('mouseleave', function (e) {
          //Обновление активных звезд
          setRatingActiveWidth();
        });
        ratingItem.addEventListener('click', function (e) {
          //Обновление переменной
          initRatingVars(rating);

          if (rating.dataset.ajax) {
            //Отправить на сервер
            setRatingValue(ratingItem.value, rating);
          } else {
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
          }
        })
      }
    }
  }
}
ratingStars();
//------------------products-slider-------------------
const swiperProducts = new Swiper(".products-slider__slider", {

  observer: true,
  observeParents: true,
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  speed: 3500,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".products-slider__dotts",
    clickable: true,
  },
  breakpoints: {
    310: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    675: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1340: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },

});
//------------------new-products-slider-------------------
const swiperNewProducts = new Swiper(".new-products__slider", {

  observer: true,
  observeParents: true,
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  speed: 3500,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".new-products__slider-dotts",
    clickable: true,
  },
  breakpoints: {

    310: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    675: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    965: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1340: {
      slidesPerView: 3,
      spaceBetween: 30,
    },

  },

});
//------------------product-thumbs-slider-------------------

const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 15,
  slidesPerView: 4,
  freeMode: true,
  loop: true,
  speed: 2000,
  watchSlidesProgress: true,
  //loopedSlides: 5, //looped slides should be the same
  watchSlidesProgress: true,
  breakpoints: {
    300: {
      spaceBetween: 5,
    },
    500: {
      spaceBetween: 15,
    }
  },
});
const galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 5,
  slidesPerView: 1,
  mousewheel: true,
  speed: 2000,
  loop: true,
  thumbs: {
    swiper: galleryThumbs,
  },
});

//-------------------articles-slider----------------------------
const swiperArticles = new Swiper(".articles-slider__swiper", {

  observer: true,
  observeParents: true,
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  speed: 3500,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".new-products__slider-dotts",
    clickable: true,
  },
  breakpoints: {

    310: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

  },

});
//-------------------catalog-cards-slider----------------------------
const swiperCatalogCards = new Swiper(".catalog-slider__swiper", {

  observer: true,
  observeParents: true,
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  speed: 5500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".new-products__slider-dotts",
    clickable: true,
  },
  breakpoints: {

    310: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    790: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    991: {
      slidesPerView: 2,
      spaceBetween: 30,
    },

  },

});
//--------------------select---------------------------------------------
let select = function () {
  let selectHeader = document.querySelectorAll('.select__header');
  let selectItem = document.querySelectorAll('.select__item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToogle)
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose)
  });

  function selectToogle() {
    this.parentElement.classList.toggle('open-select');
  }

  function selectChoose() {
    let text = this.innerText;
    let selectClosest = this.closest('.select');
    let currentText = selectClosest.querySelector('.select__current');
    currentText.innerText = text;
    selectClosest.classList.remove('open-select');
  }
};
select();

//-----------------range-slider-1------------------------
function rangeSliders1() {
  const rangeSlider = document.getElementById('range-slider');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [500, 20000],
      connect: true,
      step: 1,
      //tooltips: [true, true],
      range: {
        'min': [500],
        'max': [20000]
      }
    });
    const input0 = document.getElementById('input-0');
    const input1 = document.getElementById('input-1');
    const inputs = [input0, input1];
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    })
    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;
      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index, ) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      })
    })
  }
}
rangeSliders1();
//-----------------range-slider-2------------------------
function rangeSliders2() {
  const rangeSlider = document.getElementById('range-slider-2');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [100, 600],
      connect: true,
      step: 1,
      range: {
        'min': [100],
        'max': [600]
      }
    });
    const input0 = document.getElementById('input0');
    const input1 = document.getElementById('input1');
    const inputs = [input0, input1];
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    })
    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;
      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index, ) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      })
    })
  }
}
rangeSliders2();
//-----------------range-slider-3------------------------
function rangeSliders3() {
  const rangeSlider = document.getElementById('range-slider-3');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [100, 600],
      connect: true,
      step: 1,
      range: {
        'min': [100],
        'max': [600]
      }
    });
    const input0 = document.getElementById('input-length-0');
    const input1 = document.getElementById('input-length-1');
    const inputs = [input0, input1];
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    })
    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;
      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index, ) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      })
    })
  }
}
rangeSliders3();

//-----------------range-slider-4------------------------
function rangeSliders4() {
  const rangeSlider = document.getElementById('range-slider-4');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [100, 600],
      connect: true,
      step: 1,
      range: {
        'min': [100],
        'max': [600]
      }
    });
    const input0 = document.getElementById('input-length0-0');
    const input1 = document.getElementById('input-lengt1-1');
    const inputs = [input0, input1];
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    })
    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;
      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index, ) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      })
    })
  }
}
rangeSliders4();
//------------------spoiler-------------------------------
function mySpollers() {
  //Находим все спойлеры
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    //Получаем обычный спойлер
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    //Инициализация обычного спойлера 
    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    }

    //Получение спойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
    });
    //Инициализация спойлеров с медиа запросами
    if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach((item) => {
        const params = item.dataset.spollers;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      //Получаем уникальные брейкпонты
      let mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });
      //Работаем с каждым брейкпоинтам
      mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);

        //Объекты с нужными условиями
        const spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        //Событие
        matchMedia.addListener(function () {
          initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia);
      });
    }
    //Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener('click', setSpollerAction);
        } else {
          spollersBlock.classList.remove('_init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener('click', setSpollerAction);
        }
      });
    }
    //Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
        spollerTitles.forEach((spollerTitle) => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');
            if (!spollerTitle.classList.contains('_active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
        const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_active')) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle('_active');
          _slideToggle(spollerTitle.nextElementSibling, 0);
        }
        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active');
        _slideUp(spollerActiveTitle.nextElementSibling, 0);
      }
    }
  }

  //-SlideToggle---------------------------------
  let _slideUp = (target, duration = 0) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.heigth = target.offsetHeigth + 'px';
      target.offsetHeigth;
      target.style.overflow = 'hidden';
      target.style.heigth = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  }
  let _slideDown = (target, duration = 0) => {
    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
        target.hidden = false;
      }
      let heigth = target.offsetHeigth;
      target.style.overflow = 'hidden';
      target.style.heigth = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeigth;
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.heigth = heigth + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  }
  let _slideToggle = (target, duration = 0) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }
}
mySpollers();
//-------------------counter----------------------------

function myCounter() {
  const btns = document.querySelectorAll('.counter__btn');

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      const direction = this.dataset.direction;
      const inp = this.parentElement.querySelector('.counter__value');
      const currentValue = +inp.value;
      let newValue;

      if (direction === 'plus') {
        newValue = currentValue + 1;
      } else {
        newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
      }
      inp.value = newValue;
    })
  })
}
myCounter();
//--------------------tabs--------------------
function myTabs() {
  const tabsBtns = document.querySelectorAll('.tabs__nav-btn');
  const tabsItems = document.querySelectorAll('.tabs__item');

  tabsBtns.forEach((item) => {
    item.addEventListener('click', function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute('data-tab');
      let currentTab = document.querySelector(tabId);

      if (!currentBtn.classList.contains('active')) {
        tabsItems.forEach((item) => {
          item.classList.remove('active')
        });

        tabsBtns.forEach((item) => {
          item.classList.remove('active')
        });

        currentBtn.classList.add('active');
        currentTab.classList.add('active');
      }
    });
  });
  document.querySelector('.tabs__nav-btn').click();
}
myTabs();

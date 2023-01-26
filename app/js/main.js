//-------------Menu-burger----------------------
function menuBodyOpen() {
  const menuBtn = document.querySelector('.js-menu-btn');
  const menuBody = document.querySelector('.js-top-menu__list');
  const menuCatalogBtn = document.querySelector('.js-menu-catalog')
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menuBody.classList.toggle('menu-open');
    document.documentElement.classList.remove('catalor-open');
    document.querySelector('.sub-menu-open').classList.remove('sub-menu-open');
    document.documentElement.classList.remove('_sub-menu-open');
  })
}
menuBodyOpen();
//-------------выподающий список-----------------
function headerPhones() {
  const headerArrow = document.querySelector('.js-header-arrow');
  const headerList = document.querySelector('.js-header-list');
  headerArrow.addEventListener('click', () => {
    headerList.classList.toggle('active')
    headerArrow.classList.toggle('active')
  })
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
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".controll-main-block__dotts",
    clickable: true,
  },
  //------------------------счетчик-фракции--------------------------------
  on: {
    init: function (swiper) {
      const allSlides = document.querySelector('.fraction-controll__all');
      const allSlidesItems = document.querySelectorAll('.slide-main-block:not(.swiper-slide-duplicate)');
      allSlides.innerHTML = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
    },
    slideChange: function (swiper) {
      const currentSlide = document.querySelector('.fraction-controll__current');
      currentSlide.innerHTML = swiper.realIndex + 1 < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
    }
  }
});
//-------------------------рейтинг звезд--------------------------------------------------
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
function spoilerCatalog() {
  const spoilerTitle = document.querySelectorAll("[data-name='spoiler-title']");

  spoilerTitle.forEach(function (item) {
    item.addEventListener("click", spoilerTitleClick);
  });

  function spoilerTitleClick() {
    this.nextElementSibling.classList.toggle("spoiler-body");
  }
}
spoilerCatalog();
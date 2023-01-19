//-------------Menu-burger----------------------
const menuBtn = document.querySelector('.js-menu-btn');
const menuBody = document.querySelector('.js-top-menu__list');
const menuCatalogBtn = document.querySelector('.js-menu-catalog')

function menuBodyOpen() {
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
    //modules: [Navigation, Pagination, Autoplay],
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3500,
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
//---------------------------------------------------------------------------
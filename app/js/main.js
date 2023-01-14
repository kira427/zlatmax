//-------------Menu-burger----------------------
const menuBtn = document.querySelector('.js-menu-btn');
const menuBody = document.querySelector('.js-top-menu__list');

function menuBodyOpen() {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menuBody.classList.toggle('menu-open');
    })
}
menuBodyOpen();
//-------------выподающий список-----------------
const headerArrow = document.querySelector('.js-header-arrow');
const headerList = document.querySelector('.js-header-list');

function headerPhones() {
    headerArrow.addEventListener('click', () => {
        headerList.classList.toggle('active')
        headerArrow.classList.toggle('active')
    })
}
headerPhones();

//------------------Модальное окно phones-header-----
const btn = document.querySelectorAll('.btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal-body');

function modalPopup() {
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
            const catalogMenu = document.querySelector('.js-catalog-header')
            if (subMenu) {
                const activeLink = document.querySelector('.sub-menu-active');
                const activeBlock = document.querySelector('.sub-menu-open');

                if (activeLink && activeLink !== targetElement) {
                    activeLink.classList.remove('sub-menu-active');
                    activeBlock.classList.remove('sub-menu-open');
                }
                targetElement.classList.toggle('sub-menu-active');
                subMenu.classList.toggle('sub-menu-open');
            }
            e.preventDefault();
        }

        // if (targetElement.closest('.menu-top-header__link-catalog')) {
        //     document.documentElement.classList.add('catalor-open');
        //     e.preventDefault();
        // }
    }
}
catalogSubMenu();

const linkCatalog = document.querySelector('.menu-top-header__link-catalog');
const menuCatalog = document.querySelector('.menu-catalog');
linkCatalog.addEventListener('click', () => {    
    menuCatalog.classList.toggle('catalog-open');
})
//--------------------------------------------------------
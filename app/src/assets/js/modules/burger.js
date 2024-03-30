/*
 *   Обеспечивает основной функционал горизонтального меню для всех меню
 *   блок содержащий меню должен иметь класс который устанавливается в константе classContainerMenu
 *   стили в файле burger.less
 
 *   основные функции:
 *      индекатор того что данный пункт имеет подменю
 *      блокировка скпрола страницы при открытом меню в мобильной версии
 *      реакция пунктов при наведении в версии для PC 
 *      затемнение фона при открытии (опционально, задаётся в HTML)
 *      выпадение подменю на десктопе
 *      обеспечивает работу нескольких меню на странице
 *      - локации выпадающей части задаются  в css 
 *      - сркрол внутри блоков меню на всех уровнях вложенности
 *   
 */

function burger() {

    /* set this variables for your menu*/
    const classContainerMenu = 'wrap-burger-menu'; // class of blocks that is contenting menu

    let containerMenu,
        menu,
        burgerMenuTogle;

    let countOpenMenu = 0;
    let iconMenuClose = 0;


    const containersMenu = document.querySelectorAll(`.${classContainerMenu} nav`);
    const _containersMenu = document.querySelectorAll(`.${classContainerMenu}`);


    if (containersMenu.length === null || _containersMenu.length === null) {
        return false;
    }

    _containersMenu.forEach((menu) => {
        let widthAllItems = 0;
        let totalSpace = 0;
        const toggle = menu.querySelector('.show-hide-menu');
        let wrapDropMenu = document.createElement('div');
        wrapDropMenu.classList.add('drop-menu', 'hidden')



        menu.querySelectorAll('nav>ul>li').forEach((elMenu) => {
            widthAllItems += elMenu.offsetWidth;
            if (elMenu.getBoundingClientRect().right > menu.getBoundingClientRect().right) {
                toggle.classList.remove('hidden');
                wrapDropMenu.append(elMenu);
            }
        })

        if (wrapDropMenu.childElementCount > 0) {
            menu.querySelector('nav').append(wrapDropMenu);
        }
        menu.style.visibility = 'visible'; // показываю меню после окончательногоформирования
    })


    const toglesShowHideMenu = document.querySelectorAll(`.show-hide-menu`);
    toglesShowHideMenu.forEach(togle => {
        togle.addEventListener('click', e => {
            togle.closest('nav').querySelector('.drop-menu').classList.toggle('hidden');
        })
    });

    const ToglesBurgerMenu = document.querySelectorAll('.menu-icon');
    const itemsMenu = document.querySelectorAll(`.${classContainerMenu} li`);
    let iconDropdown;

    for (var i = 0; i <= itemsMenu.length - 1; i++) {

        if (itemsMenu[i].children.length === 0) {
            continue; // Пропустить элементы без дочерних элементов
        }

        if (itemsMenu[i].querySelector('ul') && !itemsMenu[i].querySelector('.icon-dropdown')) {
            iconDropdown = document.createElement('span');
            iconDropdown.classList.add('icon-dropdown'); // here you can change icon for  menu item that contains submenu
            itemsMenu[i].append(iconDropdown);
            if (iconDropdown) {
                iconDropdown.addEventListener('click', e => {

                    e.target.classList.toggle('icon-dropdown_open');
                    if (e.target.classList.contains('icon-dropdown_open')) {
                        subMenuOpen(e);
                    } else {
                        subMenuClose(e);
                    }
                });
            }
        }

        itemsMenu[i].addEventListener('mouseenter', subMenuOpen);
        itemsMenu[i].addEventListener('mouseleave', subMenuClose);

        let subMenu;

        function subMenuOpen(e) {
            if (e.type === 'click') {
                subMenu = e.target.closest('li').querySelector('ul');
            } else if (e.type === 'mouseenter') {
                subMenu = e.target.querySelector('ul');
            }

            if (subMenu) {

                gsap.to(subMenu, {
                    duration: 1,
                    ease: "power4.inOut",
                    height: 'auto',
                    overflow: 'visible',
                    pointerEvents: 'auto',
                    opacity: 1,
                    width: 'auto',
                });
            }
        }

        function subMenuClose(e) {

            if (e.type === 'click') {
                subMenu = e.target.closest('li').querySelector('ul');
            } else if (e.type === 'mouseleave') {
                subMenu = e.target.querySelector('ul');
                if (e.target.querySelector('.icon-dropdown_open')) {
                    e.target.querySelector('.icon-dropdown_open').classList.remove('icon-dropdown_open');
                }
            }

            if (document.querySelector('body').classList.contains('lock') && subMenu && subMenu.closest.tagName === 'NAV') {
                document.querySelector('body').classList.remove('lock');
            }

            gsap.to(subMenu, {
                duration: 1,
                ease: "power4.inOut",
                height: '0px',
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: 0,
                width: 0,
            });
        }
    }

    // close burger menu when Smooth scrolling
    const gotoLinks = document.querySelectorAll('[data-goto]');
    if (gotoLinks.length > 0) {
        gotoLinks.forEach(gotoLink => {
            gotoLink.addEventListener('click', burgerMenuClose);
        });
    }

    // open burger menu
    ToglesBurgerMenu.forEach(togleBurgerMenu => {

        togleBurgerMenu.addEventListener('click', e => {
            burgerMenuTogle = e.target;
            if (burgerMenuTogle.classList.contains('menu-icon_close')) iconMenuClose = true;
            if (countOpenMenu > 0) burgerMenuClose();

            containerMenu = e.target.closest(`.${classContainerMenu}`);
            menu = containerMenu.querySelector('nav');

            if (burgerMenuTogle.classList.contains('menu-icon_close')) {
                burgerMenuClose();
            } else if (!burgerMenuTogle.classList.contains('menu-icon_close') && iconMenuClose !== true) {
                burgerMenuOpen();
            }

            iconMenuClose = false;

        });
    })

    function burgerMenuOpen() {
        ++countOpenMenu;
        document.querySelector('body').classList.add('lock');
        menu.classList.add('burger-menu-open');
        menu.closest('.wrap-burger-menu')
            .querySelector('.menu-icon')
            .classList
            .add('menu-icon_close');
    }

    function burgerMenuClose() {
        --countOpenMenu;
        document.querySelector('body').classList.remove('lock');
        menu.classList.remove('burger-menu-open');
        menu.closest('.wrap-burger-menu')
            .querySelector('.menu-icon')
            .classList
            .remove('menu-icon_close');
    }

    function burgerMenuAdapt() {


    }

    //клик мимо
    document.addEventListener('click', (e) => {

        if (menu !== undefined && menu.classList.contains('burger-menu-open') &&
            !menu.contains(e.target) &&
            !burgerMenuTogle.contains(e.target)
        ) {
            burgerMenuClose();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            burgerMenuClose(e);
        }
    });


}

burger();
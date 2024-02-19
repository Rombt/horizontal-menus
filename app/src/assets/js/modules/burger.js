// todo add icon for menu items  that contain submenu
/*
 *   Обеспечивает основной функционал горизонтального меню для всех меню
 *   блок содержащий меню должен иметь дата атребут data-horizontal_menu
 *   
 *   основные функции:
 *                 индекатор того что данный пункт ммеет подменю
 *                 блокировка скпрола при открытом меню
 *                 реакция пунктов при наведении
 *                 сркрол внутри блоков меню на всех уровнях вложенности
 *                 затемнение фона при открытии (опционально, задаётся в HTML)
 *                 выпадение подменю на десктопе
 *                 локации выпадающей части задаются  в css 
 *   
 */

function burger() {

    /* set this variables for your menu*/
    const classContainerMenu = 'header-menu'; // class of block that is contenting menu


    /*=============================*/

    const containerMenu = document.querySelector(`.${classContainerMenu} nav`);
    if (containerMenu === null) {
        return false;
    }

    const burgerMenuTogle = document.querySelector('.menu-icon');

    burgerMenuTogle.addEventListener('click', e => {
        containerMenu.classList.toggle('burger-menu-open');
        burgerMenuTogle.classList.toggle('menu-icon_close');
        document.querySelector('body').classList.toggle('lock');

        // for (var i = 0; i <= itemsMenu.length - 1; i++) {

        //     if (itemsMenu[i].children.length === 0) {
        //         continue; // Пропустить элементы без дочерних элементов
        //     }

        //     if (itemsMenu[i].querySelector('ul') && !itemsMenu[i].querySelector('.icon-dropdown')) {
        //         iconDropdown = document.createElement('span');
        //         iconDropdown.classList.add('icon-dropdown'); // here you can change icon for  menu item that contains submenu
        //         itemsMenu[i].append(iconDropdown);
        //     }

        //     if (iconDropdown) {
        //         iconDropdown.addEventListener('click', e => {
        //             e.target.classList.toggle('icon-dropdown_close');

        //             if (e.target.classList.contains('icon-dropdown_close')) {
        //                 subMenuOpen(e);
        //             } else {
        //                 subMenuClose(e);
        //             }
        //         });
        //     }

        // }


    });


    const bodyMenu = containerMenu.querySelector('ul');
    const itemsMenu = bodyMenu.querySelectorAll('li');
    let iconDropdown;

    let dropTogle;

    for (var i = 0; i <= itemsMenu.length - 1; i++) {

        if (itemsMenu[i].children.length === 0) {
            continue; // Пропустить элементы без дочерних элементов
        }


        if (itemsMenu[i].querySelector('ul') && !itemsMenu[i].querySelector('.icon-dropdown')) {
            iconDropdown = document.createElement('span');
            iconDropdown.classList.add('icon-dropdown'); // here you can change icon for  menu item that contains submenu
            itemsMenu[i].append(iconDropdown);
        }

        if (iconDropdown) {
            iconDropdown.addEventListener('click', e => {
                e.target.classList.toggle('icon-dropdown_close');

                if (e.target.classList.contains('icon-dropdown_close')) {
                    subMenuOpen(e);
                } else {
                    subMenuClose(e);
                }
            });
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

                console.log("e = ", e);
                subMenu = e.target.closest('li').querySelector('ul');
            } else if (e.type === 'mouseenter') {
                subMenu = e.target.querySelector('ul');
            }

            if (document.querySelector('body').classList.contains('lock') && subMenu.closest.tagName === 'NAV') {
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




}

burger();
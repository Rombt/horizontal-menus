// todo add icon for menu items  that contain submenu
/*
 *   Обеспечивает основной функционал горизонтального меню для всех меню
 *   блок содержащий меню должен иметь дата атребут data-horizontal_menu
 *   
 *   основные функции:
 *      индекатор того что данный пункт ммеет подменю
 *      блокировка скпрола при открытом меню
 *      реакция пунктов при наведении
 *      затемнение фона при открытии (опционально, задаётся в HTML)
 *      выпадение подменю на десктопе
 *      - сркрол внутри блоков меню на всех уровнях вложенности
 *      - локации выпадающей части задаются  в css 
 *      -! обеспечить работу нескольких меню на странице
 *   
 */

function burger() {

    /* set this variables for your menu*/
    const classContainerMenu = 'wrap-burger-menu'; // class of blocks that is contenting menu




    const containersMenu = document.querySelectorAll(`.${classContainerMenu} nav`);

    if (containersMenu.length === null) {
        return false;
    }



    console.log("containersMenu", containersMenu);



    const ToglesBurgerMenu = document.querySelectorAll('.menu-icon');
    // const bodyMenu = containerMenu.querySelector('ul');
    // const itemsMenu = bodyMenu.querySelectorAll('li');
    const itemsMenu = document.querySelectorAll(`.${classContainerMenu} li`);
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
    ToglesBurgerMenu.forEach(TogleBurgerMenu => {

        TogleBurgerMenu.addEventListener('click', burgerMenuOpen);


    })

    // document.addEventListener('keydown', function(e) {
    //     if (e.which === 27) {
    //         if (containerMenu.classList.contains('burger-menu-open')) {
    //             burgerMenuClose();
    //         }
    //     }
    // });

    //клик мимо
    // document.addEventListener('click', (e) => {
    //     if (containerMenu.classList.contains('burger-menu-open') &&
    //         !containerMenu.contains(e.target) &&
    //         !burgerMenuTogle.contains(e.target)
    //     ) {
    //         burgerMenuClose();
    //     }
    // });

    function burgerMenuOpen(e) {

        let containerMenu = e.target.closest(`.${classContainerMenu}`);
        let menu = containerMenu.querySelector('nav');


        console.log("e.target", e.target);
        console.log("containerMenu", containerMenu);
        console.log("menu", menu);

        menu.classList.toggle('burger-menu-open');
        e.target.classList.toggle('menu-icon_close');
        document.querySelector('body').classList.toggle('lock');

    }

    function burgerMenuClose(e) {
        containerMenu.classList.remove('burger-menu-open');
        burgerMenuTogle.classList.remove('menu-icon_close')
        document.querySelector('body').classList.remove('lock');

    }

}

burger();
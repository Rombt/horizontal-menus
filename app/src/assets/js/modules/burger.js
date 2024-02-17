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
        burgerMenuTogle.classList.toggle('close');

        if (containerMenu.classList.contains('burger-menu-open')) {
            burgerMenuOpen();

        }
    });

    function burgerMenuOpen() {


        const bodyMenu = containerMenu.querySelector('ul');
        const itemsMenu = bodyMenu.querySelectorAll('li');
        let iconDropdown;

        let dropTogle;
        for (var i = 0; i <= itemsMenu.length - 1; i++) {


            if (itemsMenu[i].children.length === 0) {
                continue; // Пропустить элементы без дочерних элементов
            }

            const arrChildren = Array.from(itemsMenu[i].children);
            if (arrChildren.some(node => node.tagName === 'UL')) {
                if (arrChildren.every((node) => !node.classList.contains('icon-dropdown'))) {
                    iconDropdown = document.createElement('span');
                    iconDropdown.classList.add('icon-dropdown'); // here you can change icon for  menu item that contains submenu
                    itemsMenu[i].append(iconDropdown);
                }
            }


            itemsMenu[i].addEventListener('mouseenter', subMenuOpen);
            itemsMenu[i].addEventListener('mouseleave', subMenuClose);

            if (iconDropdown) {

                iconDropdown.addEventListener('click', subMenuOpen);
                // сдесь длженбыть переключатель!!
            }

            // itemsMenu[i].addEventListener('mouseleave', subMenuClose);


        }


        let subMenu;

        function subMenuOpen(e) {
            subMenu = e.target.querySelector('ul');
            if (!document.querySelector('body').classList.contains('lock')) {
                document.querySelector('body').classList.add('lock');
            }
            if (subMenu) {

                gsap.to(subMenu, {
                    duration: 1,
                    ease: "power4.inOut",
                    height: 'auto',
                    overflow: 'visible',
                    pointerEvents: 'auto',
                    opacity: 1,
                });
            }
        }

        function subMenuClose(e) {
            subMenu = e.target.querySelector('ul');
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
            });
        }

    }




}

burger();
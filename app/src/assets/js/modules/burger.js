/**
    использование:
        в готовую вёрстку добавляя атребуты data и нужные классы - список классовс пояснениями должен быть где то отдельно
        в нужном месте страницы из сниппета получить заготовку HTML для меню
            заготовка должна 
                быть проивязана к базовым стилям и скриптам - желательно привязыватся не к классам а к структурным селекторам
                    позиционироавание основного и выподающих меню до 3 уровня вложености
                    для десктопов и мобильных версий
                        в контейнере - вертикальное и горизонтальное выравнивание
                        елементов меню относительно друг друга и родительского блока
                    для кнопок бургера и закрытия меню (вместо крестика надпися назад)
                    индекатор того что данный пункт ммеет подменю
                    поведение
                        блокировка скпрола при открытом меню
                        реакция пунктов при наведении
                        сркрол внутри блоков меню на всех уровнях вложенности
                        затемнение фона при открытии
                        варианты выпадения с леваилис права
                        выпадение подменю на десктопе




*/






// if (document.querySelector("html").classList.contains('touch')) {
//     let menuArrows = document.querySelectorAll(".test-menu__arrow");
//     if (menuArrows.length > 0) {
//         menuArrows.forEach(menuArrow => {
//             menuArrow.addEventListener('click', () => {
//                 menuArrow.parentElement.classList.toggle('_active');
//             })
//         })
//     }
// }


// const iconMenus = document.querySelectorAll('[data-iconMenu]');
// if (iconMenus.length > 0) {
//     iconMenus.forEach(iconMenu => {
//         iconMenu.addEventListener('click', (e) => {
//             const menu = iconMenu.closest('[data-conteinerMenu]');
//             const bodyMenu = menu.querySelector('[data-bodyMenu]');

//             if (bodyMenu.classList.contains('_openMenu')) {

//                 document.body.classList.remove('_lock');
//                 iconMenu.classList.remove('_active');
//                 bodyMenu.classList.remove('_openMenu');
//             } else {
//                 document.body.classList.add('_lock');
//                 iconMenu.classList.add('_active');
//                 bodyMenu.classList.add('_openMenu');

//             }

//         })

//     });

// }




let linksMenu = document.querySelectorAll('.test-menu__list li');

let subMenu;
let test_tl;
linksMenu.forEach(linkMenu => {




    linkMenu.addEventListener('mouseenter', e => {
        test_tl = gsap.timeline();
        subMenu = e.target.querySelector('.test-menu__sub-list');

        if (subMenu !== null) {
            test_tl.to(subMenu, {
                duration: 0.5,
                height: subMenu.scrollHeight,
                opacity: 1,
                // ease: 'power1',
            });


        }

        console.log("linkMenu", linkMenu);


    })

    linkMenu.addEventListener('mouseleave', e => {
        test_tl.reverse();
    })
});








// tl.to('.test-box__green', { duration: 2, x: 800, ease: 'bounce' });
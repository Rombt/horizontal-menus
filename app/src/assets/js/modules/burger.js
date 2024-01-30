if (document.querySelector("html").classList.contains('touch')) {
    let menuArrows = document.querySelectorAll(".menu__arrow");
    if (menuArrows.length > 0) {
        menuArrows.forEach(menuArrow => {
            menuArrow.addEventListener('click', () => {
                menuArrow.parentElement.classList.toggle('_active');
            })
        })
    }
}


const iconMenus = document.querySelectorAll('[data-iconMenu]');
if (iconMenus.length > 0) {
    iconMenus.forEach(iconMenu => {
        iconMenu.addEventListener('click', (e) => {
            const menu = iconMenu.closest('[data-conteinerMenu]');
            const bodyMenu = menu.querySelector('[data-bodyMenu]');

            if (bodyMenu.classList.contains('_openMenu')) {

                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                bodyMenu.classList.remove('_openMenu');
            } else {
                document.body.classList.add('_lock');
                iconMenu.classList.add('_active');
                bodyMenu.classList.add('_openMenu');

            }

        })

    });

}
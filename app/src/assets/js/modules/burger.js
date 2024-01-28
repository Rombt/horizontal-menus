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
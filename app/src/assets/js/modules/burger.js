if (document.querySelector("html").classList.contains('touch')) {


    let menuArrows = document.querySelectorAll(".menu__arrow");
    if (menuArrows.length > 0) {
        menuArrows.forEach((el, i, arr) => {

            el.addEventListener('click', () => {
                el.parentElement.classList.toggle('_active')
            })

        })


    }


    console.log("menuArrows", menuArrows);
}
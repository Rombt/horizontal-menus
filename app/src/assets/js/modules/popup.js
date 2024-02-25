const mainContainerClass = 'main-wrap'; // class your main container
//todo получать продолжительность анимации автоматичиски прочитав значени свайства transition
const timeout = 800; // the quantity  of milliseconds must be equal to the animation time in the 'transition' property in the file popup.js

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lockPadding")

let unLock = true;


if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-window');
if (popupCloseIcon.length > 0) {
    for (var i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'))
            e.preventDefault();
        })
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unLock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, dounLock = true) {
    if (unLock) {
        popupActive.classList.remove('open');
        if (dounLock) {
            bodyunLock();
        }
    }
}

function bodyLock() {

    const lockPaddingValue = window.innerWidth - document.querySelector(`.${mainContainerClass}`).offsetWidth + 'px'
    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unLock = false;
    setTimeout(function() {
        unLock = true;
    }, timeout);
}

function bodyunLock() {

    setTimeout(function() {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);
    unLock = false;
    setTimeout(function() {
        unLock = true;
    }, timeout);
}

document.addEventListener('keydown', function(e) {
    if (e.which === 27 && document.querySelector('.popup.open')) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});
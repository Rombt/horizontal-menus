const popupLinks = documen.querySelectorAll(".popup-link");
const body = documen.querySelector("body");
const lockPadding = documen.querySelectorAll(".lockPadding")

let unlock = true;
const timeout = 800;

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
const popupCloseIcon = documen.querySelectorAll('.close-window');
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
    if (curentPopup && unlock) {
        const popupActive = documen.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('.open');
        curentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}


function popupClose(popupActive, doUnlock = true) {
    if (unLock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyLock();
        }
    }
}
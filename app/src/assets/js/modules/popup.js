const mainContainerClass = 'rmbt-page-wrap'; // class your main container
const timeout = 800; // the quantity  of milliseconds must be equal to the animation time in the 'transition' property in the file popup.js

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lockPadding');

let unLock = true;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.popup__close-window');
if (popupCloseIcon.length > 0) {
  for (var i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener('click', function (e) {
      e.preventDefault();
      popupClose(el.closest('.popup'));
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unLock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, downLock = true) {
  if (unLock) {
    popupActive.classList.remove('open');
    if (downLock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector(`.${mainContainerClass}`).offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  unLock = false;
  setTimeout(function () {
    unLock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
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
  setTimeout(function () {
    unLock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27 && document.querySelector('.popup.open')) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

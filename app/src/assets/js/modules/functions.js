/* Проверка мобильного браузера */
isMobile = {
    Android: function() { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
    any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

/* Добавление класса touch для тега htl если браузер мобильный */
function addTouchClass() {
    if (isMobile.any()) document.documentElement.classList.add('touch');
}
addTouchClass();

/* Проверка поддерживает ли браузер webp */
function testWebp(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function() {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebp(function(support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
});

/* Smooth scrolling when clicking.
 *  scrolling to sections pointed into param data-goto
 *  Set element to which  will be scroll. For example a header with position: fixed. 
 *  Element to which  will be scroll must have attribute data-gotoOffset
 */
let toWhichWillBeScroll = document.querySelector('[data-gotoOffset]');
toWhichWillBeScroll = toWhichWillBeScroll ? (toWhichWillBeScroll.offsetHeight + toWhichWillBeScroll.offsetTop) : 0;
const gotoLinks = document.querySelectorAll('[data-goto]');
if (gotoLinks.length > 0) {
    gotoLinks.forEach(gotoLink => {
        gotoLink.addEventListener('click', onGotoLinkCick);
    });

    function onGotoLinkCick(e) {
        const gotoLink = e.target;
        if (gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
            const gotoBlock = document.querySelector(gotoLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - toWhichWillBeScroll;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth',
            });

            e.preventDefault();
        }
    }
}
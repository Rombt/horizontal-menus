/*
 *
 * 	Simple spoiler
 *	The styles in the file spoiler.less
 *
 */

function spoiler() {

    const spoilers = document.querySelectorAll('.spoiler__title');

    spoilers.forEach(spoiler => {
        spoiler.addEventListener('click', e => {
            spoilerText = e.target.closest('.spoiler').querySelector('.spoiler__text');
            spoilerText.classList.toggle('open');
            e.target.classList.toggle('spoiler__title_open');
            if (spoilerText.classList.contains('open')) {
                if (spoilerText) {
                    gsap.to(spoilerText, {
                        duration: 0.5,
                        ease: "power1.in",
                        height: 'auto',
                        overflow: 'visible',
                        pointerEvents: 'auto',
                        opacity: 1,
                    });
                }
            } else {
                gsap.to(spoilerText, {
                    duration: 0.5,
                    ease: "power1.in",
                    height: '0px',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    opacity: 0,
                });
            }
        })
    })
}

spoiler();
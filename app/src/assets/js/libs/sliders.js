if (document.querySelector('.swiper-one')) {
  swiperParam = new Swiper('.swiper-one', {
    direction: 'horizontal',
    pagination: {
      el: '.swiper-one__pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return (
          '<span class="' +
          className +
          '">  <span class="swiper-pagination__center"> </span> </span>'
        );
      },
    },

    speed: 700,
    autoplay: {
      delay: 5000,
    },

    slidesPerView: 4,
    spaceBetween: 35,
  });
}

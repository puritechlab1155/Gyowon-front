/* main_visual Swiper */
var mvSwiper = new Swiper(".mv-swiper", {
    loop: true, // 무한 루프
    autoplay: {
        delay: 3000, // 3초 간격 자동재생
        disableOnInteraction: false, // 유저 조작 후에도 자동 재생 유지
    },
    navigation: {
        nextEl: ".mv-swiper-button-next", // 고유 버튼 클래스
        prevEl: ".mv-swiper-button-prev",
    },
    pagination: {
        el: ".mv-swiper-pagination", // 고유 페이지네이션 클래스
        clickable: true, // bullet 클릭 가능
    },
    effect: "fade", // 페이드 전환 효과
});

/* section03 Swiper */
const swiperSection03 = new Swiper('.swiper-container.section03', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    pagination: {
        el: '.sec03-swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.sec03-swiper-button-next',
        prevEl: '.sec03-swiper-button-prev',
    },
});

/* section04 Swiper */
const swiperSection04 = new Swiper('.swiper-container.section04', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: '.sec04-swiper-button-next',
      prevEl: '.sec04-swiper-button-prev',
    },
    slideToClickedSlide: true,
    on: {
      init: function () {
        updateSection04Text(this);
      },
      slideChange: function () {
        updateSection04Text(this);
      }
    }
  });
  
  function updateSection04Text(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const title = activeSlide.getAttribute('data-title') || '';
    const date = activeSlide.getAttribute('data-date') || '';
  
    document.querySelector('.swiper-text-container .swiper-title').textContent = title;
    document.querySelector('.swiper-text-container .swiper-date').textContent = date;
  }
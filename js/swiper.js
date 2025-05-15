/* main_visual Swiper */
var mvSwiper = new Swiper(".mv-swiper", {
  loop: true, // 무한 루프
  autoplay: {
      delay: 3000, // 3초 간격
      disableOnInteraction: false, // 유저 조작 후에도 자동 재생 유지
  },
  speed: 800, // 슬라이드 속도 (기본은 300ms)
  navigation: {
      nextEl: ".mv-swiper-button-next",
      prevEl: ".mv-swiper-button-prev",
  },
  pagination: {
      el: ".mv-swiper-pagination",
      clickable: true,
  },
  effect: "slide", // ← "fade" 대신 "slide"
  on: {
    slideChange: function () {
      const currentSlide = this.slides[this.activeIndex];
      const imgDiv = currentSlide.querySelector('.mob-slide-img');

      if (imgDiv) {
        const bg = imgDiv.getAttribute('data-bg');  
        // console.log("현재 배경 이미지:", bg);

        if (bg) {
          imgDiv.style.backgroundImage = `url(${bg})`;
        }
      }
    }
  }
});

/* section03 Swiper */
const swiperSection03 = new Swiper('.swiper-container.section03', {
  loop: true, // 무한 루프
  autoplay: {
    delay: 4000, // 4초마다 자동 슬라이드
    disableOnInteraction: false, // 사용자 터치 후에도 자동 재시작
  },
  navigation: {
    nextEl: '.sec03-swiper-button-next',
    prevEl: '.sec03-swiper-button-prev',
  },
});

/* section04 Swiper */

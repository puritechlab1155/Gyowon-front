// ✅ 메인 비쥬얼 슬라이드 자동 무한 재생
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

// ✅ 섹션 3: 카드 무한루프
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


// ✅ 섹션 4: 캐러셀작동
const carouselItems = document.querySelector('.carousel-items');
const itemsData = [
  {
    title: "댄스스포츠 지도자 자격 연수",
    imgSrc: "img/KTDA-Media01.png",
    alt: "댄스스포츠 지도자 자격 연수",
    date: "2024.12.25"
  },
  {
    title: "2025 라인댄스페스티벌",
    imgSrc: "img/KTDA-Media02.png",
    alt: "2025 라인댄스페스티벌",
    date: "2025.05.25"
  },
  {
    title: "2025 교원댄스 개강",
    imgSrc: "img/KTDA-Media03.png",
    alt: "2025 교원댄스 개강",
    date: "2025.02.15"
  },
  // {
  //     title: "댄스스포츠 지도자 자격 연수",
  //     imgSrc: "img/KTDA-Media03.png",
  //     alt: "댄스스포츠 지도자 자격 연수",
  //     date: "2024.12.25"
  // },
  // {
  //     title: "댄스스포츠 지도자 자격 연수",
  //     imgSrc: "img/KTDA-Media03.png",
  //     alt: "댄스스포츠 지도자 자격 연수",
  //     date: "2024.12.25"
  // }
];

let activeIndex = 0;
const itemCount = itemsData.length;
let isAnimating = false;

// Create items initially
function createItems() {
  carouselItems.innerHTML = '';

  // Create all 5 items
  for (let i = 0; i < itemCount; i++) {
    const item = document.createElement('div');
    item.classList.add('eventItem');
    item.id = `eventItem-${i}`;

    const itemHTML = `
                    <div class="image-wrapper">
                        <img class="event-img" src="${itemsData[i].imgSrc}" alt="${itemsData[i].alt}">
                    </div>
                    <div class="event-text">
                        <div class="event-title">${itemsData[i].title}</div>
                        <div class="event-date">${itemsData[i].date}</div>
                    </div>
                `;

    item.innerHTML = itemHTML;
    carouselItems.appendChild(item);
  }

  // Position all items based on active index
  updateItemPositions();
}
// ✅ 섹션 4: 캐러셀 자동 무한루프
let autoSlideInterval = null;
let startX = 0;
let endX = 0;
let isInteracting = false;

// 자동 슬라이드 시작
function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    if (!isInteracting) {
      moveRight();
    }
  }, 2000); // 3초마다 이동
}
// 자동 슬라이드 정지
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;
}

// 드래그/터치 시 자동 슬라이드 멈춤
function pauseInteraction() {
  isInteracting = true;
  stopAutoSlide();
}

function resumeInteraction() {
  isInteracting = false;
  startAutoSlide();
}


// Update positions of all items based on active index
function updateItemPositions() {
  const items = document.querySelectorAll('.eventItem');

  items.forEach((item, idx) => {
    item.className = 'eventItem'; // reset all classes

    if (idx === activeIndex) {
      item.classList.add('visible-center');
    } else if (idx === (activeIndex - 1 + itemCount) % itemCount) {
      item.classList.add('visible-left');
    } else if (idx === (activeIndex + 1) % itemCount) {
      item.classList.add('visible-right');
    } else {
      item.classList.add('hidden');
    }
  });
}

function moveLeft() {
  if (isAnimating) return;
  isAnimating = true;
  activeIndex = (activeIndex - 1 + itemCount) % itemCount;
  updateItemPositions();
  setTimeout(() => isAnimating = false, 500);
}

function moveRight() {
  if (isAnimating) return;
  isAnimating = true;
  activeIndex = (activeIndex + 1) % itemCount;
  updateItemPositions();
  setTimeout(() => isAnimating = false, 500);
}

// Initialize
createItems();
startAutoSlide();

// PC용 마우스 드래그
carouselItems.addEventListener('mousedown', (e) => {
  pauseInteraction();
  startX = e.clientX;
});

carouselItems.addEventListener('mouseup', (e) => {
  endX = e.clientX;
  handleSwipe();
  resumeInteraction();
});

// 모바일용 터치 이벤트
carouselItems.addEventListener('touchstart', (e) => {
  pauseInteraction();
  startX = e.touches[0].clientX;
});

carouselItems.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
  resumeInteraction();
});

function handleSwipe() {
  const distance = endX - startX;

  if (Math.abs(distance) > 50) {
    if (distance < 0) {
      moveRight();
    } else {
      moveLeft();
    }
  }
}

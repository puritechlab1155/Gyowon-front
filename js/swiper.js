/* main_visual */
var mvSwiper = new Swiper(".mv-swiper", {
    navigation: {
        nextEl: ".mv-swiper-button-next",
        prevEl: ".mv-swiper-button-prev",
    },
    pagination: {
        el: ".mv-swiper-pagination",
    },
});


// mainIndex section03 + section04
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true, // 무한 루프 활성화
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

/* section04 */
const swiperSection04 = new Swiper('.mainIndex .section04 .swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: '.mainIndex .section04 .swiper-button-next',
        prevEl: '.mainIndex .section04 .swiper-button-prev',
    },
    slideToClickedSlide: true, // 클릭 시 해당 슬라이드로 이동
});
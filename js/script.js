document.addEventListener('DOMContentLoaded', function() {

    var header = document.querySelector('#header');

    if (header) {
        var mobileoffcanvas = header.querySelector('.mobile_display');
        var offcanvasOpen = header.querySelector('.offcanvas-open');
        var offcanvas = document.querySelector('.offcanvas');
        var headerLogoImg = header.querySelector('.logo-img');
        var hamIcon = document.querySelectorAll('.offcanvas-open span');

        // 오프캔버스 토글 이벤트 추가
        offcanvasOpen.addEventListener('click', function() {
            offcanvasOpen.classList.toggle('active');
            offcanvas.classList.toggle('active'); // .offcanvas에 active 클래스 토글

            // offcanvas의 transform 속성 변경
            if (offcanvas.classList.contains('active')) {
                mobileoffcanvas.style.height = '100vh';
                offcanvas.style.transform = 'translateX(0%)'; // 메뉴 열기
                header.style.backgroundColor = '#fff';
                headerLogoImg.src = 'img/offcanvas-logo.png'; // 활성화 상태의 로고
                hamIcon.forEach(function(span) {
                    span.style.backgroundColor = '#222';
                });
            } else {
                mobileoffcanvas.style.height = 'auto';
                offcanvas.style.transform = 'translateX(100%)'; // 메뉴 닫기
                dropIconL.style.transform = 'rotate(-45deg)'; // 드롭 아이콘 원래대로
                dropIconR.style.transform = 'rotate(45deg)';
                gnbSub.style.display = 'none'; // 드롭다운 숨김
            }
        });

        // .gnb-menu 클릭 시 .gnb-sub 드롭다운
        var gnbTraining = document.querySelector('.gnb-mobile .gnb-menu');
        var gnbSub = document.querySelector('.gnb-mobile .gnb-sub');
        var dropIconL= document.querySelector('.drop-arrow .drop-left');
        var dropIconR= document.querySelector('.drop-arrow .drop-right');

        if (gnbTraining && gnbSub) {
            gnbTraining.addEventListener('click', function() {
                gnbSub.classList.toggle('active'); // active 클래스 토글
                
                // 드롭다운 효과를 위해 display 속성을 변경
                if (gnbSub.classList.contains('active')) {
                    gnbSub.style.display = 'block'; // 드롭다운 표시
                    dropIconL.style.transform = 'rotate(-45deg)';
                    dropIconR.style.transform = 'rotate(45deg)';
                } else {
                    dropIconL.style.transform = 'rotate(45deg)';
                    dropIconR.style.transform = 'rotate(-45deg)';
                    gnbSub.style.display = 'none'; // 드롭다운 숨김
                }
            });
        }
    }

});

//-- 모달 팝업 열기/닫기 이벤트
document.querySelector('.sitemapBtn').onclick = function() {
    const sitemapModal = document.getElementById('sitemap-modal');
    if (sitemapModal && sitemapModal.classList.contains('modal')) {
        sitemapModal.style.display = "block";
    }
}

// 모달 닫기 버튼 클릭 시 닫기
document.getElementById('close-sitemap').onclick = function() {
    document.getElementById('sitemap-modal').style.display = "none";
}

document.getElementById('close-terms').onclick = function() {
    document.getElementById('terms-modal').style.display = "none";
}

document.getElementById('close-privacy').onclick = function() {
    document.getElementById('privacy-modal').style.display = "none";
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target === document.getElementById('sitemap-modal')) {
        document.getElementById('sitemap-modal').style.display = "none";
    }
    if (event.target === document.getElementById('terms-modal')) {
        document.getElementById('terms-modal').style.display = "none";
    }
    if (event.target === document.getElementById('privacy-modal')) {
        document.getElementById('privacy-modal').style.display = "none";
    }
}

//-- 퀵메뉴
document.addEventListener('DOMContentLoaded', function() {
    const quickMenu = document.querySelector('.quick-contain');
    const quickMenuButton = document.querySelector('.quick-menu');
    const qItemWrapper = document.querySelector('.qItem-wrapper');
    const mainVisual = document.querySelector('.content');
    let mainVisualHeight = 0;

    if (mainVisual) {
        mainVisualHeight = mainVisual.offsetHeight;
    }
    const triggerOffset = mainVisualHeight + 30;

    window.addEventListener('scroll', function() {
        if (window.scrollY > triggerOffset) {
            quickMenu.classList.add('show');
        } else {
            quickMenu.classList.remove('show');
        }
    });

    // TOP 버튼 스크롤 기능
    const scrollTopBtn = document.querySelector('.scrollTop');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 퀵메뉴 열고 닫기
    const quickBtnInitial = document.querySelector('.quick-btn-initial');
    if (quickBtnInitial) {
        quickBtnInitial.addEventListener('click', toggleQuickMenu);
    }

    function toggleQuickMenu() {
        quickMenuButton.classList.toggle('open');
    }
});

// ✅ 모바일 메뉴 열리기
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
                document.body.style.overflow = 'hidden'
            } else {
                mobileoffcanvas.style.height = 'auto';
                offcanvas.style.transform = 'translateX(100%)'; // 메뉴 닫기
                dropIconL.style.transform = 'rotate(-45deg)'; // 드롭 아이콘 원래대로
                dropIconR.style.transform = 'rotate(45deg)';
                gnbSub.style.display = 'none'; // 드롭다운 숨김
            }
            document.body.style.overflow = '';
        });

        // .gnb-menu 클릭 시 .gnb-sub 드롭다운
        const gnbMenus = document.querySelectorAll('.gnb-menu');

        gnbMenus.forEach(menu => {
            menu.addEventListener('click', function (e) {
                e.preventDefault();

                const isActive = menu.classList.contains('active');

                document.querySelectorAll('.gnb-menu').forEach(item => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    menu.classList.add('active');
                }
            });
        });
    }
});




function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = "none";
    });
    document.body.classList.remove('modal-open');
}
//-- 모달 팝업 열기/닫기 이벤트
document.querySelector('.sitemapBtn').onclick = function() {
    closeAllModals();
    const sitemapModal = document.getElementById('sitemap-modal');
    if (sitemapModal && sitemapModal.classList.contains('modal')) {
        sitemapModal.style.display = "block";
        document.body.classList.add('modal-open');
    }
}
// '이용약관' 버튼 클릭 시 terms-modal 열기
document.querySelector('.termBtn').onclick = function () {
    closeAllModals();
    const termsModal = document.getElementById('terms-modal');
    if (termsModal && termsModal.classList.contains('modal')) {
        termsModal.style.display = "block";
        document.body.classList.add('modal-open');
    }
}

window.addEventListener('resize', function () {
    const sitemapModal = document.getElementById('sitemap-modal');
    if (window.innerWidth <= 868 && sitemapModal.style.display === "block") {
        sitemapModal.style.display = "none";
        document.body.classList.remove('modal-open');
    }
});

// 모달 닫기 버튼 클릭 시 닫기
document.getElementById('close-sitemap').onclick = function() {
    document.getElementById('sitemap-modal').style.display = "none";
    document.body.classList.remove('modal-open');
}

document.getElementById('close-terms').onclick = function() {
    document.getElementById('terms-modal').style.display = "none";
    document.body.classList.remove('modal-open');
}

document.getElementById('close-privacy').onclick = function() {
    document.getElementById('privacy-modal').style.display = "none";
    document.body.classList.remove('modal-open');
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
document.addEventListener('DOMContentLoaded', function () {
    const quickMenu = document.getElementById('quickMenu'); // 핵심 수정
    const quickInitialBtn = document.querySelector('.quick-btn-initial');
    const scrollTopBtn = document.querySelector('.scrollTop');
    const mainVisual = document.querySelector('.content'); // 없으면 기본값 사용
  
    const triggerOffset = mainVisual ? mainVisual.offsetHeight + 30 : 300;
  
    window.addEventListener('scroll', function () {
      if (window.scrollY > triggerOffset) {
        quickMenu.classList.add('show');
      } else {
        quickMenu.classList.remove('show');
      }
    });
  
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    if (quickInitialBtn) {
      quickInitialBtn.addEventListener('click', function () {
        quickMenu.classList.toggle('open'); // 핵심 수정
      });
    }
  });
  

// function toggleQuickMenu(button) {
//     const container = document.getElementById('quickMenu');
//     const isOpen = container.classList.toggle('open');
//     const target = document.getElementById('qItemWrapper');
  
//     // toggle hidden 속성으로 display 자동 제어
//     if (isOpen) {
//       target.removeAttribute('hidden');
//       button.setAttribute('aria-expanded', 'true');
//     } else {
//       target.setAttribute('hidden', '');
//       button.setAttribute('aria-expanded', 'false');
//     }
// }
  
  
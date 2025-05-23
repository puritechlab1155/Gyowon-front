// ✅ 스크롤시 해더 변경 및 모바일 메뉴 클릭 이벤트
$(document).ready(function () {
    let $header = $('.header');
    let $logoImg = $('.logo img');
    let $menuItem = $('.gnbList');
    let $userBtn = $('.login-link > a');
    let $line = $('.line');
    let $hamIcon = $('.offcanvas-open span');
    let $offcanvas = $('.offcanvas');
    let isSubPage = $('.sub-page').length > 0;

    // 초기 헤더 스타일 설정
    changeHead();

    $(window).scroll(function () {
        changeHead();
    });

    // 햄버거 아이콘 클릭 이벤트
    $hamIcon.click(function () {
        changeHead();

        // 스크롤 탑이 0이고, 닫혔을때
        if ($scrollTop === 0 && !$offcanvas.hasClass('active')) {
            $logoImg.attr('src', 'img/avv_logo.png');
            $hamIcon.css({ background: '#fff' });

            // 열렸을때
        } else if ($offcanvas.hasClass('active')) {
            $hamIcon.css({ background: '#333' });
        }
    });

    function changeHead() {
        let $scrollTop = $(window).scrollTop();
        let $hamIcon = $('.ham');

        if ($scrollTop > 0 || isSubPage) { // 스크롤 탑이 0 이상
            $header.css({ background: '#fff' });
            $logoImg.attr('src', 'img/offcanvas-logo.png');
            $menuItem.css({ color: '#333' });
            $menuItem.mouseleave(function () {
                $(this).css({ color: '#333' });
            });
            $userBtn.css({ color: '#333' });
            $line.css({ background: '#999' });
            $hamIcon.css({ background: '#333' });
            $menuItem.mouseenter(function () {
                $(this).css({ color: '#005AAB' });
            });
            $hamIcon.css({ background: '#333' });
        }
        else { // 스크롤 탑이 0
            $header.css({ background: 'transparent' });
            $logoImg.attr('src', 'img/avv_logo.png');
            $menuItem.css({ color: '#fff' });
            $menuItem.mouseleave(function () {
                $(this).css({ color: '#fff' });
            });
            $userBtn.css({ color: '#fff' });
            $line.css({ background: '#fff' });
            $hamIcon.css({ background: '#fff' });
            $menuItem.mouseenter(function () {
                $(this).css({ color: '#005AAB' });
            });
            $hamIcon.css({ background: '#fff' });
        }

        // if ($scrollTop === 0 && $offcanvas.hasClass('active')) {  // 스크롤 탑이 0dlrh, 메뉴가 열렸을 때
        //     $header.css({ background: '#fff' });
        //     $hamIcon.css({ background: '#333' });
        //     $logoImg.attr('src', 'img/offcanvas-logo.png');
        // }
    }
    // window.addEventListener('resize', adjustFeatureList);
});
document.querySelectorAll('.nav-drop').forEach(navDrop => {
    navDrop.addEventListener('click', function() {
        // 클릭된 .nav-drop의 가장 가까운 부모 .nav-item 찾기
        const navItem = this.closest('.nav-item');
        if (navItem) {
            // 찾은 .nav-item의 바로 다음 형제 요소인 .drop-menu 찾기
            const dropMenu = navItem.querySelector('.drop-menu');
            if (dropMenu) {
                // 다른 열려있는 서브메뉴 닫기
                document.querySelectorAll('.drop-menu.open').forEach(openSubMenu => {
                    const relatedNavItem = openSubMenu.previousElementSibling?.closest('.nav-item');
                    const currentNavItem = dropMenu.previousElementSibling?.closest('.nav-item');
                    if (openSubMenu !== dropMenu && relatedNavItem !== currentNavItem) {
                        openSubMenu.classList.remove('open');
                        relatedNavItem?.querySelector('.nav-drop')?.classList.remove('open');
                    }
                });

                // 현재 클릭한 .drop-menu의 'open' 클래스 토글
                dropMenu.classList.toggle('open');
                // 클릭된 .nav-drop에 'open' 클래스 토글 (화살표 회전용)
                this.classList.toggle('open');
            }
        }
    });
});

// ✅ nav바 드롭다운 
document.addEventListener("DOMContentLoaded", () => {
    const mainMenuItems = document.querySelectorAll(".nav-main-menu a");
    const firstTitle = document.querySelector(".nav-drop.first");
    const secondTitle = document.querySelector(".nav-drop.second");
    const subMenu = document.querySelector(".nav-sub-menu");
    const navMainMenu = document.querySelector(".nav-main-menu"); 

    // 서브 메뉴 데이터
    const subMenuData = {
        lecture: [
            {text: "나의 연수과정", href: "myClass-course.html"},
            {text: "연수 이력 조회", href: "qualify-apply.html"},
            {text: "수강연기 / 취소(환불)", href: "myClass-before.html"},
            {text: "나의 자격증 조회", href: "myClass-license.html"}, 
            {text: "댄스화 주문 / 조회", href: "myClass-shoes.html"},],
        apply: [
            {text: "서울 직무 연수", href: "apply-seoul.html"},
            {text: "경기 직무 연수", href: "apply-gyeonggi.html"},
            {text: "자율 연수", href: "apply-common.html"},
            {text: "자주 묻는 질문", href: "apply-faq.html"},
            {text: "Q&A", href: "apply-qna.html"},
        ],
        info: [
            {text: "공지사항", href: "training-notice.html"},
            {text: "연수 일정", href: "training-sch.html"},
            {text: "연수 장소", href: "training-location.html"},
            {text: "강사 소개", href: "training-teacher.html"},
            {text: "연수 자료실", href: "training-data.html"},
            {text: "기관 지정서", href: "training-agency.html"},
        ],
        qualify: [
            { text: "자격 신청", href: "qualify-apply.html" },
            { text: "합격 공지", href: "qualify-pass.html" },
            { text: "자격증 발송 신청", href: "qualify-license.html" }
        ],
        job: [
            { text: "구인", href: "job-offer.html" },
            { text: "구직", href: "job-search.html" }
        ]
    };


    mainMenuItems.forEach(item => {
        item.addEventListener("click", (event) => {
            const menuKey = item.dataset.menu;
            const menuName = item.textContent.trim();

            // 1. 상단 제목 변경
            firstTitle.textContent = menuName;

            // 2. 서브 메뉴 변경
            const submenuList = subMenuData[menuKey];
            subMenu.innerHTML = ""; // 초기화

            submenuList.forEach(menu => {
                const li = document.createElement("li");
                li.classList.add("nav-menu-li");
                const a = document.createElement("a");
                a.classList.add("nav-menu-a");

                if (typeof menu === "string") {
                    a.textContent = menu;
                    a.href = "#"; // 기본 링크
                } else {
                    a.textContent = menu.text;
                    a.href = menu.href;
                }

                li.appendChild(a);
                subMenu.appendChild(li);
            });

            // 3. 두 번째 타이틀도 첫 메뉴 이름으로 바꿔줌
            secondTitle.textContent = submenuList[0]?.text || submenuList[0] || "";

            // 4. 드롭다운 효과 (클래스 토글 또는 강제 설정)
            subMenu.classList.toggle("open");
            
            // 6. 메인 메뉴 닫기
            navMainMenu.classList.remove("open");
        });
    });
    document.addEventListener("click", function (event) {
        const isClickInsideNav = event.target.closest(".nav-sub-menu, .nav-main-menu, .nav-drop");
    
        if (!isClickInsideNav) {
            document.querySelector(".nav-sub-menu")?.classList.remove("open");
            document.querySelector(".nav-main-menu")?.classList.remove("open");
        }
    });
});








// ✅ 모바일 메뉴
document.addEventListener('DOMContentLoaded', function () {

    var header = document.querySelector('#header');

    if (header) {
        var mobileoffcanvas = header.querySelector('.mobile_display');
        var offcanvasOpen = header.querySelector('.offcanvas-open');
        var offcanvas = document.querySelector('.offcanvas');
        var headerLogoImg = header.querySelector('.logo-img');
        var hamIcon = document.querySelectorAll('.offcanvas-open span');

        // 오프캔버스 토글 이벤트 추가
        offcanvasOpen.addEventListener('click', function () {
            offcanvasOpen.classList.toggle('active');
            offcanvas.classList.toggle('active'); // .offcanvas에 active 클래스 토글

            // offcanvas의 transform 속성 변경
            if (offcanvas.classList.contains('active')) {
                mobileoffcanvas.style.height = '100vh';
                offcanvas.style.transform = 'translateX(0%)'; // 메뉴 열기
                header.style.backgroundColor = '#fff';
                headerLogoImg.src = 'img/offcanvas-logo.png'; // 활성화 상태의 로고
                hamIcon.forEach(function (span) {
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


// ✅ 모달 열기
document.querySelector('.sitemapBtn').onclick = function () {
    closeAllModals();
    const sitemapModal = document.getElementById('sitemap-modal');
    if (sitemapModal && sitemapModal.classList.contains('modal')) {
        sitemapModal.style.display = "block";
        document.body.classList.add('modal-open');
    }
}

// ✅ 하나의 모달만 열리기 
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = "none";
    });
    document.body.classList.remove('modal-open');
}

// ✅ '이용약관' 버튼 클릭 시 terms-modal 열기
document.querySelector('.termBtn').onclick = function () {
    closeAllModals();
    const termsModal = document.getElementById('terms-modal');
    if (termsModal && termsModal.classList.contains('modal')) {
        termsModal.style.display = "block";
        document.body.classList.add('modal-open');
    }
}

// ✅ 사이트맵 모달 열고 닫기
window.addEventListener('resize', function () {
    const sitemapModal = document.getElementById('sitemap-modal');
    if (window.innerWidth <= 868 && sitemapModal.style.display === "block") {
        sitemapModal.style.display = "none";
        document.body.classList.remove('modal-open');
    }
});

document.getElementById('close-sitemap').onclick = function () {
    document.getElementById('sitemap-modal').style.display = "none";
    document.body.classList.remove('modal-open');
}

document.getElementById('close-terms').onclick = function () {
    document.getElementById('terms-modal').style.display = "none";
    document.body.classList.remove('modal-open');
}



// ✅ 모달 외부 클릭 시 닫기
window.onclick = function (event) {
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

// ✅  퀵메뉴
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

/*✅ 탭설정 */
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-tab');

    // 탭 active 클래스 토글
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 리스트 컨테이너 표시/숨김
    document.querySelectorAll('.list-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(targetId).style.display = 'block';
    });
});

/*✅ apply-# */
/*✅ myClass-# */
/*✅ 더보기 토글 */
document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.more.moreBtn');

    toggleButtons.forEach(toggleButton => {
        const buttonTextSpan = toggleButton.querySelector('.button-text');
        const dropdownIcon = toggleButton.querySelector('.dropdown-icon');

        // 버튼 바로 다음 형제 요소가 hidden-content-box일 것으로 가정
        const hiddenBox = toggleButton.closest('.card-footer')?.nextElementSibling;

        if (buttonTextSpan && dropdownIcon && hiddenBox?.classList.contains('hidden-content-box')) {
            toggleButton.addEventListener('click', function () {
                const isHidden = hiddenBox.style.display === 'none' || hiddenBox.style.display === '';

                if (isHidden) {
                    hiddenBox.style.display = 'flex';
                    buttonTextSpan.textContent = '접기';
                    toggleButton.classList.add('active');
                } else {
                    hiddenBox.style.display = 'none';
                    buttonTextSpan.textContent = '더보기';
                    toggleButton.classList.remove('active');
                }
            });
        }
    });
});

/*✅ 검색 드롭다운 */
const serchDropdownButton = document.getElementById('serchDropdownButton');
const serchDropdownMenu = document.getElementById('serchDropdownMenu');

// 드롭다운 열고 닫기
serchDropdownButton.addEventListener('click', (e) => {
    e.stopPropagation();
    serchDropdownMenu.classList.toggle('hidden');
});

// 드롭다운 항목 클릭 시 텍스트 변경
const dropdownItems = serchDropdownMenu.querySelectorAll('li');
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        serchDropdownButton.childNodes[0].nodeValue = e.target.textContent; // 텍스트 변경
        serchDropdownMenu.classList.add('hidden'); // 메뉴 닫기
    });
});

// 외부 클릭 시 닫기
document.addEventListener('click', () => {
    if (!serchDropdownMenu.classList.contains('hidden')) {
        serchDropdownMenu.classList.add('hidden');
    }
});

/*✅ 안내서 토글 */
document.addEventListener('DOMContentLoaded', function () {
    const guideToggle = document.querySelector('.guide-toggle');
    const guideTextSpan = guideToggle.querySelector('.toggle-text');
    const guideIcon = guideToggle.querySelector('.guide-dropdown-icon');
    const guideContentBox = document.querySelector('.guide-content-box');

    
    if (guideToggle && guideTextSpan && guideIcon && guideContentBox) {
        guideToggle.addEventListener('click', function () {
            const isHidden = guideContentBox.style.display === 'none' || guideContentBox.style.display === '';

            if (isHidden) {
                guideContentBox.style.display = 'flex';
                guideTextSpan.textContent = '접기';
                guideToggle.classList.add('active');
            } else {
                guideContentBox.style.display = 'none';
                guideTextSpan.textContent = '안내서 보기';
                guideToggle.classList.remove('active');
            }
        });
    }
});


/*✅ 연수 신청 모달  */
// document.addEventListener('DOMContentLoaded', function () {
//     const modal = document.getElementById('applyModal');
//     const confirmBtn = document.getElementById('applyConfirmBtn');
//     const cancelBtn = document.getElementById('applyCancelBtn');
//     const modalTitle = document.getElementById('modalTitle'); // 모달 제목 요소
//     const modalMessage = document.getElementById('modalMessage'); // 모달 메시지 요소

//     // 중요: apply-btn 클래스를 가진 모든 버튼을 선택합니다.
//     const applyBtns = document.querySelectorAll('.apply-btn');

//     let targetBtn = null; // 어떤 버튼이 모달을 열었는지 저장할 변수
//     let isCancelling = false; // 현재 모달이 신청 취소 모드인지 여부

//     // 각 신청/완료 버튼에 클릭 이벤트 리스너 추가
//     applyBtns.forEach(button => {
//         button.addEventListener('click', function () {
//             targetBtn = this; // 클릭된 버튼을 targetBtn에 할당
//             isCancelling = targetBtn.classList.contains('complete'); // 버튼이 'complete' 클래스를 가지고 있으면 취소 모드

//             if (isCancelling) {
//                 // 취소 모드일 때 모달 내용 변경
//                 modalTitle.textContent = '연수신청 취소하기';
//                 modalMessage.innerHTML = '선택하신 연수를 <span class="highlight-red">취소</span>하시겠습니까?';
//             } else {
//                 // 신청 모드일 때 모달 내용 변경
//                 modalTitle.textContent = '연수 신청하기';
//                 modalMessage.innerHTML = '선택하신 연수를 <span class="highlight-blue">신청</span>하시겠습니까?';
//             }

//             modal.classList.remove('hidden'); // 모달 열기 (hidden 클래스 제거)
//         });
//     });

//     // '예' 버튼 클릭 시
//     confirmBtn.addEventListener('click', () => {
//         if (!targetBtn) return; // targetBtn이 없으면 함수 종료 (예외 처리)

//         if (isCancelling) {
//             // 취소 모드일 때: '완료' -> '신청'으로 변경
//             targetBtn.textContent = '신청하기';
//             targetBtn.classList.remove('complete');
//         } else {
//             // 신청 모드일 때: '신청' -> '완료'로 변경
//             targetBtn.textContent = '신청취소';
//             targetBtn.classList.add('complete');
//         }

//         modal.classList.add('hidden'); // 모달 닫기
//     });

//     // '취소' 버튼 클릭 시
//     cancelBtn.addEventListener('click', () => {
//         modal.classList.add('hidden'); // 모달 닫기
//     });
// });
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('applyModal');
    const confirmBtn = document.getElementById('applyConfirmBtn');
    const cancelBtn = document.getElementById('applyCancelBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const applyBtns = document.querySelectorAll('.apply-btn');

    let targetBtn = null;
    let isCancelling = false;

    const pageId = location.pathname.split('/').pop().split('.')[0]; 
    // ex: apply-common, apply-seoul

    // 버튼 상태 로드
    applyBtns.forEach((button, index) => {
        const savedState = localStorage.getItem(`${pageId}_btn_${index}`);
        if (savedState === 'complete') {
            button.textContent = '신청취소';
            button.classList.add('complete');
        } else {
            button.textContent = '신청하기';
            button.classList.remove('complete');
        }

        // 버튼 클릭 이벤트
        button.addEventListener('click', function () {
            targetBtn = this;
            isCancelling = targetBtn.classList.contains('complete');

            if (isCancelling) {
                modalTitle.textContent = '연수신청 취소하기';
                modalMessage.innerHTML = '선택하신 연수를  <br class="mob-br"/><span class="highlight-red">취소</span>하시겠습니까?';
            } else {
                modalTitle.textContent = '연수 신청하기';
                modalMessage.innerHTML = '선택하신 연수를  <br class="mob-br"/><span class="highlight-blue">신청</span>하시겠습니까?';
            }

            modal.classList.remove('hidden');
        });
    });

    // 예 버튼 클릭 시
    confirmBtn.addEventListener('click', () => {
        if (!targetBtn) return;

        const index = Array.from(applyBtns).indexOf(targetBtn);

        if (isCancelling) {
            targetBtn.textContent = '신청하기';
            targetBtn.classList.remove('complete');
            localStorage.setItem(`${pageId}_btn_${index}`, 'not-complete');
        } else {
            localStorage.setItem(`${pageId}_btn_${index}`, 'complete');
            // 완료 페이지로 이동
            location.href = `${pageId}-complete.html`;
        }

        modal.classList.add('hidden');
    });

    // 취소 버튼 클릭 시
    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
});

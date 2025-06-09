// ✅ 스크롤시 헤더 변경 및 모바일 메뉴 클릭 이벤트
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
        // changeHead() 호출 위치 조정: 모바일 메뉴 상태에 따라 헤더가 변경되어야 하므로 클릭 이벤트 내부에서 호출
        // 그러나, changeHead 함수 자체는 스크롤 상태와 sub-page 여부로 판단하므로,
        // 여기서는 offcanvas 상태에 따른 로고/햄버거 아이콘 색상 직접 제어에 집중하는 것이 맞음.
        // 스크롤이 없는 상태에서만 햄버거 클릭 시 로고/색상 변경 로직이 필요.

        // 스크롤 탑 변수 다시 가져오기
        let currentScrollTop = $(window).scrollTop(); 

        // 햄버거 아이콘 클릭 시, 스크롤이 0이고 offcanvas가 닫혀있을 때
        if (currentScrollTop === 0 && !$offcanvas.hasClass('active')) {
            // 열리기 전 상태: 배경 투명, 글자 흰색 -> 열릴 때 배경 흰색, 글자 검정
            $logoImg.attr('src', 'img/offcanvas-logo.png'); // 열릴 때는 검정 로고 (offcanvas-logo.png)
            $hamIcon.css({ background: '#333' }); // 햄버거 아이콘 색상도 검정
            $header.css({ background: '#fff' }); // 헤더 배경도 흰색으로
            // 다른 메뉴 아이템들의 색상도 조정 필요할 수 있음
            // $menuItem.css({ color: '#333' }); 
            // $userBtn.css({ color: '#333' });
            // $line.css({ background: '#999' });

        // 햄버거 아이콘 클릭 시, offcanvas가 열려있을 때 (닫힐 때)
        } else if ($offcanvas.hasClass('active')) {
            // 닫힐 때: 다시 스크롤 상태에 따라 원래대로 복구
            if (currentScrollTop === 0) { // 스크롤이 0이면 원래대로 투명 배경, 흰색 글자
                $header.css({ background: 'transparent' });
                $logoImg.attr('src', 'img/avv_logo.png'); // 원래 로고 (avv_logo.png)
                $hamIcon.css({ background: '#fff' }); // 햄버거 아이콘 색상 흰색
            } else { // 스크롤이 있으면 흰색 배경, 검정 글자 유지
                $hamIcon.css({ background: '#333' }); // 햄버거 아이콘 색상 검정 유지
            }
        }
        // changeHead()는 스크롤 이벤트와 서브페이지 여부에만 반응하도록 하는 것이 더 명확
        // 여기서 직접 offcanvas 상태에 따른 로고/아이콘 색상 변경 로직을 추가
    });

    function changeHead() {
        let $scrollTop = $(window).scrollTop();
        let $hamIcon = $('.offcanvas-open span'); // 함수 내에서 다시 선택자로 가져오는 것이 안전

        // isSubPage는 페이지 로드 시 단 한 번만 체크되므로, 동적으로 변하지 않음
        // $offcanvas.hasClass('active')는 모바일 메뉴의 열림/닫힘 상태를 나타냄
        // 이 로직은 주로 PC/스크롤 상태에 따른 헤더 변경에 사용하고,
        // 모바일 메뉴 열림/닫힘에 따른 헤더 변경은 햄버거 아이콘 클릭 이벤트에서 따로 처리하는 것이 좋음

        if ($scrollTop > 0 || isSubPage) { // 스크롤 탑이 0 이상이거나 서브페이지일 때
            $header.css({ background: '#fff' });
            $logoImg.attr('src', 'img/offcanvas-logo.png'); // 검정 로고
            $menuItem.css({ color: '#333' });
            $userBtn.css({ color: '#333' });
            $line.css({ background: '#999' });
            $hamIcon.css({ background: '#333' }); // 햄버거 아이콘도 검정
        } else { // 스크롤 탑이 0일 때 (메인페이지에서만)
            // 모바일 메뉴가 열려있지 않을 때만 투명 헤더 적용
            if (!$offcanvas.hasClass('active')) { 
                $header.css({ background: 'transparent' });
                $logoImg.attr('src', 'img/avv_logo.png'); // 흰색 로고
                $menuItem.css({ color: '#fff' });
                $userBtn.css({ color: '#fff' });
                $line.css({ background: '#fff' });
                $hamIcon.css({ background: '#fff' }); // 햄버거 아이콘도 흰색
            }
        }

        // 마우스 호버/리브 이벤트는 롤백되는 문제가 있으므로, 한 번만 바인딩
        // 이 부분은 changeHead 함수 밖에서 한 번만 설정하는 것이 좋습니다.
        // 또는 CSS :hover를 사용하는 것이 더 효율적입니다.
        // 하지만 기존 코드의 의도를 살려두자면...
        $menuItem.off('mouseenter mouseleave'); // 기존 이벤트 핸들러 제거
        if ($scrollTop > 0 || isSubPage) {
            $menuItem.mouseenter(function () {
                $(this).css({ color: '#005AAB' });
            });
            $menuItem.mouseleave(function () {
                $(this).css({ color: '#333' });
            });
        } else {
            $menuItem.mouseenter(function () {
                $(this).css({ color: '#005AAB' });
            });
            $menuItem.mouseleave(function () {
                $(this).css({ color: '#fff' });
            });
        }
    }

    // 모바일 메뉴 드롭다운 (nav-drop)
    document.querySelectorAll('.nav-drop').forEach(navDrop => {
        navDrop.addEventListener('click', function() {
            const navItem = this.closest('.nav-item');
            if (navItem) {
                const dropMenu = navItem.querySelector('.drop-menu');
                if (dropMenu) {
                    document.querySelectorAll('.drop-menu.open').forEach(openSubMenu => {
                        const relatedNavItem = openSubMenu.previousElementSibling?.closest('.nav-item');
                        const currentNavItem = dropMenu.previousElementSibling?.closest('.nav-item');
                        if (openSubMenu !== dropMenu && relatedNavItem !== currentNavItem) {
                            openSubMenu.classList.remove('open');
                            relatedNavItem?.querySelector('.nav-drop')?.classList.remove('open');
                        }
                    });
                    dropMenu.classList.toggle('open');
                    this.classList.toggle('open');
                }
            }
        });
    });
}); // $(document).ready 끝


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
            {text: "댄스화 주문 / 조회", href: "myClass-shoes.html"},
        ],
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
                // 아래 두 변수는 이 스코프에 정의되지 않았습니다. 필요하다면 정의하거나 주석 처리하세요.
                // dropIconL.style.transform = 'rotate(-45deg)'; // 드롭 아이콘 원래대로
                // dropIconR.style.transform = 'rotate(45deg)';
                // gnbSub.style.display = 'none'; // 드롭다운 숨김
                document.body.style.overflow = ''; // 모달 닫을 때 body 스크롤 복원
            }
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


// ✅ 공유 버튼 (현재 페이지 링크 복사) - alert 창만 사용
const shareButton = document.querySelector('.share-btn');

if (shareButton) { // shareButton이 존재할 때만 이벤트 리스너를 추가
    shareButton.addEventListener('click', async () => {
        try {
            // 현재 페이지의 URL 가져오기
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);

            // 성공 메시지를 alert 창으로 표시
            alert('링크가 복사되었습니다!');

        } catch (err) {
            console.error('클립보드 복사 실패:', err);
            // 복사 실패 시 사용자에게 알림 (HTTP 환경에서 발생할 수 있음)
            alert('링크 복사에 실패했습니다. 직접 복사해주세요: ' + window.location.href);
        }
    });
}

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

// ✅ 퀵메뉴
document.addEventListener('DOMContentLoaded', function () {
    const quickMenu = document.getElementById('quickMenu');
    const quickInitialBtn = document.querySelector('.quick-btn-initial');
    const scrollTopBtns = document.querySelectorAll('.scrollTop'); // 복수형으로 변경
    const closeBtn = document.querySelector('.close-btn');
    const mainVisual = document.querySelector('.content');
    const triggerOffset = mainVisual ? mainVisual.offsetHeight + 30 : 300;

    window.addEventListener('scroll', function () {
        if (window.scrollY > triggerOffset) {
            quickMenu.classList.add('show');
        } else {
            quickMenu.classList.remove('show');
        }
    });

    scrollTopBtns.forEach(btn => { // 각 scrollTop 버튼에 이벤트 리스너 추가
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    if (quickInitialBtn) {
        quickInitialBtn.addEventListener('click', function () {
            quickMenu.classList.toggle('open');
        });
    }

    // 닫기 버튼 기능 추가
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            quickMenu.classList.remove('open');
        });
    }
});

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
    document.getElementById(targetId).style.display = 'flex';
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

/*✅ 검색창 드롭다운 */
const serchDropdownButton = document.getElementById('serchDropdownButton');
const serchDropdownMenu = document.getElementById('serchDropdownMenu');

// 드롭다운 열고 닫기
if (serchDropdownButton && serchDropdownMenu) {
    serchDropdownButton.addEventListener('click', (e) => {
        e.stopPropagation();
        serchDropdownMenu.classList.toggle('hidden');
    });
}

// 드롭다운 항목 클릭 시 텍스트 변경
if (serchDropdownButton && serchDropdownMenu) {
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
}

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


/*✅ 연수 신청 모달 */
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
            document.body.classList.add('modal-open');
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
            location.href = `apply-common-complete.html`;
        }

        modal.classList.add('hidden');
    });

    // 취소 버튼 클릭 시
    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });
});
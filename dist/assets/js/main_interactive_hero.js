/*
    1. data를 받는다 ({color-mode, hero-style(bg, 영상)}, data-bg-color)
    2. data-bg-color 가 있으면 1순위로 적용되고 color-mode 는 자동으로 color-mode-black 적용
    3. {color-mode, hero-style} 가 슬라이드 1 ~ 4까지 랜덤으로 적용되며, hero-style 에 맞는 color-mode 가 그룹
    4. 슬라이드 5 부터는 news 타입으로 적용 (.interactive-swiper__slide--news)
    5. .interactive-swiper__slide 의 경우 data-bg-color 의 값을 가지고 적용 (data-bg-color 가 없으면 랜덤으로 적용된 {color-mode, hero-style} 으로 반영)
    6. 슬라이드가 active 되면 동작이 적용
    7. .interactive-swiper__frame__video 의 경우 슬라이드가 active 되면 video.play 처리 =  swiperHero
*/
let isPcWide = window.matchMedia('only screen and (min-width: 1920px)').matches;
let isPcMiddle = window.matchMedia('only screen and (min-width: 1600px)').matches;
let isPc = window.matchMedia('only screen and (min-width: 1024px)').matches;
let isTablet = window.matchMedia('only screen and (min-width: 535px)').matches;
let videoGroup = [];
let posterGroup = [];
const videoPaths = {
    pc: [
        '/src/assets/image/main/main_interactive_hero_mv_01.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_02.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_03.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_04.mp4'
    ],
    tablet: [
        '/src/assets/image/main/main_interactive_hero_mv_01_tablet.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_02_tablet.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_03_tablet.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_04_tablet.mp4'
    ],
    mobile: [
        '/src/assets/image/main/main_interactive_hero_mv_01_mo.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_02_mo.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_03_mo.mp4',
        '/src/assets/image/main/main_interactive_hero_mv_04_mo.mp4'
    ]
};
const posterPaths = {
    pc: [
        '/src/assets/image/main/main_interactive_hero_poster_01.png',
        '/src/assets/image/main/main_interactive_hero_poster_02.png',
        '/src/assets/image/main/main_interactive_hero_poster_03.png',
        '/src/assets/image/main/main_interactive_hero_poster_04.png'
    ],
    tablet: [
        '/src/assets/image/main/main_interactive_hero_poster_01_tablet.png',
        '/src/assets/image/main/main_interactive_hero_poster_02_tablet.png',
        '/src/assets/image/main/main_interactive_hero_poster_03_tablet.png',
        '/src/assets/image/main/main_interactive_hero_poster_04_tablet.png'
    ],
    mobile: [
        '/src/assets/image/main/main_interactive_hero_poster_01_mo.png',
        '/src/assets/image/main/main_interactive_hero_poster_02_mo.png',
        '/src/assets/image/main/main_interactive_hero_poster_03_mo.png',
        '/src/assets/image/main/main_interactive_hero_poster_04_mo.png'
    ]
}

function adjustHeroNavigationPosition() {
    const heroNavigation = document.querySelector('.cmp-hero-navigation');
    // const videoElement = document.querySelector('.swiper-slide-active video');
    
    if (heroNavigation) {
        let bottomValue;
        if (isPcWide) {
            bottomValue = '40px';
        } else if (isPcMiddle) {
            bottomValue = '37px';
        } else {
            bottomValue = '23px';
        }
        heroNavigation.style.bottom = bottomValue; // 비디오 높이에 따라 네비게이션 위치 조정
    }
}

// 비디오 그룹 초기화 함수
function initializeVideoGroup() {
    if (isPc) {
        videoGroup = videoPaths.pc;
        posterGroup = posterPaths.pc;
    } else if (isTablet) {
        videoGroup = videoPaths.tablet;
        posterGroup = posterPaths.tablet;
    } else {
        videoGroup = videoPaths.mobile;
        posterGroup = posterPaths.mobile;
    }
    updateVideoSources()
}

// 비디오 경로 업데이트 함수
function updateVideoSources() {
    const activeSlides = document.querySelectorAll('.swiper-interactive-banner .swiper-slide video');
    activeSlides.forEach(videoElement => {
        const slideIndex = Array.from(videoElement.closest('.swiper-slide').parentNode.children).indexOf(videoElement.closest('.swiper-slide'));
        videoElement.src = videoGroup[slideIndex]; // 현재 슬라이드 인덱스에 맞는 비디오 경로 설정
        videoElement.setAttribute('poster', posterGroup[slideIndex]);
        videoElement.load(); // 비디오 파일 로드
        videoElement.onloadeddata = () => {
            adjustHeroNavigationPosition(); // 비디오 로딩 완료 후 위치 조정
        };
    });
    adjustHeroNavigationPosition()
}

window.addEventListener('resize', function () {
    isPcWide = window.matchMedia('only screen and (min-width: 1920px)').matches;
    isPcMiddle = window.matchMedia('(min-width: 1600px)').matches; 
    isPc = window.matchMedia('(min-width: 1024px)').matches;
    isTablet = window.matchMedia('(min-width: 535px)').matches;
    initializeVideoGroup();
    adjustHeroNavigationPosition();
}); 

// 초기 비디오 그룹 설정
initializeVideoGroup();
adjustHeroNavigationPosition();

const interactiveHero = document.querySelector('.interactive-hero');
const interactiveSwiper = interactiveHero.querySelector('.interactive-swiper');
const interactiveSlide = interactiveSwiper.querySelectorAll('.interactive-swiper__slide');
const interactiveSlideNews = interactiveSwiper.querySelectorAll('.interactive-swiper__slide--news');
const heroNavigation = document.querySelector('.cmp-hero-navigation');
const noticeSwiper = document.querySelector('.notice-swiper');

const styleGroup = ['hero-style-01', 'hero-style-02', 'hero-style-03', 'hero-style-04'];
const colorMode = ['color-mode-white', 'color-mode-black', 'color-mode-white', 'color-mode-black']; // 스타일에 따른 색상 모드
const newsStyleGroup = ['#F0E5D3', '#DFE0E0', '#DDDAE2', '#EDE2F1', '#E7F4F7', '#EBF8F4', '#FFF0F1'];
let currentStyles = []; // 현재 적용된 스타일을 저장할 배열

// 스타일 그룹을 랜덤하게 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 랜덤하게 스타일을 섞고 초기화
function initializeStyles() {
    currentStyles = [...styleGroup]; // 스타일 그룹 복사
    shuffleArray(currentStyles); // 랜덤하게 섞음
}

// 슬라이드 인덱스에 맞는 스타일을 적용
function applyStyleToSlide(index) {
    interactiveSwiper.removeAttribute('style') // newsStyleGroup 색상 적용 초기화

    // 현재 적용된 스타일을 제거
    styleGroup.forEach(style => interactiveHero.classList.remove(style)); // 모든 스타일 제거

    // 색상 모드도 제거
    colorMode.forEach(mode => interactiveHero.classList.remove(mode)); // 모든 색상 모드 제거

    // cmp-hero-navigation 색상 모드 제거
    if(heroNavigation) {
        if(heroNavigation.classList.contains('color-mode-black')) {
            heroNavigation.classList.remove('color-mode-black'); // 모든 색상 모드 제거
        }
        if (heroNavigation.classList.contains('color-mode-white')) {
            heroNavigation.classList.remove('color-mode-white'); // 모든 색상 모드 제거
        }
    }

    if(noticeSwiper) {
        // 공지사항 색상 모드 제거
        if(noticeSwiper.classList.contains('color-mode-black')) {
            noticeSwiper.classList.remove('color-mode-black'); // 모든 색상 모드 제거
        }
        if (noticeSwiper.classList.contains('color-mode-white')) {
            noticeSwiper.classList.remove('color-mode-white'); // 모든 색상 모드 제거
        }
    }

    // 주어진 인덱스에 맞는 스타일을 적용
    const styleToApply = currentStyles[index]; // 랜덤으로 섞인 스타일
    if(styleToApply) {
        interactiveHero.classList.add(styleToApply);
    }

    // cmp-hero-navigation 색상 모드 적용
    if(heroNavigation) {
        heroNavigation.classList.add(colorMode[styleGroup.indexOf(styleToApply)]);
    }

    // 공지사항 swiper 에 색상 모드 적용
    if(noticeSwiper) {
        noticeSwiper.classList.add(colorMode[styleGroup.indexOf(styleToApply)]);
    }

    updateVideoSources(); // 비디오 경로 업데이트

    // 슬라이드 인덱스가 4 이상일 경우 color-mode-black 추가
    if (index >= 4) {
        interactiveHero.classList.add('color-mode-black');
        heroNavigation.classList.add('color-mode-black');
        // 다섯 번째 슬라이드부터 newsStyleGroup 의 색상 적용
        interactiveSwiper.style.backgroundColor = newsStyleGroup[index - 4];
        interactiveSlideNews[index - 4].style.backgroundColor = newsStyleGroup[index - 4];
    } else {
        // 해당 색상 모드 추가
        const colorModeToApply = colorMode[styleGroup.indexOf(styleToApply)];
        interactiveHero.classList.add(colorModeToApply);
    }
}

// 슬라이드 변경 이벤트 핸들러
function onSlideChange() {
    // 중복 슬라이드의 비디오를 정지
    const duplicateSlides = document.querySelectorAll('.swiper-interactive-banner .swiper-slide.swiper-slide-duplicate video');
    duplicateSlides.forEach(video => {
        video.pause();
    });

    // 현재 활성 슬라이드의 비디오를 재생
    const activeSlides = document.querySelectorAll('.swiper-interactive-banner .swiper-slide.swiper-slide-active video');
    activeSlides.forEach(video => {
        video.play().catch(error => {
            console.error('비디오 재생 오류:', error);
        });
    });
}

// 슬라이드 변경 시작 이벤트 핸들러
function onSlideChangeStart() {
    const activeIndex = swiperHero.activeIndex; // 현재 활성 슬라이드의 인덱스
    // const activeSlideTextGroup = interactiveSlide[activeIndex].querySelector('.interactive-swiper__text-box'); // 현재 활성 슬라이드의 텍스트 영역

    // interactiveSlide.forEach((slide) => {
    //     const slideTextGroup = slide.querySelector('.interactive-swiper__text-box');
    //     slideTextGroup.classList.remove('fade-in');
    // })
    // activeSlideTextGroup.classList.add('fade-in');

    if (activeIndex < currentStyles.length) { // 스타일 그룹 범위 내에서만 적용
        applyStyleToSlide(activeIndex); // 스타일 적용
    } else {
        // 다섯번 째 슬라이드 (News group)
        applyStyleToSlide(activeIndex); // 스타일 적용
    }
}

function handleActiveEffect(el) {
    const hasEffect = el.querySelectorAll('.active-effect');

    if (hasEffect.length > 0) {
        hasEffect.forEach((activeItem) => {
            const effectType = activeItem.getAttribute('data-effect');
            const effectTarget = activeItem.querySelector('.active-effect__item');
            const effectDelayTime = effectTarget ? effectTarget.getAttribute('data-effect-delay') : null;
            if(effectType) {
                activeItem.classList.add(effectType);
            }
            if (effectDelayTime !== null) {
                effectTarget.style.animationDelay = effectDelayTime;
            }
        });
    }
}

// active 슬라이드 감지 (swiper 용 handleActiveEffect)
function checkActiveSlide(swiper) {
    const activeIndex = swiper.activeIndex; // 현재 활성 슬라이드의 인덱스
    const activeSlide = swiper.slides[activeIndex];

    handleActiveEffect(activeSlide); // 새로운 함수 호출
}

// Swiper 초기화
let swiperHero = new Swiper('.swiper-interactive-banner', {
    autoplay: {
        delay: 6000,
    },
    allowTouchMove: false,
    touchRatio: 0,
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    on: {
        init: function () {
            checkActiveSlide(this); // 'this'를 통해 swiperHero 인스턴스를 전달
            handleActiveEffect(heroNavigation) // .cmp-hero-navigation 동작 적용
        },
        slideChange: function () {
            checkActiveSlide(this); // 'this'를 통해 swiperHero 인스턴스를 전달
        },
        slideChangeTransitionStart: function() {
            onSlideChangeStart();
            // if(isPc) { // 슬라이드 전환 종료 시 비디오 제어
            //     heroNavigation.classList.remove('fade-in');
            // }
        }, // 슬라이드 전환 시작 시 스타일 적용
        slideChangeTransitionEnd: function() {
            onSlideChange(); // 슬라이드 전환 종료 시 비디오 제어
            // if(isPc) { // PC 분기에서만 적용
            //     heroNavigation.classList.add('fade-in');
            // }
        }
    },
});

// 초기 스타일 설정
initializeStyles(); // 스타일 초기화 및 랜덤화
applyStyleToSlide(0); // 첫 번째 슬라이드에 랜덤 스타일 적용

// 첫 번째 슬라이드의 비디오를 재생
const firstSlide = document.querySelector('.swiper-slide-active');
const firstSlideTextbox = document.querySelector('.swiper-slide-active .interactive-swiper__text-box');
const firstSlideVideo = document.querySelector('.swiper-slide-active video');
if(firstSlide) {
    firstSlideTextbox.classList.add('fade-in'); 
}
if (firstSlideVideo) {
    firstSlideVideo.play().catch(error => {
        console.error('비디오 재생 오류:', error);
    });
}

// .notice-swiper가 하위 자식인지 확인하고 .has-notice 클래스 추가
const hasNoticeSwiper = interactiveHero.querySelector('.notice-swiper');
if (hasNoticeSwiper) {
    interactiveHero.classList.add('has-notice');
} else {
    interactiveHero.classList.remove('has-notice');
    console.log('.notice-swiper가 interactiveHero의 하위 자식이 아닙니다.');
}
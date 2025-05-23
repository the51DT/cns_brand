let isPc = window.matchMedia('only screen and (min-width: 1280px)').matches;
const carouselWrap = document.querySelector('.carousel-wrap');
const cardItems = document.querySelectorAll('.carousel-wrap .card-context');

let autoActiveTimer = null;
let groupIndex = 0;
const groupNames = ['group1', 'group2', 'group3'];

// 자동 그룹 active 함수
function startAutoGroupActive() {
  if (autoActiveTimer !== null) return; // 이미 실행 중이면 재시작하지 않음
  autoActiveTimer = setInterval(() => {
    const currentGroup = groupNames[groupIndex];

    cardItems.forEach((item) => {
      if (item.dataset.group === currentGroup) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });    groupIndex = (groupIndex + 1) % groupNames.length;
  }, 2000);  
}

function stopAutoGroupActive() {
  if (autoActiveTimer) {
    clearInterval(autoActiveTimer);    
    autoActiveTimer = null;
  }
}

// 카드 초기화
function cardItemSetting() {
  const infoCardItems = [
    {
      group1: [
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_data_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_data_mo.png',
        },
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_cloud_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_cloud_mo.png',
        },
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_ai_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_ai_mo.png',
        },
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_consulting_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_consulting_mo.png',
        },
      ],
    },
    {
      group2: [
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_city_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_city_mo.png',
        },
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_logistic_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_logistic_mo.png',
        },
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_factory_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_factory_mo.png',
        },
      ],
    },
    {
      group3: [
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_solution_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_solution_mo.png',
        },
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_cx_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_cx_mo.png',
        },
        {
          imgPC: '/src/assets/image/main/carousel/carousel_img_intelligence_pc.png',
          imgMO: '/src/assets/image/main/carousel/carousel_img_intelligence_mo.png',
        },
      ],
    },
  ];

  cardItems.forEach((item, idx) => {
    const itemGroup = item.dataset.group;
    const itemInner = item.querySelector('.card-inner');

    if (itemGroup === 'group1') {
      itemInner.dataset.style = isPc
        ? `url('${infoCardItems[0].group1[idx].imgPC}')`
        : `url('${infoCardItems[0].group1[idx].imgMO}')`;
    } else if (itemGroup === 'group2') {
      itemInner.dataset.style = isPc
        ? `url('${infoCardItems[1].group2[idx - 4].imgPC}')`
        : `url('${infoCardItems[1].group2[idx - 4].imgMO}')`;
    } else if (itemGroup === 'group3') {
      itemInner.dataset.style = isPc
        ? `url('${infoCardItems[2].group3[idx - 7].imgPC}')`
        : `url('${infoCardItems[2].group3[idx - 7].imgMO}')`;
    }

    if (!itemInner.dataset.bound) {
      if (isPc) {
        itemInner.addEventListener('mouseover', (e) => {
          stopAutoGroupActive();
          cardEventCtrl(e);
        });
        itemInner.addEventListener('mouseleave', (e) => {
          startAutoGroupActive();
          cardEventCtrl(e);
        });
      } else {
        itemInner.addEventListener('touchstart', (e) => {
          carouselWrap.querySelectorAll('.card-context').forEach((card) => {
            card.classList.remove('on');
            card.querySelector('.card-inner').style.backgroundImage = 'revert';
            card.querySelector('.card-inner').style.border = '1px solid #565656;';
          });
          cardEventCtrl(e);
        });
      }
      itemInner.dataset.bound = 'true'; // 이벤트 중복 방지
    }
  });
}
function initCarousel() {
  const intViewportWidth = window.innerWidth;
  if (intViewportWidth < 1280) {
    // mobile
    gsap.set('.carousel-wrap', {
      height: `${document.querySelector('.card-context .card-inner').clientHeight}px`,
      onComplete: () => [carousel()],
    });
  } else {
    // pc
    gsap.set('.carousel-wrap', {
      height: '100%',
    });
  }
}

function carousel() {
  gsap.to('.carousel-wrap', {
    opacity: 1,
    duration: 0.3,
    ease: 'power1.inOut',
    delay: 0.1,
  }),
  gsap.ticker.fps(60);
  const e = document.querySelector('.carousel-wrap'),
    t = document.querySelectorAll('.card-context');
  let n = e.clientWidth,
    o = t[0].clientWidth + 10,
    r = t.length * o,
    i = 0,
    s = 1,
    a = 10,
    c = 10,
    l = 10,
    p = !0,
    u = !1;
  let d,
    g = 0,
    y = 0,
    m = !1;
  const w = () => {
      (p = !1), clearTimeout(d);
    },
    S = (t) => {
      (g = t.clientX || t.touches[0].clientX),
        (m = !0),
        e.classList.add('is-dragging'),
        (p = !1),
        w();
    },
    h = (e) => {
      m && (u && (u = !1), (y = e.clientX || e.touches[0].clientX), (c += 1.5 * (y - g)), (g = y));
    },
    v = () => {
      (m = !1), e.classList.remove('is-dragging');
    };
  e.addEventListener('touchstart', S, { passive: true }),
  e.addEventListener('touchmove', h, { passive: true }),
  e.addEventListener('touchend', v, { passive: true }),
  e.addEventListener('mousedown', S),
  e.addEventListener('mousemove', h),
  e.addEventListener('mouseleave', v),
  e.addEventListener('mouseup', v),
  e.addEventListener('selectstart', () => !1);
  const x = (e) => {
    gsap.set(t, {
      x: (t) => t * o + e,
      y: (e) => {
        const n = (e * o) / o,
          r = gsap.utils.wrap(-1, t.length - 1, n);
        return 25 * Math.sin(1 * r - i);
      },
      modifiers: {
        x: (e, t) => `${gsap.utils.wrap(-o, r - o, parseInt(e))}px`,
      },
    });

    // (mobile) 카드 그룹별 active 처리
    const thumbsWrapRect = document
      .querySelector('.carousel-wrap .thumbs-wrapper')
      .getBoundingClientRect();
    const thumbsWrapWidth = thumbsWrapRect.width;
    const thumbsWrapHalf = thumbsWrapWidth / 2;
    const thumbsWrapMin = thumbsWrapHalf / 2;

    setTimeout(function () {
      for (let i = 0; i < t.length; i++) {
        const itemTransform = t[i].style.transform;
        const itemTransformVal1 = itemTransform.replace('translate(', '');
        const itemTransformVal2 = itemTransformVal1.replace(')', '');
        const itemTransformVal = itemTransformVal2.split(',');
        const itemTransformX = itemTransformVal[0];
        const itemTransformY = itemTransformVal[1];

        if (parseInt(itemTransformX) <= thumbsWrapMin) {
          const targetGroup = t[i].dataset.group;

          cardItems.forEach((item) => {
            item.classList.remove('active');

            const itemGroup = item.dataset.group;
            if (itemGroup == targetGroup) {
              item.classList.add('active');
            }
          });
        }
      }
    }, 1000);
  };
  x(0),
    gsap.ticker.add(() => {
      var e;
      u ||
        (p && (c -= s),
        (l = l * (1 - (e = 0.1)) + c * e),
        x(l),
        p || ((s = l - a), (a = l)),
        p ? (i += 0.05) : ((i = 0.0075 * a), (a = l)));
    }),
    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`),
        gsap.set('.carousel-wrap', {
          height: `${document.querySelector('.card-context .card-inner').clientHeight}px`,
        }),
        (n = e.clientWidth),
        (o = t[0].clientWidth + 10),
        (r = t.length * o);
    });
}

function cardEventCtrl(e) {
  const targetItemStyle = e.target.dataset.style;
  targetItemGroup = e.target.closest('.card-context').dataset.group;

  // [pc] mouseover시 동일한 그룹 active 처리
  document.querySelectorAll('.carousel-wrap .card-context').forEach((item) => {      
    item.classList.remove('active');
    if (item.dataset.group == targetItemGroup) {
      item.classList.add('active');        
    } else {
      item.classList.remove('active');
    }
  });

  // [pc/mo 공통] mouseover, touch시 on클래스 이벤트 제어 (내용, 배경이미지 노출)  
  if (e.target.closest('.card-context').classList.contains('on')) {
    e.target.closest('.card-context').classList.remove('on');
    e.target.style.backgroundImage = 'revert';
    e.target.style.border = '1px solid #565656;';
  } else {
    e.target.closest('.card-context').classList.add('on');
    e.target.style.backgroundImage = targetItemStyle;
    e.target.style.border = '1px solid #8e8e8e';
  }
  
}

function hoverTest() {  
  carouselWrap.querySelectorAll('.card-context').forEach((item) => {
    const cardInner = item.querySelector('.card-inner');
    cardInner.addEventListener('mouseover', (e) => {      
      stopAutoGroupActive();
      cardEventCtrl(e);
    });
    cardInner.addEventListener('mouseleave', (e) => {
      startAutoGroupActive();
      cardEventCtrl(e);
    });
  });
}
// 초기 실행
cardItemSetting();
if (!isPc) {
  stopAutoGroupActive();
  initCarousel();  
} else {
  startAutoGroupActive();
}


// ResizeObserver 정의
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const width = entry.contentRect.width;
    const nowIsPc = width >= 1280;

    // .type-pc 클래스 처리 (720 이상)
    if (width > 720) {
      carouselWrap.classList.add('type-pc');
    } else {
      carouselWrap.classList.remove('type-pc');
    }

    // PC/Mobile 전환 감지 시 처리
    if (nowIsPc !== isPc) {
      isPc = nowIsPc;
      cardItemSetting(); // 이미지 및 이벤트 재설정
    }

    // 캐러셀 상태 재설정
    if (isPc) {
      initCarousel();
      hoverTest(); // 이벤트 바인딩 검증
    } else {
      if (carouselWrap.classList.contains('type-pc')) {
        initCarousel();
      }
      initCarousel(); // 모바일일 경우 두 번 호출 유지
    }
  }
});

// .carousel-wrap 요소에만 ResizeObserver 적용
resizeObserver.observe(carouselWrap);

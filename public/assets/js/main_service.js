let chkPc = window.matchMedia('only screen and (min-width: 1280px)').matches;
const carouselWrap = document.querySelector('.carousel-wrap');
const cardItems = document.querySelectorAll('.carousel-wrap .card-context');

let tickerCallback = null;
let autoActiveTimer = null;
let groupIndex = 0;
const groupNames = ['group1', 'group2', 'group3'];

function resetGroupState() {
  groupIndex = 0;
  cardItems.forEach((item) => item.classList.remove('active'));
}

// 자동 그룹 active 함수
function startAutoGroupActive() {
  if (autoActiveTimer !== null) return;

  resetGroupState(); // 순서 초기화 및 active 제거

  autoActiveTimer = setInterval(() => {
    const currentGroup = groupNames[groupIndex];

    cardItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.group === currentGroup);
    });

    groupIndex = (groupIndex + 1) % groupNames.length;
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
    const oldInner = item.querySelector('.card-inner');

    // 기존 요소를 클론해서 이벤트 초기화 (이벤트 제거용)
    const newInner = oldInner.cloneNode(true);
    oldInner.replaceWith(newInner);

    // 이미지 적용
    if (itemGroup === 'group1') {
      newInner.dataset.style = chkPc
        ? `url('${infoCardItems[0].group1[idx].imgPC}')`
        : `url('${infoCardItems[0].group1[idx].imgMO}')`;
    } else if (itemGroup === 'group2') {
      newInner.dataset.style = chkPc
        ? `url('${infoCardItems[1].group2[idx - 4].imgPC}')`
        : `url('${infoCardItems[1].group2[idx - 4].imgMO}')`;
    } else if (itemGroup === 'group3') {
      newInner.dataset.style = chkPc
        ? `url('${infoCardItems[2].group3[idx - 7].imgPC}')`
        : `url('${infoCardItems[2].group3[idx - 7].imgMO}')`;
    }

    // 이벤트 재등록
    if (chkPc) {
      newInner.addEventListener('mouseover', (e) => {
        stopAutoGroupActive();
        cardEventCtrl(e);
      });

      newInner.addEventListener('mouseleave', (e) => {
        startAutoGroupActive();
        cardEventCtrl(e);
      });
    } else {
      newInner.addEventListener('touchstart', (e) => {
        carouselWrap.querySelectorAll('.card-context').forEach((card) => {
          card.classList.remove('on');
          card.querySelector('.card-inner').style.backgroundImage = 'revert';
          card.querySelector('.card-inner').style.border = '1px solid #565656';
        });
        cardEventCtrl(e);
      });
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
  x(0);

  tickerCallback = () => {
    var e;
    if (!u) {
      if (p) c -= s;
      l = l * (1 - (e = 0.1)) + c * e;
      x(l);
      if (!p) {
        s = l - a;
        a = l;
      }
      p ? (i += 0.05) : ((i = 0.0075 * a), (a = l));
    }
  };

  gsap.ticker.add(tickerCallback);

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
  const targetItem = e.target.closest('.card-context');
  const targetItemStyle = e.target.dataset.style;
  const targetItemGroup = targetItem.dataset.group;

  // [pc] mouseover시 동일한 그룹만 active
  if (chkPc) {
    cardItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.group === targetItemGroup);
    });
  }

  // [공통] on 클래스, 배경 이미지
  if (targetItem.classList.contains('on')) {
    targetItem.classList.remove('on');
    e.target.style.backgroundImage = 'revert';
    e.target.style.border = '1px solid #565656';
  } else {
    document.querySelectorAll('.card-context').forEach((item) => item.classList.remove('on'));
    targetItem.classList.add('on');
    e.target.style.backgroundImage = `${targetItemStyle}`;
    e.target.style.border = '1px solid #8e8e8e';
  }
}

// 초기 실행
cardItemSetting();
if (!chkPc) {
  initCarousel();
  stopAutoGroupActive();
} else {
  // ticker 실행됐을 경우 정리
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  startAutoGroupActive();
}

// 리사이즈 대응
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(() => {
    const nowisPc = window.matchMedia('only screen and (min-width: 1280px)').matches;

    if (nowisPc !== chkPc) {
      stopAutoGroupActive();
      chkPc = nowisPc;

      // 카드 다시 세팅
      cardItemSetting();
      resetGroupState(); // groupIndex와 active 초기화

      // carousel ticker 제거
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }
      if (chkPc) {
        //console.log('PC 전환 - 자동 순환 시작');
        startAutoGroupActive();
        carouselWrap.style.height = '100%';
      } else {
        //console.log('모바일 전환 - 자동 순환 중단');
        stopAutoGroupActive();
        initCarousel();
      }
    }
  }, 500);
});

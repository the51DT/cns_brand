let chkPc = window.matchMedia('only screen and (min-width: 1280px)').matches;
const carouselWrap = document.querySelector('.carousel-wrap');
const cardItems = document.querySelectorAll('.carousel-wrap .card-context');

let tickerCallback = null;
let autoActiveTimer = null;
let groupIndex = 0;
let lastHoveredGroupIndex = 0;
const groupNames = ['group1', 'group2', 'group3'];

function resetGroupState() {
  groupIndex = 0;
  cardItems.forEach((item) => item.classList.remove('active'));

  //최초 진입시 group1 기본값 활성화 되도록 내용 추가
  const currentGroup = groupNames[groupIndex];
  cardItems.forEach((item) => {
    if (item.dataset.group === currentGroup) {
      item.classList.add('active');
    }
  });
}

// 자동 그룹 active 함수
function startAutoGroupActive() {
  if (autoActiveTimer !== null) return;

  groupIndex = lastHoveredGroupIndex; // 마지막 호버한 그룹 다음부터 시작되도록 groupIndex 변경
  //resetGroupState(); // 순서 초기화 및 active 제거 - mouseleave 후 group 맨처음부터 반복 동작 원할 경우 해당 내용 활성화 (위의 groupIndex = lastHoveredGroupIndex;는 주석처리 할 것)

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
    const newInner = oldInner.cloneNode(true); // 기존 요소를 클론해서 이벤트 초기화 (이벤트 제거용)

    // 서비스영역 카드 리스트 내 자세히보기 버튼(->) 분기처리용 변수 추가 생성
    const oldInner2 = item.querySelector('.card-link-wrap .card-link-btn');
    const newInner2 = oldInner2.cloneNode(true);

    oldInner.replaceWith(newInner);
    oldInner2.replaceWith(newInner2);

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
      // 카드 mouseover/mouseleave 시 배경 이미지 제어 - S
      newInner.addEventListener('mouseover', (e) => {
        stopAutoGroupActive();
        cardEventCtrl(e);
      });
      newInner.addEventListener('mouseleave', (e) => {
        startAutoGroupActive();
        cardEventCtrl(e);
      });
      // 카드 mouseover/mouseleave 시 배경 이미지 제어 - E

      // 카드 내 자세히보기 버튼(->) mouseover/mouseleave 시 배경 이미지 제어 - S
      newInner2.addEventListener('mouseover', (e) => {
        stopAutoGroupActive();
        cardEventCtrl(e, 'cardBtn');
      });
      newInner2.addEventListener('mouseleave', (e) => {
        startAutoGroupActive();
        cardEventCtrl(e, 'cardBtn');
      });
      // 카드 내 자세히보기 버튼(->) mouseover/mouseleave 시 배경 이미지 제어 - E
    } else {
      // 모바일 터치 이벤트
      // 카드 터치 이벤트
      newInner.addEventListener('touchstart', (e) => {
        carouselWrap.querySelectorAll('.card-context').forEach((card) => {
          card.classList.remove('on');
          card.querySelector('.card-inner').style.backgroundImage = 'revert';
          card.querySelector('.card-inner').style.border = '1px solid #565656';
        });
        cardEventCtrl(e);
      });

      // 모바일 터치 이벤트
      // 카드 내 자세히보기 버튼(->) 터치 이벤트
      newInner2.addEventListener('touchstart', (e) => {        
        carouselWrap.querySelectorAll('.card-context').forEach((card) => {
          card.classList.remove('on');
          card.querySelector('.card-inner').style.backgroundImage = 'revert';
          card.querySelector('.card-inner').style.border = '1px solid #565656';
        });
        cardEventCtrl(e, 'cardBtn');
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
    if (window.innerWidth < 1280) {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`),
        gsap.set('.carousel-wrap', {
          height: `${document.querySelector('.card-context .card-inner').clientHeight}px`,
        }),
        (n = e.clientWidth),
        (o = t[0].clientWidth + 10),
        (r = t.length * o);
    }
  });
}

function cardEventCtrl(e , type) {
  const targetItem = e.target.closest('.card-context');
  const targetItemStyle = e.target.dataset.style;
  const targetItemGroup = targetItem.dataset.group;

  // 마우스오버 시 그룹 인덱스 기억
  if (chkPc && e.type === 'mouseover') {
    const hoveredGroupIdx = groupNames.indexOf(targetItemGroup);
    if (hoveredGroupIdx !== -1) {
      lastHoveredGroupIndex = (hoveredGroupIdx + 1) % groupNames.length;
    }
  }

  // [pc] mouseover시 동일한 그룹만 active
  if (chkPc) {
    cardItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.group === targetItemGroup);
    });
  }

  // [공통] on 클래스, 배경 이미지
  // 카드내 화살표 버튼 hover 시에도 on 클래스 적용 조건 추가 (250604 수정) - S
  if (type == 'cardBtn') {
    const cardContxt = e.target.closest('.card-link-wrap').parentNode;
    const cardDataItemStyle = cardContxt.querySelector('.card-inner').dataset.style;
    const cardDetailBtn = document.querySelector('.carousel-wrap').querySelectorAll('.card-link-wrap');

    if (!e.target.closest('.card-link-wrap').classList.contains('on')) {
      cardContxt.classList.add('on');
      cardDetailBtn.forEach((btn) => btn.classList.remove('on'));
      e.target.closest('.card-link-wrap').classList.add('on');
      cardContxt.querySelector('.card-inner').style.backgroundImage = `${cardDataItemStyle}`;
      cardContxt.querySelector('.card-inner').style.border = '1px solid #8e8e8e';
    } else {
      cardContxt.classList.remove('on');
      e.target.closest('.card-link-wrap').classList.remove('on');
      cardContxt.querySelector('.card-inner').style.backgroundImage = 'revert';
      cardContxt.querySelector('.card-inner').style.border = '1px solidrgb(75, 56, 56)';
    }
  } else {
    if (!targetItem.querySelector('.card-link-wrap').classList.contains('on')) {
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
  }
  // 카드내 화살표 버튼 hover 시에도 on 클래스 적용 조건 추가 (250604 수정) - E
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

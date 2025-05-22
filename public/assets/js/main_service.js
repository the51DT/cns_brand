//gsap 관련 script - S
const isPc = window.matchMedia('only screen and (min-width: 1280px)').matches;
const carouselWrap = document.querySelector('.carousel-wrap');
const cardItems = document.querySelectorAll('.carousel-wrap .card-context');

let testVal;
let timflag;
let animationFlag;
let groupActive;
let targetItemGroup;

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let resizeTimer;

// card-context 셋팅
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
    let itemGroupTitle = item.dataset.group;
    let itemCardInnerItem = item.querySelector('.card-inner');
    timeflag = 1;

    itemCardInnerItem.addEventListener('mouseover', (e) => {      
      timeflag = 0;
      cardEventCtrl(e);
    });
    itemCardInnerItem.addEventListener('mouseleave', (e) => {       
      timeflag = 1;
      cardEventCtrl(e);
    });

    groupActive = function groupChecking() {
      if (isPc) {
        // if (timeflag == 0) {
        //   console.log('1 timflag값 : ' + timeflag);
        //   setTimeout(() => {
        //     if (itemGroupTitle == 'group1') {
        //       item.classList.add('active');
        //     } else {
        //       item.classList.remove('active');
        //     }
        //   }, 1000 * 1);

        //   setTimeout(() => {
        //     if (itemGroupTitle == 'group2') {
        //       item.classList.add('active');
        //     } else {
        //       item.classList.remove('active');
        //     }
        //   }, 1000 * 3);

        //   setTimeout(() => {
        //     if (itemGroupTitle == 'group3') {
        //       item.classList.add('active');
        //     } else {
        //       item.classList.remove('active');
        //     }
        //     timeflag = 1;
        //     groupActive();
        //     console.log('2 timflag값 : ' + timeflag);
        //   }, 1000 * 6);
        // } else if (timeflag == 1) {
        //   animationFlag = setInterval(() => {
        //     setTimeout(() => {
        //       if (itemGroupTitle == 'group1') {
        //         item.classList.add('active');
        //       } else {
        //         item.classList.remove('active');
        //       }
        //     }, 1000 * 1);

        //     setTimeout(() => {
        //       if (itemGroupTitle == 'group2') {
        //         item.classList.add('active');
        //       } else {
        //         item.classList.remove('active');
        //       }
        //     }, 1000 * 3);

        //     setTimeout(() => {
        //       if (itemGroupTitle == 'group3') {
        //         item.classList.add('active');
        //       } else {
        //         item.classList.remove('active');
        //       }
        //     }, 1000 * 6);

        //     console.log('3 timflag값 : ' + timeflag);
        //   }, 6000);
        // }
        
        if(timeflag == 1) {
          console.log('마우스오버아닐때 : 타임플래그 1이 나와야함 : ', timeflag);
          var num = 1;
          animationFlag = setInterval(() => {
            item.classList.remove('active');
            num++;
            if (num <= infoCardItems.length) {
              if (itemGroupTitle == `group${num}`) {
                item.classList.add('active');
              }
            } else if(num > infoCardItems.length) {
              num = 0;
            }
            console.log("돈다")
          }, 2000);                       
        } else if (timeFlag == 0) {
          clearInterval(animationFlag);  
        }
      }
    };

    if (timeflag == 1) {      
      console.log("최초, timflag값 : "+ timeflag);
      groupActive();
    }

    if (itemGroupTitle == 'group1') {
      if (!isPc) {
        itemCardInnerItem.dataset.style = `url("${infoCardItems[0].group1[idx].imgMO}")`;
      } else {
        itemCardInnerItem.dataset.style = `url("${infoCardItems[0].group1[idx].imgPC}")`;
      }
    } else if (itemGroupTitle == 'group2') {
      if (!isPc) {
        itemCardInnerItem.dataset.style = `url("${infoCardItems[1].group2[idx - 4].imgMO}")`;
      } else {
        itemCardInnerItem.dataset.style = `url("${infoCardItems[1].group2[idx - 4].imgPC}")`;
      }
    } else if (itemGroupTitle == 'group3') {
      if (!isPc) {
        itemCardInnerItem.dataset.style = `url("${infoCardItems[2].group3[idx - 7].imgMO}")`;
      } else {
        itemCardInnerItem.dataset.style = `url("${infoCardItems[2].group3[idx - 7].imgPC}")`;
      }
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
      onComplete: () => {
        gsap.killTweensOf(cardItems);
      },
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

  gsap.utils.toArray('.card-context', e).forEach((e) => {
    const cardInnerItem = e.querySelector('.card-inner');
    // (mobile) touch시 카드 이벤트 제어
    cardInnerItem.addEventListener( 'touchstart', (e) => { cardEventCtrl(e);}, { passive: true });
  }),
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
  if (isPc) {
    console.log('mouseover' + timeflag);
    console.log('타겟 그룹 : ' + targetItemGroup);
    
    document.querySelectorAll('.carousel-wrap .card-context').forEach((item) => {
      item.classList.remove('active');
      if (item.dataset.group == targetItemGroup) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    groupActive();
  }
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

cardItemSetting();
if (!isPc) {
  initCarousel();
}

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const intViewportWidth = window.innerWidth;

    /*
    (720 이상일때, pc / tablet 체크용 클래스 추가)
    - PC에서 Mobile로 리사이징할때 체크하기 위해, 특정 중간 태블릿 조건일때, 
    - css 다르게 처리되는 것이 있어, 720 이상일경우에는 tablet사이즈도 pc로 판단하여 체크하려고 클래스 추가하였음.
    */
    if (intViewportWidth > 720) {
      carouselWrap.classList.add('type-pc');
    } else {
      carouselWrap.classList.remove('type-pc');
    }

    if (intViewportWidth >= 1280) {
      // console.log("pc");
      initCarousel();
    } else {
      if (carouselWrap.classList.contains('type-pc')) {
        // console.log("pc -> mobile");
        initCarousel();
      }
    }
  }, 500);
});
//gsap 관련 script - E

const headerWrap = document.querySelector('.header');
const bodyWrap = document.querySelector('body');
// let subMenuHeight = 0
let currentGnbMode = null; // 'mo' or 'pc'
// let initialPositions = [];
const theFuture = document.querySelector('.the-future-case');
let isHoveringGnb = false;

/*utils */
const siblings = (el) => { return [...el.parentNode.children].filter((child) => child !== el) }
const addClass = (element, className) => element?.classList.add(className)
const removeClass = (element, className) => element?.classList.remove(className)
const setStyle = (element, property, value) => element?.style.setProperty(property, value)

const removeClassFromActives = (elements, className = 'is-active') => {
  Array.from(elements)
    .filter(el => el.classList.contains(className))
    .forEach(el => el.classList.remove(className))
}

const getHeaderHeight = (el) => {
  const gnbSubLeft = el.closest('.gnb-sub-left')
  const subMenuDetail = el.parentNode.querySelector('.sub-menu-detail')

  const leftHeight = gnbSubLeft?.getBoundingClientRect().height || 0
  const detailHeight = subMenuDetail ? subMenuDetail.getBoundingClientRect().height : 0

  const maxHeight = Math.max(detailHeight, leftHeight)

  // return `${maxHeight + 80}px`
  return `${maxHeight}px`
}

const getHeaderDropHeight = (el) => {
  const gnbDropList = el.querySelectorAll('.sub-menu-list--drop');
  const gnbDropLeft = el.querySelector('.gnb-sub-left--drop');
  const gnbDropRight = el.querySelector('.gnb-sub-right--drop');

  let listMaxHeight = 0;
  let maxHeight = 0;

  gnbDropList.forEach(drop => {
    const height = drop.offsetHeight + 96;
    if (height > listMaxHeight) {
        listMaxHeight = height;
    }
  })
  
  const detailHeight = el ? el.getBoundingClientRect().height : 0

  if(gnbDropList.length > 0) {
    maxHeight = Math.max(detailHeight, listMaxHeight)
  } else if(gnbDropLeft) {
    const dropLeftHeight = gnbDropLeft.getBoundingClientRect().height + 96
    const dropRightHeight = gnbDropRight ? gnbDropRight.getBoundingClientRect().height + 96 : 0
    
    maxHeight = Math.max(detailHeight, Math.max(dropLeftHeight, dropRightHeight))
  }
  return `${maxHeight}px`
}

/* GNB 모드 설정 */
const setGnbMode = (mode) => {
  const body = document.body;
  body.classList.remove('gnb-mode--mo', 'gnb-mode--pc');

  if (mode === 'mo' || mode === 'pc') {
    body.classList.add(`gnb-mode--${mode}`);
    currentGnbMode = mode;
    // console.log('setGnbMode called:', `gnb-mode--${mode}`);
  } else {
    currentGnbMode = null;
    // console.log('setGnbMode called: none');
  }
};

const closeMoGnb = () => {
  const moNavigation = document.querySelector('.mo-gnb-navy__wrap');
  // setGnbMode(null);
  bodyWrap.classList.remove('overflow', 'gnb-open');
  headerWrap.classList.remove('is-active');
  moNavigation?.classList.remove('is-active');
};

function mainNavigation(elements) {
  const navyLists = document.querySelectorAll(elements)
  if (!navyLists.length) return

  const bodyWrap = document.querySelector('body')
  const header = bodyWrap.querySelector('.header')
  const navyWrap = header.querySelector('.gnb-navy__wrap')
  const swiperContainer = header.querySelector('.gnb-sub-swiper');

  let subHeight = 0

  //이벤트 정의
  //1. header mouse enter
  navyLists.forEach(nav => {
    const navyBtn = nav.querySelector('.type-full')
    const subMenu = nav.querySelector('.gnb-sub__wrap')
    const subMenuDrop = nav.querySelector('.gnb-sub__wrap--drop')
    const subDropInner = nav.querySelector('.gnb-sub__wrap--drop .gnb-sub-inner')
    
    // 1depth 마우스 클릭
    nav.addEventListener('click', () => {
      if (currentGnbMode === 'mo') return;
      const naviLi = document.querySelectorAll('.navy-list > li')

      // 1. 전체 초기화
      navyLists.forEach(item => {
        removeClass(item, 'is-active')
        removeClass(header, 'is-active')
        setStyle(header, '--gnb-bg-height', '0px')
        setStyle(subMenuDrop, '--gnb-drop-height', '0px')
        setStyle(subDropInner, 'opacity', '0')
        setTimeout(() => {
            swiperContainer.style.opacity = '0'; // Swiper 미노출
        }, 200);
      })

      addClass(header, 'is-active')
      addClass(bodyWrap, 'overflow')
      removeClassFromActives(naviLi, 'is-active')
      addClass(nav, 'is-active')

      const activeBtn = nav.querySelector('.sub-menu-list > li.is-active >  .gnb-sub__menu')
      if (navyBtn && subMenu) {
        setStyle(header, '--gnb-bg-height', `${getHeaderHeight(activeBtn)}`)
      } else if (subMenuDrop) {
        addClass(header, 'is-active')
        setStyle(header, '--gnb-bg-height', '0px')
        addClass(nav, 'is-active')
        setStyle(nav, 'position', 'relative')
        setStyle(subMenuDrop, '--gnb-drop-height', `${getHeaderDropHeight(subMenuDrop)}`)
        setStyle(subDropInner, 'opacity', '1')
        setTimeout(() => {
            swiperContainer.style.opacity = '1'; // Swiper 보이기
        }, 200);
      }
    });

    // 2depth 마우스 클릭
    const deps2Btns = nav.querySelectorAll('.gnb-sub__menu')
    deps2Btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetParent = btn.closest('li')
        addClass(targetParent, 'is-active')
        removeClassFromActives(siblings(targetParent), 'is-active')
        setStyle(header, '--gnb-bg-height', `${getHeaderHeight(btn)}`)
      })
    })

    //마우스 엔터
    nav.addEventListener('mouseenter', () => {
      isHoveringGnb = true;
      if (currentGnbMode === 'mo') return;
      const listLi = document.querySelectorAll('.navy-list > li')
      
      // 1. 전체 초기화
      navyLists.forEach(item => {
        removeClass(item, 'is-active')
        removeClass(header, 'is-active')
        setStyle(header, '--gnb-bg-height', '0px')
        setStyle(subMenuDrop, '--gnb-drop-height', '0px')
        setStyle(subDropInner, 'opacity', '0')
        setTimeout(() => {
            swiperContainer.style.opacity = '0'; // Swiper 미노출
        }, 200);
      })

      addClass(header, 'is-active')
      addClass(bodyWrap, 'overflow')
      removeClassFromActives(listLi, 'is-active')
      addClass(nav, 'is-active')

      const activeBtn = nav.querySelector('.sub-menu-list > li.is-active >  .gnb-sub__menu')
      if (navyBtn && subMenu) {
        setStyle(header, '--gnb-bg-height', `${getHeaderHeight(activeBtn)}`)
      } else if (subMenuDrop) {
        addClass(header, 'is-active')
        setStyle(header, '--gnb-bg-height', '0px')
        addClass(nav, 'is-active')
        setStyle(nav, 'position', 'relative')
        setStyle(subMenuDrop, '--gnb-drop-height', `${getHeaderDropHeight(subMenuDrop)}`)
        setStyle(subDropInner, 'opacity', '1')
        setTimeout(() => {
            swiperContainer.style.opacity = '1'; // Swiper 보이기
        }, 200);
      }
    })

    //마우스 리브
    navyWrap.addEventListener('mouseleave', (e) => {
      if (!navyWrap.contains(e.relatedTarget)) {
        isHoveringGnb = false;
        removeClass(bodyWrap, 'overflow')
        setStyle(nav.parentElement, 'position', '')

        removeClass(header, 'is-active')
        setStyle(header, '--gnb-bg-height', '0px')
        setStyle(subMenuDrop, '--gnb-drop-height', '0px')
        setStyle(subDropInner, 'opacity', '0')
        setTimeout(() => {
            swiperContainer.style.opacity = '0'; // Swiper 미노출
        }, 200);

        const activeItem = nav.querySelector('.sub-menu-list > li.is-active')
        if (activeItem) {
          // removeClass(activeItem, 'is-active')
        }

        const activeNavyItem = nav.parentElement.querySelector('.navy-list > li.is-active')
        if (activeNavyItem) {
          removeClass(activeNavyItem, 'is-active')
        }
        
      }
    })

  })
}

const moNavigationToggle = (button) => {
    const moNavigation = document.querySelector('.mo-gnb-navy__wrap');
    const moMenu = document.querySelector(button);
    const moMenuClose = document.querySelector('.btn-menu-close');
    moMenu.addEventListener('click', () => {
        if(!moNavigation.classList.contains('is-active')) {
          setGnbMode('mo');
            bodyWrap.classList.add('overflow');
            bodyWrap.classList.add('gnb-open');
            headerWrap.classList.add('is-active')
            moNavigation.classList.add('is-active');
        }
    });
    moMenuClose.addEventListener('click', () => {
        if(moNavigation.classList.contains('is-active')) {
            closeMoGnb();
            bodyWrap.classList.remove('overflow');
            bodyWrap.classList.remove('gnb-open');
            headerWrap.classList.remove('is-active')
            moNavigation.classList.remove('is-active');
        }
    });
}

// mobile gnb
const moNavigationAccordion = (selector) => {
    if (!selector) {
        return;
    }

    const accWraps = document.querySelectorAll(selector);
    accWraps.forEach(acc => {
        const accButtons = acc.querySelectorAll('.mo-navy-list > li > a');

        accButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentItem = button.closest('.mo-navy-list > li');
                const activeItem = acc.querySelector('.mo-navy-list > li.is-active');

                if (activeItem && activeItem !== currentItem) {
                    activeItem.classList.remove('is-active');
                }

                currentItem.classList.toggle('is-active');
            });
        });
    });
}

// 위 아래 구분을 위한 스크립트
let lastScrollTop = 0;
const contentTab = document.querySelectorAll('.cmp-tab');
const scrollEventManage = () => {
    if (isHoveringGnb) return; // GNB에 hover 중일 때 스크롤 이벤트 무시
    const Yoffset = window.pageYOffset || document.documentElement.scrollTop;
    if(!theFuture && !bodyWrap.classList.contains('gnb-open')) {
      if(Yoffset == 0) {
          onTopScroll();
      } else {
          if (Yoffset > lastScrollTop && Yoffset > 0) {
              onDownScroll();
            } else {
              onUpScroll();
          }
      }
      lastScrollTop = Yoffset <= 0 ? 0 : Yoffset;
    }
}

const onDownScroll = () => {
    // console.log('down');
    headerWrap.classList.remove('is-fixed');
    headerWrap.classList.add('is-motion');
    if(contentTab) {
      contentTab.forEach((tab) => {
        if(!tab.classList.contains('cmp-tab--sub')){
          const tabHeader = tab.querySelector('.cmp-tab__header');
          tabHeader.style.top = "0";
        }
      });
    }
}

const onUpScroll = () => {
    // console.log('up');
    headerWrap.classList.add('is-fixed');
    headerWrap.classList.remove('is-motion');
    if(contentTab) {
      contentTab.forEach((tab) => {
        if(!tab.classList.contains('cmp-tab--sub')){
          const tabHeader = tab.querySelector('.cmp-tab__header');
          tabHeader.style.top = headerHeight;
        }
      });
    }
}

const onTopScroll = () => {
    headerWrap.classList.remove('is-fixed');
    headerWrap.classList.remove('is-motion');
    if(contentTab) {
      contentTab.forEach((tab) => {
        if(!tab.classList.contains('cmp-tab--sub')){
          const tabHeader = tab.querySelector('.cmp-tab__header');
          tabHeader.style.top = "0";
        }
      });
    }
}

// PC 언어선택 토글
const langTogglePC = () => {
    const lagnSelect = document.querySelector('.header .lang-select')
    const langToggleBtn = lagnSelect.querySelector('.btn-lang');
    const lagnList = lagnSelect.querySelector('.dropdown_list');
    if(lagnSelect) {
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isActive = langToggleBtn.classList.toggle('is-active');                       
            lagnList.classList.toggle('is-active', isActive); // 드롭다운 리스트의 활성화 상태 토글
        });

        document.addEventListener("click", function(e) {
          const trigger = lagnSelect.querySelector('.btn-dropdown');
          const dropdownList = lagnSelect.querySelector('.dropdown_list');

          if (!lagnSelect.contains(e.target) && !e.target.closest('.btn-dropdown')) {
              trigger.classList.remove('is-active');
              dropdownList.classList.remove('is-active'); // 드롭다운 리스트 닫기
          }
      });
    }
}

// PC 인재채용
const gnbSwiper = new Swiper('.gnb-sub-swiper .swiper', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// 1. 초기 모드 설정
let headerHeight;
// let tabHeaderHeight;
window.addEventListener('DOMContentLoaded', () => {
  const isPc = window.innerWidth >= 1280;
  setGnbMode(isPc ? 'pc' : 'mo');
  headerHeight = isPc ? '100px' : '64px'; 
  // tabHeaderHeight = isPc ? 75 : 55;

  // contentTab.forEach((tab) => {
  //     if (!tab.classList.contains('cmp-tab--sub')) {
  //         const tabHeader = tab.querySelector('.cmp-tab__header');
  //         initialPositions.push(tabHeader.getBoundingClientRect().top);
  //     }
  // });
});

// 2. 리사이즈 감지
window.addEventListener('resize', () => {
  const isPc = window.innerWidth >= 1280;

  if (isPc && currentGnbMode !== 'pc') {
    closeMoGnb();
    setGnbMode('pc');
    headerHeight = '100px';
    // tabHeaderHeight = 75;
  } else if (!isPc && currentGnbMode !== 'mo') {
    setGnbMode('mo');
    headerHeight = '64px';
    // tabHeaderHeight = 55;
  }
});

window.addEventListener("scroll", scrollEventManage);
moNavigationToggle('.mo-menu .btn-hamburger-menu');
moNavigationAccordion('.mo-gnb-navy__wrap .mo-navy-list');
mainNavigation('.navy-list > li');
langTogglePC();
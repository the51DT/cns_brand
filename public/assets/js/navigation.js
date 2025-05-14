const headerWrap = document.querySelector('.header');
const bodyWrap = document.querySelector('body');
// let subMenuHeight = 0

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


function mainNavigation(elements) {
  const navyLists = document.querySelectorAll(elements)
  if (!navyLists.length) return

  const bodyWrap = document.querySelector('body')
  const header = bodyWrap.querySelector('.header')
  const navyWrap = header.querySelector('.gnb-navy__wrap')

  let subHeight = 0

  //이벤트 정의
  //1. header mouse enter
  function mainNav() {
    console.log('mainNav')
    navyLists.forEach(nav => {
      const navyBtn = nav.querySelector('.type-full')
      const subMenu = nav.querySelector('.gnb-sub__wrap')
      const subMenuDrop = nav.querySelector('.gnb-sub__wrap--drop')
  
      //마우스 클릭
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
        const listLi = document.querySelectorAll('.navy-list > li')
  
        // 1. 전체 초기화
        navyLists.forEach(item => {
          removeClass(item, 'is-active')
          removeClass(header, 'is-active')
          setStyle(header, '--gnb-bg-height', '0px')
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
        }
      })
  
      //마우스 리브
      navyWrap.addEventListener('mouseleave', (e) => {
        if (!navyWrap.contains(e.relatedTarget)) {
          removeClass(bodyWrap, 'overflow')
          setStyle(nav.parentElement, 'position', '')
  
          removeClass(header, 'is-active')
          setStyle(header, '--gnb-bg-height', '0px')
  
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
  mainNav();
  window.addEventListener('resize', () => {
    const isPc  = window.matchMedia('only screen and (min-width: 1280px)').matches;
    if(isPc) {
      console.log('isPc:', isPc);
      mainNav
    }
  });
}

const moNavigationToggle = (button) => {
    const moNavigation = document.querySelector('.mo-gnb-navy__wrap');
    const moMenu = document.querySelector(button);
    const moMenuClose = document.querySelector('.btn-menu-close');

    function toggleMoNav() {
      console.log('toggleMoNav')
      moMenu.addEventListener('click', () => {
          if(!moNavigation.classList.contains('is-active')) {
              bodyWrap.classList.add('overflow');
              bodyWrap.classList.add('gnb-open');
              headerWrap.classList.add('is-active')
              moNavigation.classList.add('is-active');
          }
      });
      moMenuClose.addEventListener('click', () => {
          if(moNavigation.classList.contains('is-active')) {
              bodyWrap.classList.remove('overflow');
              bodyWrap.classList.remove('gnb-open');
              headerWrap.classList.remove('is-active')
              moNavigation.classList.remove('is-active');
          }
      });
    }
    toggleMoNav();
    window.addEventListener('resize', () => {
      const checkPc2 = window.matchMedia('only screen and (min-width: 1280px)').matches;
      if(!checkPc2) {
        console.log('checkPc2:', checkPc2);
        toggleMoNav
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
const bodyDarkMode = document.querySelector('body.dark-mode');
const subVisual = document.querySelector('.sub-visual__wrap');
const mainVisual = document.querySelector('.main-visual__wrap');
const subVisualHeight = subVisual ?  subVisual.offsetHeight : 0;
const mainVisualHeight = mainVisual ? mainVisual.offsetHeight : 0;
const scrollEventManage = () => {
    const Yoffset = window.pageYOffset || document.documentElement.scrollTop;
    // if(subVisual || mainVisual || bodyDarkMode) {
    //     if(Yoffset < subVisualHeight || Yoffset < mainVisualHeight || bodyDarkMode) {
    //         if(subVisual && !subVisual.classList.contains('type-empty')) {
    //             headerWrap.classList.add('is-bg-transparent');
    //             headerWrap.classList.add('is-fixed');
    //         }
    //     } else {
    //         headerWrap.classList.remove('is-bg-transparent');
    //         headerWrap.classList.remove('is-fixed');
    //     }
    // }

    if(Yoffset == 0) {
        onTopScroll();
        // console.log('00')
    } else {
        if (Yoffset > lastScrollTop) {
            onDownScroll();
        } else {
            onUpScroll();
        }
    }
    lastScrollTop = Yoffset <= 0 ? 0 : Yoffset;
}

const onDownScroll = () => {
    // console.log('down');
    headerWrap.classList.remove('is-fixed');
    headerWrap.classList.add('is-motion');
}

const onUpScroll = () => {
    // console.log('up');
    headerWrap.classList.add('is-fixed');
    headerWrap.classList.remove('is-motion');
}

const onTopScroll = () => {
    // console.log('00')
    // if(subVisual && !subVisual.classList.contains('type-empty') || bodyDarkMode){
    //     headerWrap.classList.add('is-bg-transparent');
    //     headerWrap.classList.add('is-fixed');
    // } else {
    //     headerWrap.classList.remove('is-fixed');
    // }
    headerWrap.classList.remove('is-fixed');
    headerWrap.classList.remove('is-motion');
}

// const scrollPos = window.scrollY || document.documentElement.scrollTop;
// // console.log(scrollPos)
// if(subVisual && !subVisual.classList.contains('type-empty') || bodyDarkMode){
//     headerWrap.classList.add('is-bg-transparent');
//     headerWrap.classList.add('is-fixed');
// }

// PC 언어선택 토글
const langTogglePC = () => {
    const langToggleBtn = document.querySelector('.header .lang-select .btn-lang');
    const lagnList = document.querySelector('.header .lang-select .dropdown_list');
    if(langToggleBtn && lagnList) {
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isActive = langToggleBtn.classList.toggle('is-active');                       
            lagnList.classList.toggle('is-active', isActive); // 드롭다운 리스트의 활성화 상태 토글
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

window.addEventListener("scroll", scrollEventManage);
moNavigationToggle('.mo-menu .btn-hamburger-menu');
moNavigationAccordion('.mo-gnb-navy__wrap .mo-navy-list');
mainNavigation('.navy-list > li');
langTogglePC();
const headerWrap = document.querySelector('.header');
const bodyWrap = document.querySelector('body');
let subMenuHeight = 0
const mainNavigation = (selector) => {
    console.log(selector);
    const navyLists = document.querySelectorAll(selector); 
    if (!navyLists.length) {
        return;
    }
    navyLists.forEach(navy => {
        navy.addEventListener('mouseenter', () => {
            const navyBtn = navy.querySelector('.type-full'); // .navy-left .navy-list li
            const subMenu = navy.querySelector('.gnb-sub__wrap'); // 2depth menu wrap
            const subMenuDrop = navy.querySelector('.gnb-sub__wrap--drop'); // .navy-right .navy-list li 의 2depth menu wrap
            // 초기화 : header, li 에 .is-active 제거, 높이값 0
            navyLists.forEach(item => {
                item.closest('.header').classList.remove('is-active');
                item.classList.remove('is-active');
                item.closest('.header').style.setProperty('--gnb-bg-height', '0px');
            })
            navy.classList.add('is-active');
            bodyWrap.classList.add('overflow');

            console.log('mouseenter');
            // const activeMenu = document.querySelector('.navy-list > li.is-active');
            // if (activeMenu) {
            //     activeMenu.classList.remove('is-active');
            // }

            if (navyBtn && subMenu) { // .navy-left
                if (!navy.closest('.header').classList.contains('is-active')) {
                    navy.closest('.header').classList.add('is-active');
                }

                // navy.classList.add('is-active');
                
                // console.log(subMenu)
                // 2depth menu높이값 계산
                subMenuHeight = subMenu ? subMenu.scrollHeight : 0;
                navy.closest('.header').style.setProperty('--gnb-bg-height', `${subMenuHeight + 80}px`);
                
                if (navy.classList.contains('is-active'))  {
                    const subDepthMenus = navy.querySelectorAll('.sub-menu-list li');                    
                    subDepthMenus.forEach(menu => {
                        menu.addEventListener('click', (event) => {
                            // event.preventDefault();
                            const activeItem = document.querySelector('.sub-menu-list > li.is-active');
                            if (activeItem) {
                                activeItem.classList.remove('is-active');
                            } 
                            menu.classList.add('is-active');
                        });
                    });    
                } 
            } else if(subMenuDrop) { // .navy-right
                // console.log('test')
                navy.closest('.header').classList.add('is-active');
                navy.closest('.header').style.setProperty('--gnb-bg-height', 0);                    
                navy.classList.add('is-active');
                navy.style.position = 'relative';
            }            
        });

        const navyWrap = navy.closest('.gnb-navy__wrap');
        navyWrap.addEventListener('mouseleave', () => {
            console.log('mouseleave');
            bodyWrap.classList.remove('overflow');      
            navy.parentElement.style.position = '';
            navy.closest('.header').classList.remove('is-active'); 
            navy.closest('.header').style.setProperty('--gnb-bg-height', 0);
            const activeItem = document.querySelector('.navy-list > li.is-active');
            if (activeItem) {
                activeItem.classList.remove('is-active');
            }
        });
    });
};


/*utils*/
// const setClass = (element, className, isAdd) => {
//   if (!element) return
//   if (isAdd) {
//     element.classList.add(className)
//   } else {
//     element.classList.remove(className)
//   }
// }
// const addClass = (element, className) => element?.classList.add(className)
// const removeClass = (element, className) => element?.classList.remove(className)
// const setStyle = (element, property, value) => element?.style.setProperty(property, value)
// const resetStyle = (element, property) => element?.style.removeProperty(property)
// const getElHeight = (element) => element ? element.scrollHeight : 0

//header 높이 달라지는 이슈
//원인: mouseleave 이벤트 시, click-bound is-active 클래스 전체를 지우면서 내부 컨텐츠를 읽지 못해 재호출 시 필요한 높이만큼 읽어오지 못함
//해결 방안: click-bound를 전체 리스트를 돌면서 지우는 코드 수정.
// -> 결론: mouseleave 이벤트 시 클래스 전체 삭제 X / 필요하다면 요소의 첫번째로 초기화

// const mainNavigation = (selector) => {
//   const navyLists = document.querySelectorAll(selector)
//   const bodyWrap = document.querySelector('body')
//   const header = document.querySelector('.header')
//   const navyWrap = document.querySelector('.gnb-navy__wrap')
//
//   if (!navyLists.length) return
//
//   let activeNavy = null
//
//   navyLists.forEach(navy => {
//     navy.addEventListener('mouseenter', () => {
//       if (activeNavy === navy) {
//         return
//       }
//
//       // 1. 전체 초기화
//       navyLists.forEach(item => {
//         removeClass(item, 'is-active')
//         removeClass(header, 'is-active')
//         setStyle(header, '--gnb-bg-height', '0px')
//       })
//
//       // 2. 현재 활성화
//       addClass(navy, 'is-active')
//       addClass(header, 'is-active')
//       addClass(bodyWrap, 'overflow')
//
//       const navyBtn = navy.querySelector('.type-full')
//       const subMenu = navy.querySelector('.gnb-sub__wrap')
//       const subMenuDrop = navy.querySelector('.gnb-sub__wrap--drop')
//
//       if (navyBtn && subMenu) {
//         setStyle(header, '--gnb-bg-height', `${getElHeight(subMenu) + 80}px`)
//         console.log(getElHeight(subMenu), navy.innerText)
//
//         const subDepthMenus = navy.querySelectorAll('.sub-menu-list li')
//         subDepthMenus.forEach(menu => {
//           if (!menu.classList.contains('click-bound')) {
//             menu.addEventListener('click', (event) => {
//               event.preventDefault()
//
//               const activeItem = navy.querySelector('.sub-menu-list > li.is-active')
//               if (activeItem) {
//                 removeClass(activeItem, 'is-active')
//               }
//               addClass(menu, 'is-active')
//             })
//             addClass(menu, 'click-bound')
//           }
//         })
//       } else if (subMenuDrop) {
//         addClass(header, 'is-active')
//         setStyle(header, '--gnb-bg-height', '0px')
//         addClass(navy, 'is-active')
//         setStyle(navy, 'position', 'relative')
//       }
//       activeNavy = navy
//     })
//
//     navyWrap?.addEventListener('mouseleave', (e) => {
//       if (!navyWrap.contains(e.relatedTarget)) {
//         removeClass(bodyWrap, 'overflow')
//         setStyle(navy.parentElement, 'position', '')
//
//         removeClass(header, 'is-active')
//         setStyle(header, '--gnb-bg-height', '0px')
//
//         const activeItem = navy.querySelector('.sub-menu-list > li.is-active')
//         if (activeItem) {
//           // removeClass(activeItem, 'is-active')
//         }
//
//         const activeNavyItem = navy.parentElement.querySelector('.navy-list > li.is-active')
//         if (activeNavyItem) {
//           removeClass(activeNavyItem, 'is-active')
//         }
//
//         activeNavy = null
//       }
//     })
//   })
// }



const moNavigationToggle = (button) => {
    const moNavigation = document.querySelector('.mo-gnb-navy__wrap');
    const moMenu = document.querySelector(button);
    const moMenuClose = document.querySelector('.btn-menu-close');
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
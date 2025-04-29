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
const headerWrap = document.querySelector('.header');
const mainNavigation = (selector) => {
    const navyLists = document.querySelectorAll(selector);    
    if(!navyLists) {
        return;
    }
    navyLists.forEach(navy => {
        navy.addEventListener('mouseenter', () => {            
            const activeMenu = document.querySelector('.navy-list > li.is-active');
            if (activeMenu) {
                activeMenu.classList.remove('is-active');
            }            
            if(navy.classList.contains('type-full') && navy.nextElementSibling) {
                if(!navy.closest('.header').classList.contains('is-active')) {
                    navy.closest('.header').classList.add('is-active');
                }
    
                navy.parentElement.classList.add('is-active');
                const subMenu = navy.parentElement.querySelector('.gnb-sub__wrap');
                let subMenuHeight = subMenu ? subMenu.scrollHeight : 0;
                navy.closest('.header').style.setProperty('--gnb-bg-height', `${subMenuHeight}px`);
                
                if(navy.parentElement.classList.contains('is-active'))  {
                    const subDepthMenus = navy.parentElement.querySelectorAll('.sub-menu-list li a');                    
                    subDepthMenus.forEach(menu => {
                        menu.addEventListener('click', (event) => {
                            event.preventDefault();
                            const activeItem = document.querySelector('.sub-menu-list > li.is-active');
                            if (activeItem && activeItem.nextElementSibling) {
                                activeItem.classList.remove('is-active');
                                activeItem.nextElementSibling.classList.remove('is-active')
                            } 
                            menu.parentElement.classList.add('is-active');
                            if(menu.nextElementSibling) {
                                menu.nextElementSibling.classList.add('is-active');
                            }                            
                        });
                    });    
                }          

            } else {
                if(navy.closest('.header').classList.contains('is-active')) {
                    navy.closest('.header').classList.remove('is-active');                    
                }
                navy.parentElement.style.position = 'relative';
                navy.parentElement.classList.add('is-active');
            }            
        })
        const navyWrap = navy.closest('.gnb-navy__wrap');
        navyWrap.addEventListener('mouseleave',  () => {
            navy.parentElement.style.position = '';
            navy.closest('.header').classList.remove('is-active'); 
            navy.closest('.header').style.setProperty('--gnb-bg-height', 0);
            const activeItem = document.querySelector('.navy-list > li.is-active');
            if (activeItem) {
                activeItem.classList.remove('is-active');
            }
        });
    })
}

const moNavigationToggle = (button) => {
    const bodyWrap = document.querySelector('body');
    const moNavigation = document.querySelector('.mo-gnb-navy__wrap');
    const moMenu = document.querySelector(button);
    moMenu.addEventListener('click', () => {
        if(!moNavigation.classList.contains('is-active')) {
            bodyWrap.classList.add('overflow');
            headerWrap.classList.add('is-active')
            moNavigation.classList.add('is-active');
        } else {
            bodyWrap.classList.remove('overflow');
            headerWrap.classList.remove('is-active')
            moNavigation.classList.remove('is-active');
        }
    })
}

// mobile gnb
const moNavigationAccordion = (button) => {
    const navigationButtons = document.querySelectorAll(button);
    
    navigationButtons.forEach(item => {
        item.addEventListener("click", (target) => {
            const targetParent = event.currentTarget.parentNode;
            if (!targetParent.classList.contains('is-active')) {
                targetParent.classList.add('is-active');
            } else {
                targetParent.classList.remove('is-active');
            }
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
    if(subVisual || mainVisual || bodyDarkMode) {
        if(Yoffset < subVisualHeight || Yoffset < mainVisualHeight || bodyDarkMode) {
            if(subVisual && !subVisual.classList.contains('type-empty')) {
                headerWrap.classList.add('is-bg-transparent');
                headerWrap.classList.add('is-fixed');
            }
        } else {
            headerWrap.classList.remove('is-bg-transparent');
            headerWrap.classList.remove('is-fixed');
        }
    }

    if(Yoffset == 0) {
        onTopScroll();
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
}

const onUpScroll = () => {
    // console.log('up');
    headerWrap.classList.add('is-fixed');
}

const onTopScroll = () => {
    // console.log('00')
    if(subVisual && !subVisual.classList.contains('type-empty') || bodyDarkMode){
        headerWrap.classList.add('is-bg-transparent');
        headerWrap.classList.add('is-fixed');
    } else {
        headerWrap.classList.remove('is-fixed');
    }

}


const scrollPos = window.scrollY || document.documentElement.scrollTop;
console.log(scrollPos)
if(subVisual && !subVisual.classList.contains('type-empty') || bodyDarkMode){
    headerWrap.classList.add('is-bg-transparent');
    headerWrap.classList.add('is-fixed');
}

window.addEventListener("scroll", scrollEventManage);
mainNavigation('.navy-list > li > a');
moNavigationToggle('.mo-menu .btn-hamburger-menu');
moNavigationAccordion('.mo-navy-list > li > a')

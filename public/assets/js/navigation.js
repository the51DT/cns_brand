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
                if(!navy.closest('.header__wrap').classList.contains('is-active')) {
                    navy.closest('.header__wrap').classList.add('is-active');
                }
    
                navy.parentElement.classList.add('is-active');
                const subMenu = navy.parentElement.querySelector('.gnb-sub__wrap');
                let subMenuHeight = subMenu ? subMenu.scrollHeight : 0;
                navy.closest('.header__wrap').style.setProperty('--gnb-bg-height', `${subMenuHeight}px`);
                
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
                if(navy.closest('.header__wrap').classList.contains('is-active')) {
                    navy.closest('.header__wrap').classList.remove('is-active');                    
                }
                navy.parentElement.style.position = 'relative';
                navy.parentElement.classList.add('is-active');
            }            
        })
        const navyWrap = navy.closest('.gnb-navy__wrap');
        navyWrap.addEventListener('mouseleave',  () => {
            navy.parentElement.style.position = '';
            navy.closest('.header__wrap').classList.remove('is-active'); 
            navy.closest('.header__wrap').style.setProperty('--gnb-bg-height', 0);
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
const headerWrap = document.querySelector('.header__wrap');
const cmpSubVisual = document.querySelector(".sub-visual__wrap");
const cmpMainVisual = document.querySelector(".main-visual__wrap");
let subVisualHeight = 0;
let mainVisualHeight = 0;
if(cmpSubVisual) {
    subVisualHeight = cmpSubVisual.offsetHeight;
}
if(cmpMainVisual) {
    mainVisualHeight = cmpMainVisual.offsetHeight;
}
const scrollEventManage = () => {
    const Yoffset = window.pageYOffset || document.documentElement.scrollTop;
    
    if(subVisualHeight > 0 || mainVisualHeight > 0) {
        if(Yoffset > subVisualHeight || Yoffset > mainVisualHeight) {
            // cmpSubVisual 바깥에
            headerWrap.classList.remove('header__wrap--bg-transparent');
        } else {
            headerWrap.classList.add('header__wrap--bg-transparent');
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
    if(headerWrap.classList.contains('header__wrap--fixed')) {
        headerWrap.classList.remove('header__wrap--fixed');
        headerWrap.classList.add('header__wrap--fixed-motion');
    }
}

const onUpScroll = () => {
    if(!headerWrap.classList.contains('header__wrap--fixed')) {
        headerWrap.classList.remove('header__wrap--fixed-motion');
        headerWrap.classList.add('header__wrap--fixed');
    }
}

const onTopScroll = () => {
    headerWrap.classList.remove('header__wrap--fixed');
    headerWrap.classList.remove('header__wrap--fixed-motion');
}

const checkTopVisual = () => {
    if(cmpSubVisual) {
        headerWrap.classList.add('header__wrap--bg-transparent');
    } 
    if(cmpMainVisual) {
        headerWrap.classList.add('header__wrap--bg-transparent');
    }
}


window.addEventListener("scroll", scrollEventManage);
checkTopVisual();
mainNavigation('.navy-list > li > a');
moNavigationToggle('.mo-menu .btn-hamburger-menu');
moNavigationAccordion('.mo-navy-list > li > a')

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

mainNavigation('.navy-list > li > a')
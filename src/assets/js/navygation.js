export const mainNavigation = (selector) => {
    const navyLists = document.querySelectorAll(selector);
    if(!navyLists) {
        return;
    }
    navyLists.forEach(navy => {
        navy.addEventListener('click', () => {
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
                console.log(subMenuHeight)
            } else {
                if(navy.closest('.header__wrap').classList.contains('is-active')) {
                    navy.closest('.header__wrap').classList.remove('is-active');                    
                }
                navy.parentElement.style.position = 'relative';
                navy.parentElement.classList.add('is-active');
            }
            
        })
    })

}
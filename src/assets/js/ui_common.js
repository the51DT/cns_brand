// basic html 
/***************************
 * UI common function * 
 ***************************/
// UUID생성
export const generateUniqueId = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//숫자에 콤마
export const numComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};



//dropdown menu  
export const dropdownMenu = (menuSelector) => {   
    const dropdownMenus = document.querySelectorAll(menuSelector); 

    dropdownMenus.forEach(menu => {
        const trigger = menu.querySelector('.btn-dropdown');
        const siblings = getNextSibling(trigger); 

        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isActive = trigger.classList.toggle('is-active');                       
            siblings.classList.toggle('is-active', isActive);
        });

        const optionList = menu.querySelectorAll('.dropdown_list li button');
        optionList.forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.getAttribute('data-option');
                trigger.textContent = selectedValue;

                menu.querySelectorAll('.dropdown_list li').forEach(item => {
                    item.classList.remove('is-active');
                });

                option.parentElement.classList.add('is-active');
                trigger.classList.remove('is-active');
                siblings.classList.remove('is-active');
            });
        });
    });

    document.addEventListener("click", function(e) {        
        dropdownMenus.forEach(menu => {
            const trigger = menu.querySelector('.btn-dropdown');
            const siblings = getNextSibling(trigger);

            if (!menu.contains(e.target) && !e.target.closest('.btn-dropdown')) {                
                trigger.classList.remove('is-active');
                siblings.classList.remove('is-active');
            }
        });
    });
};
// 모달 열기 2.
export const setModal = (target) => { // target : 모달 아이디
    target = document.getElementById(target);
    target.style.display = 'block';
    if(target.classList.contains('type-bottom')) {
        const modalHeadHeight = target.querySelector('.modal-header') ? target.querySelector('.modal-header').offsetHeight : 0;
        const modalFootHeight = target.querySelector('.modal-footer') ? target.querySelector('.modal-footer').offsetHeight : 0;
        
        let modalHeight = modalHeadHeight + modalFootHeight + 50;

        target.querySelector('.modal-cont').style = `--modal-cont-height:${modalHeight}px`;
    };

    setTimeout(() => {
        target.classList.add('is-active');                
        document.body.classList.add('modal-open');
    }, 300);
}
window.setModal = setModal;
// 모달 열기 1.
export const openModal = (event, type) => {
    const btn = event.currentTarget;
    const modalId = btn.getAttribute('modal-id');
    const target = document.getElementById(modalId);

    if (target) {     
        setModal(modalId); // ID =`${modal-id}` 에 해당되는 모달 열기
    }
};
window.openModal = openModal;
// 모달 외부 클릭 이벤트 핸들러
document.addEventListener("click", function(e) {  
    console.log(e.target)  
    if (e.target.classList.contains('modal__wrap--bg')) {        
        // const activeModal = e.target;
        setTimeout(() => {
            e.target.classList.remove('is-active');

            // activeModal.classList.remove('is-active');
            document.body.classList.remove('modal-open');     
        }, 300);         
        e.target.style.display = 'none';
        // activeModal.style.display = 'none';
    }
});

//모달창 닫기
export const closeModal = (event, openButton) => {
    const btn = event.currentTarget;    
    const activeModal = btn.closest('.modal__wrap--bg');    
    if (activeModal) {
        activeModal.classList.remove('is-active')        
        document.body.classList.remove('modal-open');
        
        setTimeout(() => {
            activeModal.style.display = 'none';
        }, 300);
    }
};
window.closeModal = closeModal;

const addCloseModalListeners = (target, openButton) => {
    const closeButtons = target.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => closeModal(event, openButton));
    });
};

// 모달 상태 체크
document.addEventListener('DOMContentLoaded', () => {
    const checkOpenModal = document.querySelectorAll('.modal__wrap--bg.is-active');

    // 요소가 있는 경우에만 처리
    if (checkOpenModal.length > 0) {
        checkOpenModal.forEach(modalEl => {
            if (modalEl.classList.contains('type-full') && modalEl.style.display === 'block') {
                document.body.classList.add('modal-open');
            } else {
                document.body.classList.remove('modal-open');
            }
        });
    }
});


// 클래스 추가/삭제
export const setCls = (el, cls, type) => {
    type !== 'remove' ? el.classList.add(cls) : el.classList.remove(cls);
};

// 형제 찾기
export const getNextSibling = (el) => {
    if (!el || !el.parentElement) return null; // 요소가 없거나 부모가 없는 경우 null 반환
    return el.nextElementSibling;
};

// 토글
export const openToggleBox = (el) => {
    const _toggles = el.dataset.toggle;
    const _trueText = el.dataset.truetext;
    const _falseText = el.dataset.falsetext;
    const _target = el.parentNode;

    if (_target.classList.contains('toggle__wrap')) {
        if (_target.classList.contains(_toggles)) {
            _target.classList.remove(_toggles);
            if(_trueText) el.innerText = _trueText;
        } else {
            _target.classList.add(_toggles);
            if(_falseText) el.innerText = _falseText;
        }
    }
};

//infinite scroll
export const infiniteScroll = (loadMoreContent, totalLoadedItems, maxItems, ms) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    loadMoreContent().then(hasMoreContent => {
                        if (!hasMoreContent) {
                            observer.unobserve(entry.target); // 더 이상 로드할 콘텐츠가 없으면 관찰 중지
                            entry.target.style.display = 'none'; // .scroll-target 요소 숨기기
                        }
                    });
                }, ms); //지연 추가
            }
        });
    }, { threshold: 0.9 });

    const targetElement = document.querySelector('.scroll-target');
    if (targetElement) {
        observer.observe(targetElement);
    } else {
        console.error("Target element not found for intersection observer.");
    }
};


// 토스트 팝업
export function openToast(id, tostMsg, Case = '') {
    // toast 요소 생성
    let toastContainer = document.querySelector('.toast--wrap');
    let innerContainer = document.querySelector('.toast__inner');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.classList.add('toast--wrap');      


        document.body.appendChild(toastContainer);
    }

    if (!innerContainer) {
        innerContainer = document.createElement('div');
        innerContainer.classList.add('toast__inner');
        toastContainer.appendChild(innerContainer);
    }

    const tostTemplate = document.createElement('div');
    tostTemplate.className = 'toast--wrap__msg';

    tostTemplate.id = id;
    tostTemplate.innerHTML = `<i class="ico ico-check-or"></i>${tostMsg}`;

    // toast 컨테이너에 추가    
    innerContainer.appendChild(tostTemplate);
    

    // 방금 생성한 toast를 가져옴
    const toast = document.getElementById(id);
    const toastIcon = toast.querySelector('.ico');

    if (Case) {
        if(Case === 'error') {
            toast.querySelector('i').classList.remove('ico-check-or');
            toast.querySelector('i').classList.add('is-error-or');
        } else if (Case === 'bottomCase') {
            toastContainer.classList.add('toast--wrap__btm');
        } else if (Case === 'info') {
            toast.querySelector('i').classList.add('ico-info-or16');
        }    
        else if (Case === 'noIcon') {
            toastIcon.remove();
        }   
    }

    if (!toast) return;

    // toast를 보이게 설정 (바로 애니메이션이 적용되지 않도록 미리 transition 제거)
    toast.style.opacity = 0;
    toast.style.transition = ""; // 기존 transition 제거
    toast.classList.add("show");

    // 위치 조정을 위해 기존 토스트들의 bottom 값을 다시 계산
    adjustToast();

    // 작은 딜레이 후에 나타나는 애니메이션 적용
    setTimeout(() => {
        toast.style.transition = "opacity 0.6s ease";
        toast.style.opacity = 1;
    }, 10);

    // 일정 시간 후에 자동으로 토스트 닫기
    setTimeout(() => {
        closeToast(id);
    }, 2000); 
}

export function closeToast(id) {
    const toast = document.getElementById(id);
    if (!toast) return;

    // 사라지는 애니메이션 적용
    toast.style.transition = "opacity 0.6s ease";  // 0.6초 동안 부드럽게 투명해짐
    toast.style.opacity = 0;  // 투명하게 변경

    const backupTimeout = setTimeout(() => {
        if (toast) {
            toast.classList.remove("show");
            toast.remove();
            adjustToast();
        }
    }, 600); // 0.6초 후 강제로 제거
}

export function adjustToast() {
    const toasts = document.querySelectorAll(".toast--wrap__msg.show"); // .show 클래스가 있는 토스트만 선택
    let bottom = 10; // 초기 bottom 값 설정 (화면 하단 간격)

    toasts.forEach((toast) => {
        toast.style.transition = "bottom 0.6s ease";
        toast.style.bottom = `${bottom}px`;        
        bottom += toast.offsetHeight + 10; // 각 토스트의 높이와 간격(10px)을 더함
    });
}

// tabMenu 
// tabMenu('.tab__wrap', 'tab') 전환방식;
// tabMenu('.tab__wrap', 'list') 정렬 방식;
export const tabMenu = (el, type) => {
    if (!el || typeof el !== 'string') return;

    if (type !== 'tab') {
        sortingList();
    }

    document.querySelectorAll(el).forEach(wrap => {
        const tabList = wrap.querySelectorAll('.tab__menu li a');
        const tabContents = wrap.querySelectorAll('.tab__content');

        if (!tabList.length || (type === 'tab' && !tabContents.length)) return;

        if (type === 'tab' && tabList.length !== tabContents.length) return;

        tabList.forEach((list, index) => {
            list.addEventListener('click', (event) => {
                event.preventDefault();

                wrap.querySelector('.tab__menu li.is-active')?.classList.remove('is-active');
                list.parentElement.classList.add('is-active');

                if (type === 'tab') {
                    wrap.querySelector('.tab__content.is-active')?.classList.remove('is-active');
                    tabContents[index]?.classList.add('is-active');
                } else {
                    sortingList();
                }
            }, { once: false });
        });
    });
};

// 툴팁
export const tooltip = (el) => {
    if(!el || typeof el !== 'string') return;

    const toolTipButtons = document.querySelectorAll(el);
    toolTipButtons.forEach(button => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = button.getAttribute('data-tooltip');
        button.appendChild(tooltip);
    });
}
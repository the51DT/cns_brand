/***************************
 * UI common function * 
 ***************************/

// search 포커스 
const checkInputFocus = (inputAdditionalFn) => {
    const inputs = document.querySelectorAll('.form-element__inner input[type="text"]');
    const autoComplete = document.querySelector('.autocomplate__wrap')    
    inputs.forEach(input => {
        if(input.value !== '') {
            const nextSibling = input.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('btn-remove')) {
                nextSibling.classList.add('is-show');
            } 
        }        
    });
    const handleInputKeyup = (event) => {
        const nextSibling = event.target.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('btn-remove')) {
            nextSibling.classList.add('is-show');
        } 
        if (event.target.value === '') {
            nextSibling.classList.remove('is-show');
        }

        if(autoComplete) {
            autoComplete.style.display = "block";
        }         
        // 추가로 전달된 함수 실행
        if (inputAdditionalFn) {
            inputAdditionalFn(event);
        }
    };
    const handleBtnRemoveClick = (event) => {
        const input = event.target.closest('.form-element__inner').querySelector('input[type="text"]');
        input.value = '';
        event.target.classList.remove('is-show');
        if(autoComplete) {
            autoComplete.style.display = "none";
        }         
        // 추가로 전달된 함수 실행
        if (inputAdditionalFn) {
            inputAdditionalFn(event);
        }
    };
    inputs.forEach(input => {
        input.addEventListener('keyup', handleInputKeyup);
        const btnRemove = input.nextElementSibling;
        if (btnRemove && btnRemove.classList.contains('btn-remove')) {
            btnRemove.addEventListener('click', handleBtnRemoveClick);
        }       
    });
};

// input 포커스 
const checkCmpInputFocus = (inputAdditionalFn) => {
    const inputs = document.querySelectorAll('.cmp-input__wrap input[type="text"]');
    const autoComplete = document.querySelector('.autocomplate__wrap')    
    inputs.forEach(input => {
        if(input.value !== '') {
            const nextSibling = input.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('btn-remove')) {
                nextSibling.classList.add('is-show');
            } 
        }        
    });
    const handleInputKeyup = (event) => {
        const nextSibling = event.target.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('btn-remove')) {
            nextSibling.classList.add('is-show');
        } 
        if (event.target.value === '') {
            nextSibling.classList.remove('is-show');
        }

        if(autoComplete) {
            autoComplete.style.display = "block";
        }         
        // 추가로 전달된 함수 실행
        if (inputAdditionalFn) {
            inputAdditionalFn(event);
        }
    };
    const handleBtnRemoveClick = (event) => {
        const input = event.target.closest('.cmp-input__wrap').querySelector('input[type="text"]');
        input.value = '';
        event.target.classList.remove('is-show');
        event.target.closest('.btn-remove').classList.remove('is-show');
        if(autoComplete) {
            autoComplete.style.display = "none";
        }         
        // 추가로 전달된 함수 실행
        if (inputAdditionalFn) {
            inputAdditionalFn(event);
        }
    };
    inputs.forEach(input => {
        input.addEventListener('keyup', handleInputKeyup);
        const btnRemove = input.nextElementSibling;
        if (btnRemove && btnRemove.classList.contains('btn-remove')) {
            btnRemove.addEventListener('click', handleBtnRemoveClick);
        }       
    });
};

//dropdown menu  
const dropdownMenu = (menuSelector) => {   
    const dropdownMenus = document.querySelectorAll(menuSelector); 

    dropdownMenus.forEach(menu => {
        const trigger = menu.querySelector('.btn-dropdown');
        const dropdownList = menu.querySelector('.dropdown_list');
        const enterInput = menu.querySelector('.dropdown_input');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isActive = trigger.classList.toggle('is-active');                       
            dropdownList.classList.toggle('is-active', isActive); // 드롭다운 리스트의 활성화 상태 토글
        });

        const optionList = menu.querySelectorAll('.dropdown_list li button, .dropdown_list li a');
        optionList.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedValue = option.getAttribute('data-option');
                trigger.textContent = selectedValue || option.innerText;

                // 모든 옵션의 활성화 상태 제거
                optionList.forEach(item => {
                    item.parentElement.classList.remove('is-active'); // 모든 항목에서 .is-active 제거
                });

                // 선택된 옵션의 활성화 상태 추가
                option.parentElement.classList.add('is-active'); // 선택된 항목에 .is-active 추가

                if (trigger.classList.contains('no-select')) {
                    trigger.classList.remove('no-select');
                }

                if (option.classList.contains('dropdown_enter')) {
                    if (enterInput) {
                        enterInput.classList.add('is-active');
                        trigger.textContent = ''; // 텍스트 초기화
                    }
                } else {
                    if (enterInput) {
                        enterInput.classList.remove('is-active');
                    }
                }

                trigger.classList.remove('is-active'); // 드롭다운 트리거의 .is-active 제거
                dropdownList.classList.remove('is-active'); // 드롭다운 리스트 닫기
            });
        });
    });

    document.addEventListener("click", function(e) {        
        dropdownMenus.forEach(menu => {
            const trigger = menu.querySelector('.btn-dropdown');
            const dropdownList = menu.querySelector('.dropdown_list');

            if (!menu.contains(e.target) && !e.target.closest('.btn-dropdown')) {                
                trigger.classList.remove('is-active');
                dropdownList.classList.remove('is-active'); // 드롭다운 리스트 닫기
            }
        });
    });
}; 
// 모달 열기 2.
const setModal = (target) => { // target : 모달 아이디
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
const openModal = (event, type) => {
    console.log(event)
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
const closeModal = (event, openButton) => {
    const btn = event.currentTarget;    
    const activeModal = btn.closest('.cmp-modal'); 
    const hasMain = document.querySelector('.main');
    if (activeModal) {
        activeModal.classList.remove('is-active')        
        document.body.classList.remove('modal-open');
        
        setTimeout(() => {
            activeModal.style.display = 'none';
            if(hasMain) {
                 //250711 추가 : 모달창 닫을경우, 이전에 선택되었던 대상 카드의 클래스와 스타일 초기화 하기 위해,모바일 carousel 카드 전체의 스타일, 클래스 값 초기화
                const carouselCard = document.querySelectorAll(".carousel-wrap .card-context");
                carouselCard.forEach(card => {
                    card.classList.remove("on");
                    card.querySelector(".card-inner").removeAttribute("style");
                })
                initCarousel(); //250711 추가 : initCarousel(); 관련 함수 호출
            }
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
const setCls = (el, cls, type) => {
    type !== 'remove' ? el.classList.add(cls) : el.classList.remove(cls);
};

// 형제 찾기
const getNextSibling = (el) => {
    if (!el || !el.parentElement) return null; // 요소가 없거나 부모가 없는 경우 null 반환
    return el.nextElementSibling;
};

// 토글
const openToggleBox = (el) => {
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
const infiniteScroll = (loadMoreContent, totalLoadedItems, maxItems, ms) => {
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
function openToast(id, tostMsg, Case = '') {
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

function closeToast(id) {
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

function adjustToast() {
    const toasts = document.querySelectorAll(".toast--wrap__msg.show"); // .show 클래스가 있는 토스트만 선택
    let bottom = 10; // 초기 bottom 값 설정 (화면 하단 간격)

    toasts.forEach((toast) => {
        toast.style.transition = "bottom 0.6s ease";
        toast.style.bottom = `${bottom}px`;        
        bottom += toast.offsetHeight + 10; // 각 토스트의 높이와 간격(10px)을 더함
    });
}

//250711 추가 : initCarousel(); 관련 함수 : closeModal() 할 경우, 해당 함수 재호출하기위해 가져옴
function initCarousel() {
  const intViewportWidth = window.innerWidth;
  if (intViewportWidth < 1280) {
    // mobile
    gsap.set('.carousel-wrap', {
      height: `${document.querySelector('.card-context .card-inner').clientHeight}px`,
      onComplete: () => [carousel()],
    });
  }
}
//250711 추가 : carousel(); 관련 함수 : closeModal() 할 경우, 해당 함수 재호출하기위해 가져옴
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
  x(0);

  tickerCallback = () => {
    var e;
    if (!u) {
      if (p) c -= s;
      l = l * (1 - (e = 0.1)) + c * e;
      x(l);
      if (!p) {
        s = l - a;
        a = l;
      }
      p ? (i += 0.05) : ((i = 0.0075 * a), (a = l));
    }
  };

  gsap.ticker.add(tickerCallback);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1280) {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`),
        gsap.set('.carousel-wrap', {
          height: `${document.querySelector('.card-context .card-inner').clientHeight}px`,
        }),
        (n = e.clientWidth),
        (o = t[0].clientWidth + 10),
        (r = t.length * o);
    }
  });
}

// tabMenu 
// tabMenu('.tab__wrap', 'tab') 전환방식;
// tabMenu('.tab__wrap', 'list') 정렬 방식;
const tabMenu = (el, type) => {
    if (!el || typeof el !== 'string') return;

    if (type !== 'tab') {
        sortingList();
    }

    document.querySelectorAll(el).forEach(wrap => {
        const tabList = wrap.querySelectorAll('.tab__menu li a');
        const tabContents = wrap.querySelectorAll('.tab__content');

        if (!tabList.length || (type === 'tab' && !tabContents.length)) return;

        if (type === 'tab' && tabList.length !== tabContents.length) return;

        if(wrap.classList.contains('align-center')) {
            let tabItemsCount = tabList.length; 
            wrap.style.setProperty('--tab-count', tabItemsCount);               
        }     

        tabList.forEach((list, index) => {
            list.addEventListener('click', (event) => {
                const contentPosition = tabContents[index].offsetTop;
                event.preventDefault();
                wrap.querySelector('.tab__menu li.is-active')?.classList.remove('is-active');
                list.parentElement.classList.add('is-active');

                if (type === 'tab') {
                    wrap.querySelector('.tab__content.is-active')?.classList.remove('is-active');
                    tabContents[index]?.classList.add('is-active');
                    window.scrollTo({
                        top: contentPosition,
                        behavior: 'smooth'
                    });
                } else {
                    sortingList();
                }
            }, { once: false });
        });
    });
};
const tabSubMenu = (el, type) => {
    if (!el || typeof el !== 'string') return;

    if (type !== 'tab') {
        sortingList();
    }

    document.querySelectorAll(el).forEach(wrap => {
        const tabList = wrap.querySelectorAll('.tab__sub-menu li a');
        const tabContents = wrap.querySelectorAll('.tab__sub-content');

        if (!tabList.length || (type === 'tab' && !tabContents.length)) return;

        if (type === 'tab' && tabList.length !== tabContents.length) return;

        if(wrap.classList.contains('align-center')) {
            let tabItemsCount = tabList.length; 
            wrap.style.setProperty('--tab-count', tabItemsCount);               
        }     

        tabList.forEach((list, index) => {
            list.addEventListener('click', (event) => {
                const contentPosition = tabContents[index].offsetTop;
                event.preventDefault();

                wrap.querySelector('.tab__sub-menu li.is-active')?.classList.remove('is-active');
                list.parentElement.classList.add('is-active');

                if (type === 'tab') {
                    wrap.querySelector('.tab__sub-content.is-active')?.classList.remove('is-active');
                    tabContents[index]?.classList.add('is-active');
                    window.scrollTo({
                        top: contentPosition,
                        behavior: 'smooth'
                    });
                } else {
                    sortingList();
                }
            }, { once: false });
        });
    });
};

// 툴팁
const tooltip = (el) => {
    if(!el || typeof el !== 'string') return;

    const toolTipButtons = document.querySelectorAll(el);
    toolTipButtons.forEach(button => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = button.getAttribute('data-tooltip');
        button.appendChild(tooltip);
    });
}

//아코디언
const accordion = (selector) => {
    if (!selector) {
        return;
    }

    const accWraps = document.querySelectorAll(selector);
    accWraps.forEach(acc => {
        const accButtons = acc.querySelectorAll('.accordion-title button');

        accButtons.forEach(button => {
            button.addEventListener('click', () => {
                const currentItem = button.closest('.accordion-item');
                const activeItem = acc.querySelector('.accordion-item.is-active');

                if (activeItem && activeItem !== currentItem) {
                    activeItem.classList.remove('is-active');
                }

                currentItem.classList.toggle('is-active');
            });
        });
    });
};

const sidebarCmp = () => {
    const sidebarEl = document.querySelector('.cmp-sidebar')
    if(!sidebarEl) {
        return;
    }

    // 섹션 아이디 부여
    const sections = document.querySelectorAll('.cmp-wrap:not(.cmp-sidebar):not(.cmp-seperator)');
    const offset = 150;

    sections.forEach((section, index) => {
        section.setAttribute('id','section0' + (index+1))
    })

    // 활성화 상태 업데이트 함수
    const updateActiveState = (targetId) => {
        // 모든 네비게이션 항목의 활성화 상태 제거
        document.querySelectorAll('.cmp-sidebar li').forEach(item => {
            item.classList.remove('is-active');
        });

        // 현재 섹션에 해당하는 네비게이션 항목 활성화
        sideNavy.forEach(nav => {
            const navTargetId = nav.getAttribute('href').replace('#', '');
            if (navTargetId === targetId) {
                nav.parentElement.classList.add('is-active');
            }
        });
    };

    const sideNavy = sidebarEl.querySelectorAll('li a')
    sideNavy.forEach(nav => {
        nav.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ 
                    top: targetPosition, 
                    behavior: "smooth" 
                });
                
                // 클릭 시 활성화 상태 업데이트
                updateActiveState(targetId);
            }
        });
    });

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        let currentSection = null;
        let minDistance = Infinity;

        // 각 섹션의 위치를 확인하고 가장 가까운 섹션 찾기
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - offset);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section;
            }
        });

        if (currentSection) {
            const currentId = currentSection.getAttribute('id');
            updateActiveState(currentId);
        }
    };

    window.addEventListener('scroll', handleScroll);
    
    // 초기 로드 시 현재 위치에 맞는 섹션 활성화
    handleScroll();
}

const inputSearch  = (target) => {
    const searchInput = document.querySelectorAll(target);
    const searchList = document.querySelectorAll(".result__list li");
    searchInput.forEach((el) => {
        // const resultList = dropContent.querySelector('.result__list');
        // search 선택 시 검색 영역 펼쳐짐
        el.addEventListener("click", (event)=> {
            const inputContent = el.closest('.cmp-input__content');
            const dropCont = inputContent.querySelector('.cmp-input__drop-content');
            if(dropCont) {
                dropCont.classList.add('is-active');
            }
        })

        // 닫기 버튼 선택 시 search 검색 영역 닫힘
        const btnClose = el.closest('.cmp-input__content').querySelector('.result__btn-close');
        if(btnClose) {
            btnClose.addEventListener("click", (event) => {
                // event.stopPropagation();
                const closeTarget = btnClose.closest('.cmp-input__drop-content');
                closeTarget.classList.remove('is-active');
            });
        }
    });

    searchList.forEach((el) => {
        const selector = el.querySelector('.result__select-box');
        el.addEventListener("click", (event) => {
            event.preventDefault()
            if(!selector.classList.contains('is-active')) {
                selector.classList.add('is-active')
            } else {
                selector.classList.remove('is-active')
            }
        });
    });
}
//버튼 스타일 스크립트
const glideText = (() => {
    const text = document.querySelectorAll('.btn-glide');
    if (!text) return

    text.forEach((text) => {
        const textInner = text.querySelector('.btn-glide__inner')
        const textInnerText = textInner.querySelector('.btn-glide__text')
        const textInnerWidth = textInnerText.offsetWidth

        const init = () => {
            textInner.style.width = `0px`

            setTimeout(() => {
                animate(true)        
            }, 500)
        }

        const animate = (isVisible) => {
            textInner.style.width = `${isVisible? textInnerWidth : 0}px`
            text.classList.toggle('btn-glide--active', isVisible)
        }

        init() // 실행
    });
})

// input radio 값에 따른 노출/비노출 처리
const radioInputToggle = () => {
    const radioItems = document.querySelectorAll('.cmp-input__item--radio');
    const toggleTargets = document.querySelectorAll('.cmp-input__wrap[data-visible-value]');

    const updateVisibleTargets = () => {
        // 각 라디오 버튼 그룹별(name)로 처리
        const checkedGroups = {};

        // 체크된 라디오 버튼 그룹 수집
        radioItems.forEach((item) => {
            const groupName = item.getAttribute('name');
            if (item.checked) {
                checkedGroups[groupName] = item.getAttribute('data-visible-target');
            }
        });

        // 각 토글 대상 업데이트
        toggleTargets.forEach((target) => {
            const targetValue = target.getAttribute('data-visible-value');
            const isVisible = Object.values(checkedGroups).includes(targetValue);
            target.style.display = isVisible ? 'block' : 'none';
        });
    };

    // 페이지 로드 시 초기 상태 체크
    updateVisibleTargets();

    // 각 라디오 버튼에 change 이벤트 리스너 추가
    radioItems.forEach((item) => {
        item.addEventListener('change', updateVisibleTargets);
    });
};

// .btn-top 버튼 클릭 이벤트
const winScrollTop = (() => {
    const btnTop = document.querySelector('.btn-top');
    if(btnTop) {
        btnTop.addEventListener("click", () => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
    }
})

// .btn-top 버튼 노출 처리
const displayTopButton = (() => {
    let scrollState = 0;
    const btnTopWrap = document.querySelector('.button__wrap--btn-top');
    window.addEventListener("scroll", () => {
        if(btnTopWrap) {
            const Yoffset = window.pageYOffset || document.documentElement.scrollTop;
            // console.log('Yoffset:', Yoffset)
            if (Yoffset > scrollState || Yoffset == 0) {
                // console.log('down');
                btnTopWrap.classList.remove('is-fixed')
            } else {
                // console.log('up');
                btnTopWrap.classList.add('is-fixed')
            }
            scrollState = Yoffset <= 0 ? 0 : Yoffset;
        }
    });
});




// document.addEventListener("DOMContentLoaded", sidebarCmp);
document.addEventListener("DOMContentLoaded", () => {
    sidebarCmp;
    checkInputFocus();
    checkCmpInputFocus();
    radioInputToggle();
    dropdownMenu('.dropdown-menu');
    accordion('.basic-type', 'basic');        
    accordion('.open-type', 'basic');   
    inputSearch('.cmp-input__item--search'); 
    winScrollTop();
    displayTopButton();
});

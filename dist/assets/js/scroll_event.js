
// 스크롤 이벤트 처리 함수
import { animateNumbers } from "../../assets/js/ui_common.js";

let isAnimated = false;

export const ScrollEnterMain = () => {
    const content = document.querySelector('.wrap .content');
    const modalContent = document.querySelectorAll('.modal__wrap .modal-cont');
    const scrollElements = document.querySelectorAll(".animation-enter");
    const motionMsg = document.querySelectorAll(".animation-msg");
    const bubbleElements = document.querySelectorAll(".anibubble_wrap");

    if (!scrollElements) return;

    const elementInView = (el, dividend = 1) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    const elementOutofView = (el) => el.getBoundingClientRect().top > (window.innerHeight || document.documentElement.clientHeight);
    const displayScrollElement = (element) => element.classList.add("fade-in");
    const hideScrollElement = (element) => {
        element.classList.remove("fade-in", "left-enter-effect", "right-enter-effect", "shadow-effect", "scroll-up");
    };

    const displayBubbleElement = (element) => element.classList.add("bubble-js");
    const hideBubbleElement = (element) => element.classList.remove("bubble-js");

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
                el.classList.toggle('left-enter-effect', el.hasAttribute('left-enter'));
                el.classList.toggle('right-enter-effect', el.hasAttribute('right-enter'));
                el.classList.toggle('shadow-effect', el.hasAttribute('shadow-effect'));
                el.classList.toggle('scroll-up', el.hasAttribute('scrollUp'));     
                displayAnimation();                 
            } else if (elementOutofView(el)) {
                hideScrollElement(el);                
            }
        });
        
        bubbleElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayBubbleElement(el);
            } else if (elementOutofView(el)) {
                hideBubbleElement(el);
            }
        });

        // 다이나믹 메세지 동작 : 1회 노출
        motionMsg.forEach((el) => {
            if (elementInView(el, 1.25)) {
                el.classList.add("fade-in-msg");
            }
        });
    };

    // .wrap > .content 안에서 스크롤 적용
    if(content) {
        content.addEventListener("scroll", handleScrollAnimation);
    }
    // .modal__wrap > .modal-cont 안에서 스크롤 적용
    if(modalContent) {
        modalContent.forEach((el) => {
            el.addEventListener("scroll", handleScrollAnimation);
        });
    }

    window.addEventListener("scroll", handleScrollAnimation);
};

export const displayAnimation = () => {        
    if (!isAnimated) {
        animateNumbers();
        isAnimated = true;
    }
};

// 위 아래 구분을 위한 스크립트
let lastScrollTop = 0;
const scrollEventManage = () => {
const Yoffset = window.pageYOffset || document.documentElement.scrollTop;

if (Yoffset > lastScrollTop) {
    // down scroll code
    // console.log("scroll Down")
    onDownScroll();
} else {
    // console.log("scroll Up")
    onUpScroll();
}
lastScrollTop = Yoffset <= 0 ? 0 : Yoffset;
}
window.addEventListener("scroll", scrollEventManage);
// 위 아래 구분을 위한 스크립트====================

const onDownScroll = () => {
    
}

const onUpScroll = () => {

}

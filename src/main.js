import { loadIncludedHTML } from './assets/js/pub_include.js'
import { generateUniqueId, numComma, dropdownMenu, setModal, openModal, closeModal, getNextSibling, openToggleBox, infiniteScroll, openToast, closeToast, tabMenu, setCls } from './assets/js/ui_common.js';


let currentPage = null;
let currentLocation = window.location.href;

// Fetch를 사용한 방법
async function loadIaData() {
    try {
        const response = await fetch('/ia.json');
        const data = await response.json();

        // 사이트 제목 설정
        document.title = data.siteName;
        const pageTitle = document.querySelector('#siteTitle');
        const pageCateText = document.querySelector('.sub-text');
        
        if (pageTitle) {
            pageTitle.textContent = data.siteName;
        }

        // 현재 페이지 경로 확인
        const currentLocation = window.location.pathname;
        const currentPageName = currentLocation.split('/').pop() || 'index.html';

        // 카테고리 제목 설정
        const pageCateTitle = document.querySelector('#pagesTitle');
        const subTextElement = document.querySelector('.visual-text .sub-text');
        const h2Element = document.querySelector('.visual-text .font-head-xl');

        if (pageCateTitle) {
            // IA 데이터에서 현재 페이지와 매칭되는 Level2 찾기
            let matchedName = null;
            let matchedSubText = null;
            data.IaList.some((item) => {                
                const matchedItem = item.Level2.find((subItem) => 
                    subItem.fileName.includes(currentPageName) // 현재 페이지 경로와 매칭
                );
                if (matchedItem) {
                    matchedName = matchedItem.name; // 매칭된 name 저장
                    matchedSubText = matchedItem.subText;
                    return true; // 매칭되면 루프 종료
                }
                return false; // 다음 항목으로 진행
            });

            // 매칭된 name을 페이지 제목에 설정
            if (matchedName) {
                console.log('ddd', matchedName);
                pageCateTitle.textContent = matchedName;     
                if(h2Element) {
                    subTextElement.textContent = matchedSubText || '기본 서브 텍스트';
                    h2Element.textContent = matchedName;
                }           
            } else {
                pageCateTitle.textContent = 'json 파일에 추가해주세요';
                if(h2Element) {
                    subTextElement.textContent = '기본 서브 텍스트';
                    h2Element.textContent = '기본 제목';
                }
            }
        }

        return data; // 데이터를 반환
    } catch (error) {
        console.error('Error loading IA data:', error);
        return null;
    }
}

// DOM이 로드된 후 실행될 초기화 코드
document.addEventListener('DOMContentLoaded', async () => {  
    await loadIncludedHTML();
    // loadIaData();  // 반환된 데이터를 변수에 할당
    const data = await loadIaData();    

    // 가이드 네비
    const guideNavi = document.querySelector('.guide-header__wrap .navi');
    const guideNaviBtn = guideNavi.querySelector('button');
    if(guideNaviBtn) {
        guideNaviBtn.addEventListener("click", () => {
            guideNavi.classList.contains("open") ?  setCls(guideNavi, 'open', 'remove') : setCls(guideNavi, 'open')
        })
    }
})
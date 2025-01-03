import { loadIncludedHTML } from './assets/js/pub_include.js'
import { generateUniqueId, numComma, dropdownMenu, setModal, openModal, closeModal, getNextSibling, openToggleBox, infiniteScroll, openToast, closeToast, tabMenu} from './assets/js/ui_common.js'


let currentPage = null;

// Fetch를 사용한 방법
async function loadIaData() {
    try {
        const response = await fetch('/ia.json');
        const data = await response.json();
        document.title = data.siteName;
        document.querySelector('#siteTitle').textContent = data.siteName;
        return data;  // 데이터를 직접 반환
    } catch (error) {
        console.error('Error loading IA data:', error);
        return null;
    }
}

// DOM이 로드된 후 실행될 초기화 코드
document.addEventListener('DOMContentLoaded', async () => {  
    loadIncludedHTML();
    loadIaData();  // 반환된 데이터를 변수에 할당
    const data = await loadIaData();
    console.log('제목', data);
})
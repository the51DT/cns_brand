import { loadIncludedHTML } from './assets/js/pub_include.js'
import { generateUniqueId, numComma, dropdownMenu, setModal, openModal, closeModal, getNextSibling, openToggleBox, infiniteScroll, openToast, closeToast, tabMenu} from './assets/js/ui_common.js'

// DOM이 로드된 후 실행될 초기화 코드
document.addEventListener('DOMContentLoaded', () => {  
    // 여기에 앱 초기화 코드 작성
    loadIncludedHTML();
})

// import './assets/css/index.css';

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


async function lnbMenuGuide() {
    fetch('/ia.json')
        .then(response => response.json())
        .then(data => {
            const lnbWrap = document.querySelector('.lnb-side__wrap:not(.basic-guide)');
            const ul = document.createElement('ul');
            ul.classList.add('lnb_list', 'has-children');

            // Filter the data to include only items with IDs 1, 2, and 3
            const filteredData = data.IaList.filter(level1Item => 
                [1, 2, 3].includes(level1Item.id)
            );

            filteredData.forEach(level1Item => {
                const li = document.createElement('li');
                const strong = document.createElement('strong');
                strong.textContent = level1Item.Level1;
                li.appendChild(strong);

                const subUl = document.createElement('ul');
                level1Item.Level2.forEach(level2Item => {
                    const subLi = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = `${level2Item.path}${level2Item.fileName}`;
                    a.textContent = level2Item.name;
                    subLi.appendChild(a);
                    subUl.appendChild(subLi);
                });

                li.appendChild(subUl);
                ul.appendChild(li);
            });

            lnbWrap.appendChild(ul);
            activateNavItem('.lnb_list a')
        })
        .catch(error => console.error('Error loading JSON:', error));
}


async function activateNavItem (targetSelector) {
    const lnbList = document.querySelectorAll(targetSelector);
    
    if (!lnbList.length) {        
        return;
    }

    const nowUrl = window.location.href.toLowerCase(); // 현재 URL을 소문자로 변환
    const fileNameMatch = nowUrl.match(/\/([^\/?#]+\.html)/); // 쿼리스트링(#, ?) 제거 후 파일명 추출
    const fileName = fileNameMatch ? fileNameMatch[1] : null;

    if (fileName) {
        console.log('현재 페이지:', fileName);

        lnbList.forEach(el => {
            const elLink = el.getAttribute('href')?.toLowerCase(); // href 값 소문자로 변환
            if (!elLink) return;

            const urlMatch = elLink.match(/\/?([^\/?#]+\.html)/); // 파일명만 추출
            const urlName = urlMatch ? urlMatch[1] : null;

            console.log('비교:', fileName, urlName);

            if (fileName === urlName) {
                el.parentNode.classList.add('is-active');
            }
        });
    }
};

// DOM이 로드된 후 실행될 초기화 코드
document.addEventListener('DOMContentLoaded', async () => {  
    //await loadIncludedHTML();
    // loadIaData();  // 반환된 데이터를 변수에 할당
    const data = await loadIaData();    
    const data2 = await lnbMenuGuide();    

    // 가이드 네비
    const guideNavy = document.querySelector('.guide-header__wrap .navi');
    if(!guideNavy) {
        return;
    }
    const guideNavyBtn = guideNavy.querySelector('button');
    if(guideNavyBtn) {
        guideNavyBtn.addEventListener("click", () => {
            guideNavy.classList.contains("open") ?  setCls(guideNavy, 'open', 'remove') : setCls(guideNavy, 'open')
        })
    }
        
    //2depth 메뉴
    const guideMenu = document.querySelector('.lnb-side__wrap .lnb-trigger');
    guideMenu && guideMenu.addEventListener('click', () => {
        guideMenu.classList.toggle('is-active');
        document.querySelector('.lnb_list').classList.toggle('is-active');
    })

    

    const activeMenu = document.querySelector('.lnb-side__wrap > ul li.is-active')
    if(activeMenu) {
        const activeMenuName = activeMenu.innerText;
        guideMenu.innerText = activeMenuName;
    }    

})
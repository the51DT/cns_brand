(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
async function loadIaData() {
  try {
    const response = await fetch("/ia.json");
    const data = await response.json();
    document.title = data.siteName;
    const pageTitle = document.querySelector("#siteTitle");
    const pageCateText = document.querySelector(".sub-text");
    if (pageTitle) {
      pageTitle.textContent = data.siteName;
    }
    const currentLocation = window.location.pathname;
    const currentPageName = currentLocation.split("/").pop() || "index.html";
    const pageCateTitle = document.querySelector("#pagesTitle");
    const subTextElement = document.querySelector(".visual-text .sub-text");
    const h2Element = document.querySelector(".visual-text .font-head-xl");
    if (pageCateTitle) {
      let matchedName = null;
      let matchedSubText = null;
      data.IaList.some((item) => {
        const matchedItem = item.Level2.find(
          (subItem) => subItem.fileName.includes(currentPageName)
          // 현재 페이지 경로와 매칭
        );
        if (matchedItem) {
          matchedName = matchedItem.name;
          matchedSubText = matchedItem.subText;
          return true;
        }
        return false;
      });
      if (matchedName) {
        console.log("ddd", matchedName);
        pageCateTitle.textContent = matchedName;
        if (h2Element) {
          subTextElement.textContent = matchedSubText || "기본 서브 텍스트";
          h2Element.textContent = matchedName;
        }
      } else {
        pageCateTitle.textContent = "json 파일에 추가해주세요";
        if (h2Element) {
          subTextElement.textContent = "기본 서브 텍스트";
          h2Element.textContent = "기본 제목";
        }
      }
    }
    return data;
  } catch (error) {
    console.error("Error loading IA data:", error);
    return null;
  }
}
async function lnbMenuGuide() {
  fetch("/ia.json").then((response) => response.json()).then((data) => {
    const lnbWrap = document.querySelector(".lnb-side__wrap");
    const ul = document.createElement("ul");
    ul.classList.add("lnb_list", "has-children");
    const filteredData = data.IaList.filter(
      (level1Item) => [1, 2, 3].includes(level1Item.id)
    );
    filteredData.forEach((level1Item) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = level1Item.Level1;
      li.appendChild(strong);
      const subUl = document.createElement("ul");
      level1Item.Level2.forEach((level2Item) => {
        const subLi = document.createElement("li");
        const a = document.createElement("a");
        a.href = `${level2Item.path}${level2Item.fileName}`;
        a.textContent = level2Item.name;
        subLi.appendChild(a);
        subUl.appendChild(subLi);
      });
      li.appendChild(subUl);
      ul.appendChild(li);
    });
    lnbWrap.appendChild(ul);
  }).catch((error) => console.error("Error loading JSON:", error));
}
const activateNavItem = (targetUrl) => {
  const lnbList = document.querySelectorAll(targetUrl);
  const nowUrl = window.location.href;
  const fileNameMatch = nowUrl.match(/\/([^\/]+\.html)$/);
  const fileName = fileNameMatch ? fileNameMatch[1] : null;
  if (fileName) {
    lnbList.forEach((el) => {
      const elLink = el.href;
      const urlMatch = elLink.match(/\/([^\/]+\.html)$/);
      const urlName = urlMatch ? urlMatch[1] : null;
      if (fileName === urlName) {
        el.parentNode.classList.add("is-active");
      }
    });
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  await loadIaData();
  await lnbMenuGuide();
  const guideNavy = document.querySelector(".guide-header__wrap .navi");
  if (!guideNavy) {
    return;
  }
  const guideNavyBtn = guideNavy.querySelector("button");
  if (guideNavyBtn) {
    guideNavyBtn.addEventListener("click", () => {
      guideNavy.classList.contains("open") ? setCls(guideNavy, "open", "remove") : setCls(guideNavy, "open");
    });
  }
  const guideMenu = document.querySelector(".lnb-side__wrap .lnb-trigger");
  guideMenu && guideMenu.addEventListener("click", () => {
    guideMenu.classList.toggle("is-active");
    document.querySelector(".lnb_list").classList.toggle("is-active");
  });
  activateNavItem(".lnb-side__wrap li a");
  const activeMenu = document.querySelector(".lnb-side__wrap > ul li.is-active");
  if (activeMenu) {
    const activeMenuName = activeMenu.innerText;
    guideMenu.innerText = activeMenuName;
  }
});

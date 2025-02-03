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
const loadIncludedHTML = async () => {
  const elements = document.querySelectorAll("[data-include-path]");
  console.log("로딩");
  await Promise.all([...elements].map(async (el) => {
    const includePath = el.dataset.includePath;
    try {
      const response = await fetch(includePath);
      const html = await response.text();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      el.outerHTML = tempDiv.innerHTML;
    } catch (error) {
      console.error(`Failed to load ${includePath}:`, error);
    }
  }));
};
const checkInputFocus = (inputAdditionalFn) => {
  const inputs = document.querySelectorAll('.form-element__inner input[type="text"]');
  const autoComplete = document.querySelector(".autocomplate__wrap");
  inputs.forEach((input) => {
    if (input.value !== "") {
      const nextSibling = input.nextElementSibling;
      if (nextSibling && nextSibling.classList.contains("btn-remove")) {
        nextSibling.classList.add("is-show");
      }
    }
  });
  const handleInputKeyup = (event) => {
    const nextSibling = event.target.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains("btn-remove")) {
      nextSibling.classList.add("is-show");
    }
    if (event.target.value === "") {
      nextSibling.classList.remove("is-show");
    }
    if (autoComplete) {
      autoComplete.style.display = "block";
    }
  };
  const handleBtnRemoveClick = (event) => {
    const input = event.target.closest(".form-element__inner").querySelector('input[type="text"]');
    input.value = "";
    event.target.classList.remove("is-show");
    if (autoComplete) {
      autoComplete.style.display = "none";
    }
  };
  inputs.forEach((input) => {
    input.addEventListener("keyup", handleInputKeyup);
    const btnRemove = input.nextElementSibling;
    if (btnRemove && btnRemove.classList.contains("btn-remove")) {
      btnRemove.addEventListener("click", handleBtnRemoveClick);
    }
  });
};
const dropdownMenu = (menuSelector) => {
  const dropdownMenus = document.querySelectorAll(menuSelector);
  dropdownMenus.forEach((menu) => {
    const trigger = menu.querySelector(".btn-dropdown");
    const siblings = getNextSibling(trigger);
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = trigger.classList.toggle("is-active");
      siblings.classList.toggle("is-active", isActive);
    });
    const optionList = menu.querySelectorAll(".dropdown_list li button, .dropdown_list li a");
    optionList.forEach((option) => {
      option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-option");
        trigger.textContent = selectedValue;
        menu.querySelectorAll(".dropdown_list li").forEach((item) => {
          item.classList.remove("is-active");
        });
        option.parentElement.classList.add("is-active");
        trigger.classList.remove("is-active");
        siblings.classList.remove("is-active");
      });
    });
  });
  document.addEventListener("click", function(e) {
    dropdownMenus.forEach((menu) => {
      const trigger = menu.querySelector(".btn-dropdown");
      const siblings = getNextSibling(trigger);
      if (!menu.contains(e.target) && !e.target.closest(".btn-dropdown")) {
        trigger.classList.remove("is-active");
        siblings.classList.remove("is-active");
      }
    });
  });
};
const setModal = (target) => {
  target = document.getElementById(target);
  target.style.display = "block";
  if (target.classList.contains("type-bottom")) {
    const modalHeadHeight = target.querySelector(".modal-header") ? target.querySelector(".modal-header").offsetHeight : 0;
    const modalFootHeight = target.querySelector(".modal-footer") ? target.querySelector(".modal-footer").offsetHeight : 0;
    let modalHeight = modalHeadHeight + modalFootHeight + 50;
    target.querySelector(".modal-cont").style = `--modal-cont-height:${modalHeight}px`;
  }
  setTimeout(() => {
    target.classList.add("is-active");
    document.body.classList.add("modal-open");
  }, 300);
};
window.setModal = setModal;
const openModal = (event, type) => {
  const btn = event.currentTarget;
  const modalId = btn.getAttribute("modal-id");
  const target = document.getElementById(modalId);
  if (target) {
    setModal(modalId);
  }
};
window.openModal = openModal;
document.addEventListener("click", function(e) {
  console.log(e.target);
  if (e.target.classList.contains("modal__wrap--bg")) {
    setTimeout(() => {
      e.target.classList.remove("is-active");
      document.body.classList.remove("modal-open");
    }, 300);
    e.target.style.display = "none";
  }
});
const closeModal = (event, openButton) => {
  const btn = event.currentTarget;
  const activeModal = btn.closest(".modal__wrap--bg");
  if (activeModal) {
    activeModal.classList.remove("is-active");
    document.body.classList.remove("modal-open");
    setTimeout(() => {
      activeModal.style.display = "none";
    }, 300);
  }
};
window.closeModal = closeModal;
document.addEventListener("DOMContentLoaded", () => {
  const checkOpenModal = document.querySelectorAll(".modal__wrap--bg.is-active");
  if (checkOpenModal.length > 0) {
    checkOpenModal.forEach((modalEl) => {
      if (modalEl.classList.contains("type-full") && modalEl.style.display === "block") {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
  }
});
const setCls = (el, cls, type) => {
  type !== "remove" ? el.classList.add(cls) : el.classList.remove(cls);
};
const getNextSibling = (el) => {
  if (!el || !el.parentElement) return null;
  return el.nextElementSibling;
};
const tabMenu = (el, type) => {
  document.querySelectorAll(el).forEach((wrap) => {
    const tabList = wrap.querySelectorAll(".tab__menu li a");
    const tabContents = wrap.querySelectorAll(".tab__content");
    if (!tabList.length || !tabContents.length) return;
    if (tabList.length !== tabContents.length) return;
    if (wrap.classList.contains("align-center")) {
      let tabItemsCount = tabList.length;
      wrap.style.setProperty("--tab-count", tabItemsCount);
    }
    tabList.forEach((list, index) => {
      list.addEventListener("click", (event) => {
        var _a, _b, _c;
        event.preventDefault();
        (_a = wrap.querySelector(".tab__menu li.is-active")) == null ? void 0 : _a.classList.remove("is-active");
        list.parentElement.classList.add("is-active");
        {
          (_b = wrap.querySelector(".tab__content.is-active")) == null ? void 0 : _b.classList.remove("is-active");
          (_c = tabContents[index]) == null ? void 0 : _c.classList.add("is-active");
        }
      }, { once: false });
    });
  });
};
const accordion = (selector) => {
  if (!selector) {
    return;
  }
  const accWraps = document.querySelectorAll(selector);
  accWraps.forEach((acc) => {
    const accButtons = acc.querySelectorAll(".accordion-title button");
    accButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const currentItem = button.closest("li");
        const activeItem = acc.querySelector("li.is-active");
        if (activeItem && activeItem !== currentItem) {
          activeItem.classList.remove("is-active");
        }
        currentItem.classList.toggle("is-active");
      });
    });
  });
};
const mainNavigation = (selector) => {
  const navyLists = document.querySelectorAll(selector);
  if (!navyLists) {
    return;
  }
  navyLists.forEach((navy) => {
    navy.addEventListener("click", () => {
      const activeMenu = document.querySelector(".navy-list > li.is-active");
      if (activeMenu) {
        activeMenu.classList.remove("is-active");
      }
      if (navy.classList.contains("type-full") && navy.nextElementSibling) {
        if (!navy.closest(".header__wrap").classList.contains("is-active")) {
          navy.closest(".header__wrap").classList.add("is-active");
        }
        navy.parentElement.classList.add("is-active");
        const subMenu = navy.parentElement.querySelector(".gnb-sub__wrap");
        let subMenuHeight = subMenu ? subMenu.scrollHeight : 0;
        navy.closest(".header__wrap").style.setProperty("--gnb-bg-height", `${subMenuHeight}px`);
        console.log(subMenuHeight);
      } else {
        if (navy.closest(".header__wrap").classList.contains("is-active")) {
          navy.closest(".header__wrap").classList.remove("is-active");
        }
        navy.parentElement.style.position = "relative";
        navy.parentElement.classList.add("is-active");
      }
    });
  });
};
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
setTimeout(() => {
  mainNavigation(".navy-list > li > a");
}, 100);
document.addEventListener("DOMContentLoaded", async () => {
  await loadIncludedHTML();
  await loadIaData();
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
export {
  accordion as a,
  checkInputFocus as c,
  dropdownMenu as d,
  tabMenu as t
};

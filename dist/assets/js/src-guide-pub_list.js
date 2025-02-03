import "./main.js";
/* empty css      */
fetch("/ia.json").then((response) => {
  if (!response.ok) {
    throw new Error("연결 오류: " + response.statusText);
  }
  return response.json();
}).then((data) => {
  const menuList = document.getElementById("menuList");
  if (!menuList) {
    console.error("menuList 요소를 찾을 수 없습니다.");
    return;
  }
  const menusLists = data.IaList;
  if (!Array.isArray(menusLists)) {
    console.error("IaList가 배열이 아닙니다.");
    return;
  }
  menusLists.forEach((item) => {
    const quickMove = document.querySelector("#quickMove");
    const comboOption = document.createElement("option");
    const optionName = item.Level1;
    comboOption.textContent = optionName;
    comboOption.setAttribute("value", item.id);
    quickMove.appendChild(comboOption);
    const dt = document.createElement("dt");
    dt.textContent = item.Level1 || "제목 없음";
    dt.setAttribute("id", item.id || "");
    menuList.appendChild(dt);
    const level2Menus = item.Level2;
    if (!Array.isArray(level2Menus)) {
      console.warn(`Level2 데이터가 배열이 아닙니다: ${item.Level2}`);
      return;
    }
    quickMove.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      if (selectedValue) {
        const guideElement = document.querySelector(`#menuList dt[id="${selectedValue}"]`);
        if (guideElement) {
          guideElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
    level2Menus.forEach((menu, index) => {
      const dd = document.createElement("dd");
      dd.classList.add(`menu-item-${index}`);
      const menuTitle = document.createElement("h3");
      const menuLink = document.createElement("a");
      menuLink.textContent = menu.name || "이름 없음";
      menuLink.setAttribute("href", `${menu.path}${menu.fileName}`);
      menuTitle.appendChild(menuLink);
      const menuInfo = document.createElement("div");
      menuInfo.classList.add("menu-info");
      const infoTemplate = `
                        <span>Screen ID: ${menu.screenId || "-"}</span> | 
                        <span>File Name: ${menu.fileName || "-"}</span>
                    `;
      if (menu.visible === "hidden") {
        dd.classList.add("hidden");
      }
      menuInfo.innerHTML = infoTemplate;
      dd.appendChild(menuTitle);
      dd.appendChild(menuInfo);
      menuList.appendChild(dd);
    });
  });
}).catch((error) => {
  console.error("오류:", error);
  const menuList = document.getElementById("menuList");
  if (menuList) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "메뉴를 불러오는 중 오류가 발생했습니다.";
    errorMsg.style.color = "red";
    menuList.appendChild(errorMsg);
  }
});

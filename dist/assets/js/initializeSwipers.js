function initializeSwipers(optionsArray) {
  const swipers = document.querySelectorAll(".swiper");
  swipers.forEach((swiper, index) => {
    swiper.dataset.pagination || `.swiper-pagination-${index}`;
    const autoplay = swiper.dataset.autoplay === "true";
    let paginationEl = swiper.querySelector(".swiper-pagination");
    if (paginationEl) {
      paginationEl.classList.add(`swiper-pagination-${index}`);
    }
    new Swiper(swiper, {
      pagination: {
        el: paginationEl
      },
      autoplay: autoplay ? { delay: 3e3 } : false,
      ...optionsArray[index]
      // 인덱스에 따라 옵션 적용
    });
  });
}
export {
  initializeSwipers as i
};

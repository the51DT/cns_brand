export function initializeSwipers(optionsArray) {
    const swipers = document.querySelectorAll('.swiper');

    // Swiper 요소를 순회하며 초기화
    swipers.forEach((swiper, index) => {
        const paginationSelector = swiper.dataset.pagination || `.swiper-pagination-${index}`;
        const autoplay = swiper.dataset.autoplay === 'true';

        // Pagination 요소에 고유 클래스 추가
        let paginationEl = swiper.querySelector('.swiper-pagination');
        if (paginationEl) {
            paginationEl.classList.add(`swiper-pagination-${index}`);
        }

        // Swiper 초기화
        new Swiper(swiper, {
            pagination: {
                el: paginationEl,
            },
            autoplay: autoplay ? { delay: 3000 } : false,
            ...optionsArray[index], // 인덱스에 따라 옵션 적용
        });
    });
}
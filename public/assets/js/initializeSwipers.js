function initializeSwipers(optionsArray, target) {
    let swipers = document.querySelectorAll('.swiper');
    if(target) {
        swipers = document.querySelectorAll(target);
    }
    console.log("🧩 Found swiper elements:", swipers.length);
    // Swiper 요소를 순회하며 초기화
    swipers.forEach((swiper, index) => {
        const paginationSelector = swiper.dataset.pagination || `.swiper-pagination-${index}`;
        console.log(`➡️ Swiper #${index} - paginationSelector:`, paginationSelector);
        const autoplay = swiper.dataset.autoplay === 'true';
        console.log(`➡️ Swiper #${index} - autoplay:`, autoplay);
        console.log("📦 optionsArray:", optionsArray);
        // Pagination 요소에 고유 클래스 추가
        let paginationEl = swiper.querySelector('.swiper-pagination');
        console.log(`🌀 Swiper #${index} - paginationEl found:`, !!paginationEl);
        
        if (paginationEl) {
            paginationEl.classList.add(`swiper-pagination-${index}`);
        }

        const baseOptions = optionsArray[index] || {};
        const mergedPagination = {
            ...(baseOptions.pagination || {}),
            el: paginationEl,
        };
        const mergedOptions = {
            ...baseOptions,
            pagination: mergedPagination,
            autoplay: autoplay ? { delay: 3000 } : false,
        };
        console.log(`🚀 Initializing Swiper #${index} with options:`, mergedOptions);
        new Swiper(swiper, mergedOptions);
    });
}
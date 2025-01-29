import "./main.js";
/* empty css      */
import { i as initializeSwipers } from "./initializeSwipers.js";
const swiperOptions = [
  { loop: true, speed: 500, slidesPerView: "auto" },
  // 첫 번째 Swiper 옵션
  { loop: false, autoplay: { delay: 4e3 } }
  // 두 번째 Swiper 옵션
];
initializeSwipers(swiperOptions);

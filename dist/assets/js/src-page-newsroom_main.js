import { t as tabMenu, a as accordion } from "./main.js";
import { i as initializeSwipers } from "./initializeSwipers.js";
tabMenu(".basic-type");
accordion(".open-type");
const swiperOptions = [
  { loop: true, speed: 500, slidesPerView: "auto" }
];
initializeSwipers(swiperOptions);

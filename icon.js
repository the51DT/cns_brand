import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import * as sass from 'sass';
import chokidar from 'chokidar';

// ES Module에서 __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 파일 경로 설정
const scssFilePath = join(__dirname, 'src/assets/css/icon.scss'); // SCSS 파일 위치
const tempCssPath = join(__dirname, 'public', 'temp-icons.css'); // 변환된 CSS 임시 파일
const jsonOutputPath = join(__dirname, 'public', 'icon.json'); // JSON 파일 위치

/**
 * 1️⃣ SCSS → CSS 변환 및 `temp-icons.css` 저장
 */
function compileScssToCss() {
    try {
        if (!fs.existsSync(scssFilePath)) {
            console.error("🚨 오류: SCSS 파일이 존재하지 않습니다!", scssFilePath);
            return;
        }

        const result = sass.compile(scssFilePath);
        const cssContent = result.css.toString();

        // public 폴더 생성 (없으면 자동 생성)
        if (!fs.existsSync('public')) {
            fs.mkdirSync('public', { recursive: true });
        }

        // 변환된 CSS 저장
        fs.writeFileSync(tempCssPath, cssContent);
        console.log("✅ SCSS 변환 완료 → temp-icons.css 생성");
    } catch (error) {
        console.error("🚨 SCSS 변환 오류:", error);
    }
}

/**
 * 2️⃣ `temp-icons.css`에서 `.icon-` 클래스를 추출하여 JSON 변환
 */
function extractIconsFromCss() {
    try {
        if (!fs.existsSync(tempCssPath)) {
            console.error("🚨 오류: temp-icons.css 파일이 존재하지 않습니다.");
            return;
        }

        const cssContent = fs.readFileSync(tempCssPath, 'utf-8');

        // `.icon-` 또는 `.icon_` 으로 시작하는 클래스명을 추출하는 정규식
        const regex = /\.icon[-_]([\w-_]+)/g;
        const matches = [...cssContent.matchAll(regex)];
        const iconClasses = matches.map(match => `icon-${match[1]}`); // `icon-` 접두사 유지

        // 중복 제거 후 JSON 변환
        const uniqueIcons = [...new Set(iconClasses)];
        const iconJson = { icons: uniqueIcons };

        fs.writeFileSync(jsonOutputPath, JSON.stringify(iconJson, null, 2));
        console.log(`✅ temp-icons.css에서 ${uniqueIcons.length}개 아이콘 추출 완료 → icon.json 생성`);

        // `temp-icons.css` 삭제 (불필요한 파일 제거)
        fs.unlink(tempCssPath, err => {
            if (err) {
                console.error("🚨 temp-icons.css 삭제 오류:", err);
            } else {
                console.log(`🗑️ temp-icons.css 삭제 완료!`);
            }
        });
    } catch (error) {
        console.error("🚨 temp-icons.css에서 아이콘 클래스 추출 오류:", error);
    }
}

/**
 * 3️⃣ SCSS 변경 감지 후 자동 JSON 변환
 */
console.log('👀 icon.scss 변경 감지 중...');
chokidar.watch(scssFilePath).on('change', () => {
    console.log(`🛠 SCSS 파일 변경 감지됨 → icon.json 업데이트 중...`);
    compileScssToCss();
    extractIconsFromCss();
});

// 서버 실행 시 한 번 실행
compileScssToCss();
extractIconsFromCss();
// transform.js
import fs from 'fs/promises';

/**
 * CSS 변수 생성 함수
 * @param {string} prefix - 변수 접두사
 * @param {object} data - JSON 데이터 객체
 * @returns {string} - CSS 변수 문자열
 */
const generateCSSVariables = (prefix, data) => {
    let css = '';
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (typeof value === 'object' && value !== null) {
                // 재귀적으로 하위 객체 처리
                css += generateCSSVariables(`${prefix}-${key}`, value);
            } else {
                // CSS 변수 이름 생성 (kebab-case)
                const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                const variableName = `--${prefix}-${kebabKey}`;
                css += `    ${variableName}: ${value};\n`;
            }
        }
    }
    return css;
};

(async () => {
    try {
        // 1. JSON 파일 읽기 (lgcns_tokens.json)
        const jsonString = await fs.readFile('lgcns_tokens.json', 'utf8');
        
        // 2. 첫 번째 파싱: JSON 문자열 내의 이스케이프 문자 제거
        const parsedString = JSON.parse(jsonString);
        
        // 3. 두 번째 파싱: 실제 JSON 객체로 변환
        const jsonData = JSON.parse(parsedString);
        
        // 4. 변환된 JSON 객체를 output.json 파일로 저장 (Pretty-Print)
        await fs.writeFile('output.json', JSON.stringify(jsonData, null, 4), 'utf8');
        console.log('JSON 객체가 output.json 파일로 성공적으로 생성되었습니다.');
        
        // 5. output.json 파일 읽기
        const outputDataString = await fs.readFile('output.json', 'utf8');
        const outputData = JSON.parse(outputDataString);
        
        // 6. CSS 변수 생성
        let cssRoot = `:root {\n`;
        
        // Typography - Mobile and Desktop
        if (outputData.typo) {
            const typographyKeys = Object.keys(outputData.typo);
            typographyKeys.forEach(key => {
                cssRoot += generateCSSVariables(`typo-${key}`, outputData.typo[key]);
            });
        }
        
        // Color Global
        if (outputData.colorGL) {
            const colorGlobalKeys = Object.keys(outputData.colorGL);
            colorGlobalKeys.forEach(key => {
                cssRoot += generateCSSVariables(`colorGL-${key}`, outputData.colorGL[key]);
            });
        }
        
        // Color Common
        if (outputData.colorCM) {
            const colorCommonKeys = Object.keys(outputData.colorCM);
            colorCommonKeys.forEach(key => {
                cssRoot += generateCSSVariables(`colorCM-${key}`, outputData.colorCM[key]);
            });
        }
        
        cssRoot += `}\n`;
        
        // 7. variables.css 파일로 저장
        await fs.writeFile('./src/assets/css/variables.css', cssRoot, 'utf8');
        console.log('CSS 변수가 variables.css 파일로 성공적으로 생성되었습니다.');
    } catch (error) {
        console.error('오류 발생:', error);
    }
})();
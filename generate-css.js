// transform.js
import fs from 'fs/promises';

const generateCSSVariables = (prefix, data) => {
    let css = '';
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (typeof value === 'object' && value !== null) {
                css += generateCSSVariables(`${prefix}-${key}`, value);
            } else {
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
        const jsonString = await fs.readFile('lgcns_tokens.json', 'utf8');
        const parsedString = JSON.parse(jsonString);
        const jsonData = JSON.parse(parsedString);

        let cssRoot = `:root {\n`;

        if (jsonData.typography) {
            const typographyKeys = Object.keys(jsonData.typography);
            typographyKeys.forEach(key => {
                cssRoot += generateCSSVariables(`typography-${key}`, jsonData.typography[key]);
            });
        }

        if (jsonData.colorGlobal) {
            const colorGlobalKeys = Object.keys(jsonData.colorGlobal);
            colorGlobalKeys.forEach(key => {
                cssRoot += generateCSSVariables(`color-global-${key}`, jsonData.colorGlobal[key]);
            });
        }

        if (jsonData.colorCommon) {
            const colorCommonKeys = Object.keys(jsonData.colorCommon);
            colorCommonKeys.forEach(key => {
                cssRoot += generateCSSVariables(`color-common-${key}`, jsonData.colorCommon[key]);
            });
        }

        cssRoot += `}\n`;

        await fs.writeFile('./src/assets/css/variables.css', cssRoot, 'utf8');
        console.log('CSS 변수가 variables.css 파일로 성공적으로 생성되었습니다.');
    } catch (error) {
        console.error('오류 발생:', error);
    }
})();
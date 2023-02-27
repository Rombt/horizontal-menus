import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const prodFolder = './dist';
const srcFolder = './src';

export const path = {
    prod: {
        js: `${prodFolder}/js/`,
        styles: `${prodFolder}/styles/`,
        php: `${prodFolder}/`,
        images: `${prodFolder}/img/`,
        fonts: `${prodFolder}/fonts/`,
        files: `${prodFolder}/files/`,
        svgicons: `${srcFolder}/img/`,        // так же как и файлы шрифтов иканки генерируются только один раз, но переносить их нужно при каждой сборкой
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`, // добавить форматы при необходимости
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/styles/style.scss`,
        less: `${srcFolder}/styles/style.less`,
        php: `${srcFolder}/*.php`, // копирую только итоговые файлы которые будут собираться гампом из частей предназначено для HTML!
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        styles: `${srcFolder}/styles/**/*.{scss,less}`,
        php: `${srcFolder}/**/*.php`, // слежу за всеми 
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/files/**/*.*`
    },
    clean: prodFolder,
    prodFolder: prodFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: 'htdocs',        // указать целевую папку на сервере, есле её нет то она будет создана автоматически, пусто -- корневая папка сервера
}
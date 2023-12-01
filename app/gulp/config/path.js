import * as nodePath from 'path';

const THEME_NAME = nodePath.basename(nodePath.resolve(__dirname, '..', '..', '..'));
const ROOT_PATH = nodePath.resolve(__dirname, '..', '..').replace(/\\/g, '/');

const srcFolder = `${ROOT_PATH}/src`;
const prodFolder = `${ROOT_PATH}/..`;
const wpPluginPath = `${ROOT_PATH}/../../../plugins/${THEME_NAME}-core`;



export const path = {
   prod: {
      wpPlugin: wpPluginPath,
      html: `${prodFolder}/docs`,
      styles: `${prodFolder}/docs`,
      images: [
         `${prodFolder}/assets/img`,
         `${wpPluginPath}/assets/img`
      ]
      // images: `${prodFolder}`,

   },
   src: {
      less: `${srcFolder}/assets/styles/main-style.less`,
      scss: `${srcFolder}/assets/styles/main-style.scss`,
      html: `${srcFolder}/html/*.html`,
      php: [
         `${srcFolder}/**/*.php`,
         `!${srcFolder}/core-plugin/**/*.php`
      ],
      wpPlugin: `${srcFolder}/core-plugin/**/*.php`,
      copy: [
         `${srcFolder}/README.md`,
         `${srcFolder}/style.css`,
         `${srcFolder}/screenshot.png`,
      ],

      // images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
      // imagesPlugin: `${srcFolder}/core-plugin/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,

      images: [
         `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`,
         `${srcFolder}/core-plugin/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`
      ],

      svg: [
         `${srcFolder}/assets/img/**/*.svg`,
         `${srcFolder}/core-plugin/assets/img/**/*.svg`
      ],
   },
   watch: {
      styles: `${srcFolder}/**/*.{scss,less}`,
      images: [
         `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
         `${srcFolder}/core-plugin/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`
      ],
   },


   ThemeName: THEME_NAME,
   RootPath: ROOT_PATH,
   srcFolder: srcFolder,
   prodFolder: prodFolder,
   wpPluginPath: wpPluginPath,
}
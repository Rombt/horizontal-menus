import * as nodePath from 'path';


const THEME_NAME = nodePath.basename(nodePath.resolve(__dirname, '..', '..', '..'));
const ROOT_PATH = nodePath.resolve(__dirname, '..', '..');

const srcFolder = nodePath.resolve(ROOT_PATH, 'src');
const prodFolder = nodePath.resolve(ROOT_PATH, '..');
const wpPluginPath = nodePath.resolve(ROOT_PATH, '..', '..', '..', `plugins/${THEME_NAME}-core`,);



export const path = {
   prod: {
      wpPlugin: wpPluginPath,
      html: `${prodFolder}/docs`,
      styles: `${prodFolder}/docs`,

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
         `${srcFolder}/.gitignore`,
      ],
   },
   watch: {

   },


   ThemeName: THEME_NAME,
   RootPath: ROOT_PATH,
   srcFolder: srcFolder,
   prodFolder: prodFolder,
   wpPluginPath: wpPluginPath,
}
import * as nodePath from 'path';

const THEME_NAME = nodePath.basename(nodePath.resolve(__dirname, '..', '..', '..'));
const ROOT_PATH = nodePath.resolve(__dirname, '..', '..').replace(/\\/g, '/');

const srcFolder = `${ROOT_PATH}/src`;
const prodFolder = `${ROOT_PATH}/..`;
const wpPluginPath = `${ROOT_PATH}/../../../plugins/${THEME_NAME}-core`;



export const path = {
   prod: {
      wpPlugin: wpPluginPath,    // todo убрать т.к. есть wpPluginPath: wpPluginPath, в самом низу
      html: `${prodFolder}/docs`,
      stylesPhp: [
         `${prodFolder}/assets/styles`,
         `${wpPluginPath}/assets/styles`
      ],
      stylesHtml: `${prodFolder}/docs/assets/styles`,
      imgPhp: [
         `${prodFolder}/assets/img`,
         `${wpPluginPath}/assets/img`
      ],
      imgHtml: `${prodFolder}/docs/assets/img`,
      svg: [
         `${srcFolder}/assets/img/icons`,
         `${srcFolder}/core-plugin/assets/img/icons`
      ],
      svg1: [
         `${prodFolder}/assets/img/icons`,
         `${wpPluginPath}/assets/img/icons`
      ],
      fontPhp: [
         `${prodFolder}/assets/fonts`,
         `${wpPluginPath}/assets/fonts`
      ],
      fontHtml: `${prodFolder}/docs/assets/fonts`,
      js: {
         app: `${prodFolder}/assets/js/`,
         html: `${prodFolder}/docs/assets/js/`,
         admin: `${wpPluginPath}/assets/js/`,
      },
   },
   src: {
      styles: [
         `${srcFolder}/assets/styles/main-style`,
         `${srcFolder}/core-plugin/assets/styles/main-style`,
      ],
      html: `${srcFolder}/html/*.html`,
      js: [
         `${srcFolder}/assets/js/app.js`,
         `${srcFolder}/core-plugin/assets/js/admin.js`
      ],
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
      images: [
         `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`,
         `${srcFolder}/core-plugin/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`
      ],
      fonts: `${srcFolder}/assets/fonts`,
      fontsPlugin: `${srcFolder}/core-plugin/assets/fonts`,
      svg: [
         `${srcFolder}/assets/img/svg/*.svg`,
         `${srcFolder}/core-plugin/assets/img/svg/*.svg`
      ],
   },
   watch: {
      styles: [
         `${srcFolder}/assets/styles/**/*.less`,
         `${srcFolder}/assets/styles/**/*.scss`,
         `${srcFolder}/core-plugin/assets/styles/**/*.less`,
      ],
      images: [
         `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
         `${srcFolder}/core-plugin/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`
      ],
      js: [
         `${srcFolder}/assets/js/**/*.js`,
         `${srcFolder}/core-plugin/assets/js/**/*.js`
      ],
   },
   get clearHtml() {
      return [
         `${this.prod.html}/**/*.*`,
         `!${this.prod.html}/.gitkeep`
      ];
   },
   get clearWP() {
      return [
         `${this.prodFolder}/**/*.*`,
         `!${this.prodFolder}/app/**/*.*`,
         `!${this.prodFolder}/.git/**/*.*`,
         `!${this.prodFolder}/.gitignore/**/*.*`,
         `!${this.prodFolder}/docs/**/*.*`,
         `!${this.prodFolder}/${this.ThemeName}_core.zip`,
         `!${this.prodFolder}/${this.ThemeName}_wp.zip`,
         `!${this.prodFolder}/${this.ThemeName}_html.zip`
      ]
   },
   get clearPL() {
      return [
         `${this.wpPluginPath}/**/*.*`,
      ]
   },

   ThemeName: THEME_NAME,
   RootPath: ROOT_PATH,
   srcFolder: srcFolder,
   prodFolder: prodFolder,
   wpPluginPath: wpPluginPath,
   ftpHtml: 'htdocs',
   ftpWp: 'htdocs/wp-content/themes',
   ftpPl: 'htdocs/wp-content/plugins',

}




export const getDestPath = (file, appPathProdArr) => {
   const isCorePlugin = (file) => file.path.includes('core-plugin') || file.path.includes('-core');
   return isCorePlugin(file) ? appPathProdArr[1] : appPathProdArr[0];
};
import * as nodePath from 'path';

const THEME_NAME = nodePath.basename(nodePath.resolve(__dirname, '..', '..', '..'));
const ROOT_PATH = nodePath.resolve(__dirname, '..', '..').replace(/\\/g, '/');

const srcFolder = `${ROOT_PATH}/src`;
const prodFolder = `${ROOT_PATH}/..`;
const PlugFolder = `${ROOT_PATH}/../../../plugins/${THEME_NAME}-core`;

export const _path = {

   ThemeName: THEME_NAME,
   RootPath: ROOT_PATH,

   prod: {
      html: `${prodFolder}/docs`,
      php: `${prodFolder}`,
      plug: PlugFolder,
   },

   src: {
      html: `${srcFolder}/html`,
      php: `${srcFolder}`,
      plug: `${srcFolder}/core-plugin`,
   },

   get watch() {
      return {
         styles: [
            `${this.src.php}/assets/styles/**/*.less`,
            `${this.src.php}/assets/styles/**/*.scss`,
            `${this.src.php}/core-plugin/assets/styles/**/*.less`,
         ],
         images: [
            `${this.src.php}/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
            `${this.src.php}/core-plugin/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`
         ],
         js: [
            `${this.src.php}/assets/js/**/*.js`,
            `${this.src.php}/core-plugin/assets/js/**/*.js`
         ],
         php: [
            `${this.src.php}/**/*.{php,html}`,
            `${this.src.php}/core-plugin/**/*.{php,html}`
         ],
      }
   },

   get php() {
      const path = {
         src: {
            html: [
               `${this.src.html}/*.html`,
            ],
            php: [
               `${this.src.php}/**/*.php`,
               `!${this.src.php}/core-plugin/**/*.php`,
            ],
            plug: `${this.src.php}/core-plugin/**/*.php`,
         },
         prod: {
            html: `${this.prod.html}`,
            php: `${this.prod.php}`,
            plug: `${this.prod.plug}`,
         }
      };

      return {
         pathSrc: (app.isWP && app.forPlugin)
            ? [...path.src.php, path.src.plug]
            : (app.isWP ? path.src.php : (app.forPlugin ? path.src.plug : path.src.html)),
         pathDist: (app.isWP && app.forPlugin)
            ? [path.prod.php, path.prod.plug]
            : (app.isWP ? path.prod.php : (app.forPlugin ? path.prod.plug : path.prod.html)),
      };
   },

   get styles() {
      const path = {
         src: {
            php: `${this.src.php}/assets/styles/main-style${app.isSASS ? '.sass' : '.less'}`,
            plug: `${this.src.plug}/assets/styles/main-style${app.isSASS ? '.sass' : '.less'}`,
         },
         prod: {
            php: [
               `${this.prod.php}/assets/styles`,
               `${this.prod.plug}/assets/styles`,
            ],
            html: `${this.prod.html}/assets/styles`,
         }
      };

      return {
         pathSrc: app.isWP ? path.src : path.src.php,
         pathDist: app.isWP ? path.prod.php : path.prod.html,
      };
   },

   get images() {
      const path = {
         src: {
            php: `${this.src.php}/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`,
            plug: `${this.src.plug}/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`,
         },
         prod: {
            php: [
               `${this.prod.php}/assets/img`,
               `${this.prod.plug}/assets/img`,
            ],
            html: `${this.prod.html}/assets/img`,
         }
      };

      return {
         pathSrc: app.isWP ? path.src : path.src.php,
         pathDist: app.isWP ? path.prod.php : path.prod.html,
      }
   },

   get svg() {
      const path = {
         src: {
            php: `${this.src.php}/assets/img/svg/*.svg`,
            plug: `${this.src.plug}/assets/img/svg/*.svg`,
         },
         prod: {
            php: [
               `${this.prod.php}/assets/img/icons`,
               `${this.prod.plug}/assets/img/icons`,
            ],
            html: `${this.prod.html}/assets/img/icons`,
         }
      };

      return {
         pathSrc: app.isWP ? path.src : path.src.php,
         pathDist: app.isWP ? path.prod.php : path.prod.html,
      }
   },

   get fonts() {
      const path = {
         src: {
            php: `${this.src.php}/assets/fonts`,
            plug: `${this.src.plug}/assets/fonts`,
         },
         prod: {
            php: [
               `${this.prod.php}/assets/fonts`,
               `${this.prod.plug}/assets/fonts`,
            ],
            html: `${this.prod.html}/assets/fonts`,
         }
      };

      return {
         pathSrc: app.isWP ? path.src : path.src.php,
         pathDist: app.isWP ? path.prod.php : path.prod.html,
      }
   },

   get js() {
      const path = {
         src: {
            php: `${this.src.php}/assets/js/app.js`,
            plug: `${this.src.plug}/assets/js/admin.js`,
         },
         prod: {
            php: [
               `${this.prod.php}/assets/js`,
               `${this.prod.plug}/assets/js`,
            ],
            html: `${this.prod.html}/assets/js`,
         }
      };

      return {
         pathSrc: app.isWP ? path.src : path.src.php,
         pathDist: app.isWP ? path.prod.php : path.prod.html,
      }
   },

   get copy() {
      const path = {
         src: {
            php: [
               `${srcFolder}/README.md`,
               `${srcFolder}/style.css`,
               `${srcFolder}/screenshot.png`,
            ],
            plug: [
               `${srcFolder}/core-plugin/README.md`,
            ],
         },
         prod: {
            php: [
               `${this.prod.php}`,
               `${this.prod.plug}`,
            ],
            html: `${this.prod.html}`,
         }
      };

      return {
         pathSrc: app.isWP ? path.src : path.src.php,
         pathDist: app.isWP ? path.prod : path.prod.html,
      }
   },

   get ftp() {
      const path = {
         prod: {
            html: 'htdocs',
            php: 'htdocs/wp-content/themes',
            plug: 'htdocs/wp-content/plugins',
         }
      };

      return {
         pathSrc: this.clear,
         pathDist: (app.isWP && app.forPlugin)
            ? [path.prod.php, path.prod.plug]
            : (app.isWP ? path.prod.php : (app.forPlugin ? path.prod.plug : path.prod.html)),
      };
   },

   get clear() {
      const path = {
         html: [
            `${this.prod.html}/**/*.*`,
            `!${this.prod.html}/.gitkeep`
         ],
         php: [
            `${this.prod.php}/**/*.*`,
            `!${this.prod.php}/app/**/*.*`,
            `!${this.prod.php}/.git/**/*.*`,
            `!${this.prod.php}/.gitignore/**/*.*`,
            `!${this.prod.php}/docs/**/*.*`,
            `!${this.prod.php}/${this.ThemeName}_core.zip`,
            `!${this.prod.php}/${this.ThemeName}_wp.zip`,
            `!${this.prod.php}/${this.ThemeName}_html.zip`
         ],
         plug: [
            `${this.prod.plug}/**/*.*`,
         ],
      }
      return (app.isWP && app.forPlugin)
         ? [...path.php, ...path.plug]
         : (app.isWP ? path.php : (app.forPlugin ? path.plug : path.html));
   },


   selectDestPath(file, arrDestPath) {

      if (typeof arrDestPath === 'string') {
         return arrDestPath;
      }

      const isCorePlugin = (file) => file.path.includes('core-plugin') || file.path.includes('-core');
      return isCorePlugin(file) ? arrDestPath[1] : arrDestPath[0];
   }


}

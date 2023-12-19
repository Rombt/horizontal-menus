import * as nodePath from 'path';

const THEME_NAME = nodePath.basename(nodePath.resolve(__dirname, '..', '..', '..'));
const ROOT_PATH = nodePath.resolve(__dirname, '..', '..').replace(/\\/g, '/');

const srcFolder = `${ROOT_PATH}/src`;
const prodFolder = `${ROOT_PATH}/..`;
const PlugFolder = `${ROOT_PATH}/../../../plugins/${THEME_NAME}-core`;



export const path = {

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
         src: (app.isWP && app.forPlugin)
            ? [...path.src.php, path.src.plug]
            : (app.isWP ? path.src.php : (app.forPlugin ? path.src.plug : path.src.html)),
         dest: (app.isWP && app.forPlugin)
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
         src: app.isWP ? path.src : path.src.php,
         dest: app.isWP ? path.prod.php : path.prod.html,
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
         src: app.isWP ? path.src : path.src.php,
         dest: app.isWP ? path.prod.php : path.prod.html,
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
         src: app.isWP ? path.src : path.src.php,
         dest: app.isWP ? path.prod.php : path.prod.html,
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
         src: app.isWP ? path.src : path.src.php,
         dest: app.isWP ? path.prod.php : path.prod.html,
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
         src: app.isWP ? path.src : path.src.php,
         dest: app.isWP ? path.prod.php : path.prod.html,
      }
   },

   get copy() {
      const path = {
         src: {
            html: [
               `${this.src.html}/22.text`,
            ],
            php: [
               `${this.src.php}/README.md`,
               `${this.src.php}/style.css`,
               `${this.src.php}/screenshot.png`,
            ],
            plug: [
               `${this.src.php}/core-plugin/README.md`,
            ],
         },
         prod: {
            php: [
               `${this.prod.php}`,
               `${this.prod.plug}`,
            ],
            html: `${this.prod.html}`,
         },

      };

      return {
         src: (app.isWP && app.forPlugin)
            ? [...path.src.php, ...path.src.plug]
            : (app.isWP ? path.src.php : (app.forPlugin ? path.src.plug : path.src.html)),
         dest: app.isWP ? path.prod.php : path.prod.html,
         clear: (app.isWP && app.forPlugin)
            ? this.ClearForTask([path.src.php, path.src.plug], ['php', 'plug'])
            : (app.isWP
               ? this.ClearForTask(path.src.php)
               : (app.forPlugin ? this.ClearForTask(path.src.plug, 'plug') : this.ClearForTask(path.src.html, 'html')
               )
            ),
      }
   },


   ClearForTask(path, sub = 'php') {

      if ((Array.isArray(path) && path.length === 0) || (typeof path === 'string' && path.length === 0)) {
         console.log("app.path.copy.src is empty");
         return false;
      }

      return typeof path === 'string'
         ? path.replace(this.src[sub], this.prod[sub])
         : path.map((item, index) =>
            Array.isArray(item)
               ? item.map(itemSecondLevel => itemSecondLevel.replace(this.src[sub[index]], this.prod[sub[index]]))
               : item.replace(this.src[sub], this.prod[sub])
         ).reduce((acc, curr) => acc.concat(curr), []);
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
         src: this.clear,
         dest: (app.isWP && app.forPlugin)
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

   selectSrcPath(path) {

      if ((Array.isArray(path) && path.length === 0) || (typeof path === 'string' && path.length === 0)) {
         console.log("app.path.copy.src is empty");
         return false;
      }

      // something 


   },

   selectDestPath(file, arrDestPath) {

      if (typeof arrDestPath === 'string') {
         return arrDestPath;
      } else if (arrDestPath.length === 0) {
         console.log("Path of destination is empty!!!");
         return file.path;
      }

      const isCorePlugin = (file) => file.path.includes('core-plugin') || file.path.includes('-core');
      return isCorePlugin(file) ? arrDestPath[1] : arrDestPath[0];
   },





   //--------  неспользуемые но рабочие  --------------
   objClearForTask(path) { // сохранить!!


      function modifyArray(array) {
         return array.map(item => item.replace(this.src.php, this.prod.php));
      }
      let bound_ModifyArray = modifyArray.bind(this);


      function processObject(obj) {
         return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => {
               if (Array.isArray(value) && value.length !== 0) {
                  return [key, bound_ModifyArray(value)];
               }
               if (typeof value === 'object' && value !== null) {
                  return [key, processObject(value)];
               }
               return [key, value];
            })
         );
      }
      return processObject(path);
   },

}
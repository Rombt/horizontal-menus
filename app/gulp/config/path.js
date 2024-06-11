import * as nodePath from 'path';

// ------- this block for compatibility as with CommonJS that and ESM   -------
import { fileURLToPath } from 'url';
let currentDir;
if (typeof __dirname !== 'undefined') {
  currentDir = __dirname;
} else {
  const __filename = fileURLToPath(import.meta.url);
  currentDir = nodePath.dirname(__filename);
}

const THEME_NAME = nodePath.basename(nodePath.resolve(currentDir, '..', '..', '..'));
const ROOT_PATH = nodePath.resolve(currentDir, '..', '..').replace(/\\/g, '/');

const srcFolder = `${ROOT_PATH}/src`;
const prodFolder = `${ROOT_PATH}/..`;
const prodPluginName = `${THEME_NAME}-core`; // set name your plugin for production version
const prodPlugFolder = `${ROOT_PATH}/../../../plugins/${prodPluginName}`;

export const path = {
  ThemeName: THEME_NAME,
  srcPluginName: 'core-plugin', // set name your plugin for development version
  RootPath: ROOT_PATH,
  proxy: [`http://rombt/horizontal-menus`, `http://web/rombt/horizontal-menus`],

  get src() {
    return {
      html: `${srcFolder}/html`,
      php: `${srcFolder}`,
      plug: `${srcFolder}/${this.srcPluginName}`,
    };
  },

  get prod() {
    return {
      html: `${prodFolder}/docs`,
      php: `${prodFolder}`,
      plug: prodPlugFolder,
    };
  },

  get watch() {
    return {
      styles: [
        `${this.src.php}/assets/styles/**/*.less`,
        `${this.src.php}/assets/styles/**/*.scss`,
        `${this.src.php}/${this.srcPluginName}/assets/styles/**/*.less`,
      ],
      images: [
        `${this.src.php}/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        `${this.src.php}/${this.srcPluginName}/assets/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
      ],
      js: [
        `${this.src.php}/assets/js/**/*.js`,
        `${this.src.php}/${this.srcPluginName}/assets/js/**/*.js`,
      ],
      php: [
        `${this.src.php}/**/*.{php,html}`,
        `${this.src.php}/${this.srcPluginName}/**/*.{php,html}`,
      ],
      fonts: [
        `${this.src.php}/assets/fonts/**/*.{woff,woff2}`,
        `${this.src.php}/${this.srcPluginName}/assets/fonts/**/*.{woff,woff2}`,
      ],
      copy: this.copy.src,
    };
  },

  get php() {
    const path = {
      src: {
        html: [
          `${this.src.html}/*.html`,
          `!${this.src.html}/_*.html`,
          `!${this.src.html}/-*.html`,
          `${this.src.html}/test/*.html`,
        ],
        php: [
          `${this.src.php}/**/*.php`,
          `!${this.src.php}/${this.srcPluginName}/**/*.php`,
          `!${this.src.php}/**/_*.php`, // these are drafts and files which marked for delete
          `!${this.src.php}/**/-*.php`, // these are files which queued up to develope
        ],
        plug: [
          `${this.src.php}/${this.srcPluginName}/**/*.php`,
          `!${this.src.php}/${this.srcPluginName}/**/_*.php`,
          `!${this.src.php}/${this.srcPluginName}/**/-*.php`,
        ],
      },
      prod: {
        html: `${this.prod.html}`,
        php: `${this.prod.php}`,
        plug: `${this.prod.plug}`,
      },
    };

    return this.resolvDest(path);
  },

  get styles() {
    const path = {
      src: {
        html: [
          `${this.src.php}/assets/styles/main-style${app.isSASS ? '.sass' : '.less'}`, //! null element of array will use for generate styles file of fonts
        ],
        php: [
          `${this.src.php}/assets/styles/main-style${app.isSASS ? '.sass' : '.less'}`,
        ],
        plug: [
          `${this.src.plug}/assets/styles/main-style${app.isSASS ? '.sass' : '.less'}`,
        ],
      },
      prod: {
        html: `${this.prod.html}/assets/styles`,
        php: `${this.prod.php}/assets/styles`,
        plug: `${this.prod.plug}/assets/styles`,
      },
    };

    return this.resolvDest(path);
  },

  get images() {
    const path = {
      src: {
        html: [`${this.src.php}/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`],
        php: [`${this.src.php}/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`],
        plug: [`${this.src.plug}/assets/img/**/*.{jpg,jpeg,png,gif,webp,ico}`],
      },
      prod: {
        html: `${this.prod.html}/assets/img`,
        php: `${this.prod.php}/assets/img`,
        plug: `${this.prod.plug}/assets/img`,
      },
    };

    return this.resolvDest(path);
  },

  get svg() {
    const path = {
      src: {
        html: [`${this.src.php}/assets/img/svg/*.svg`],
        php: [`${this.src.php}/assets/img/svg/*.svg`],
        plug: [`${this.src.plug}/assets/img/svg/*.svg`],
      },
      prod: {
        html: `${this.src.php}/assets/img/icons`,
        php: `${this.src.php}/assets/img/icons`,
        plug: `${this.src.plug}/assets/img/icons`,
      },
    };

    return this.resolvDest(path);
  },

  get fonts() {
    const path = {
      src: {
        html: [`${this.src.php}/assets/fonts`],
        php: [`${this.src.php}/assets/fonts`],
        plug: [`${this.src.plug}/assets/fonts`],
      },
      prod: {
        html: `${this.prod.html}/assets/fonts`,
        php: `${this.prod.php}/assets/fonts`,
        plug: `${this.prod.plug}/assets/fonts`,
      },
    };

    return this.resolvDest(path);
  },

  get js() {
    const path = {
      src: {
        html: [`${this.src.php}/assets/js/app.js`],
        php: [`${this.src.php}/assets/js/app.js`],
        plug: [`${this.src.plug}/assets/js/admin.js`],
      },
      prod: {
        html: `${this.prod.html}/assets/js`,
        php: `${this.prod.php}/assets/js`,
        plug: `${this.prod.plug}/assets/js`,
      },
    };

    return this.resolvDest(path);
  },

  get copy() {
    const path = {
      src: {
        html: [
          `${this.src.html}/for_test.txt`,
          `${this.src.html}/*.txt`,
          `${this.src.php}/assets/styles/libs/**/*.*`,
          `${this.src.php}/assets/js/libs/**/*.*`,
        ],
        php: [
          `${this.src.php}/README.md`,
          `${this.src.php}/style.css`,
          `${this.src.php}/screenshot.png`,
          `${this.src.php}/assets/styles/libs/**/*.*`,
          `${this.src.php}/assets/js/libs/**/*.*`,
        ],
        plug: [`${this.src.php}/${this.srcPluginName}/README.md`],
      },
      prod: {
        html: `${this.prod.html}`,
        php: `${this.prod.php}`,
        plug: `${this.prod.plug}`,
      },
    };

    return this.resolvDest(path);
  },

  get ftp() {
    return {
      html: `htdocs`,
      php: `htdocs/wp-content/themes/${this.ThemeName}`,
      plug: `htdocs/wp-content/plugins/${prodPluginName}`,
    };
  },

  get clear() {
    const path = {
      src: {
        html: [`${this.prod.html}/**/*.*`, `!${this.prod.html}/.gitkeep`],
        php: [
          `${this.prod.php}/**/*.*`,
          `!${this.prod.php}/app/**/*.*`,
          `!${this.prod.php}/.git/**/*.*`,
          `!${this.prod.php}/.gitignore/**/*.*`,
          `!${this.prod.php}/docs/**/*.*`,
          `!${this.prod.php}/${this.ThemeName}_core.zip`,
          `!${this.prod.php}/${this.ThemeName}_wp.zip`,
          `!${this.prod.php}/${this.ThemeName}_html.zip`,
        ],
        plug: [`${this.prod.plug}/**/*.*`],
      },
      prod: {},
    };

    return this.resolvDest(path);
  },

  selectSrcPath(path, ext) {
    if (
      (Array.isArray(path) && path.length === 0) ||
      (typeof path === 'string' && path.length === 0)
    ) {
      console.log('app.path.copy.src is empty');
      return false;
    }

    return Array.isArray(path)
      ? path.map(el => `${el}${ext}`)
      : `${app.path.svg.dest}${ext}`;
  },

  selectDestPath(file, arrDestPath) {
    if (typeof arrDestPath === 'string') {
      return arrDestPath;
    } else if (arrDestPath.length === 0) {
      console.log('Path of destination is empty!!!');
      return file.path;
    }

    const isCorePlugin = file =>
      file.path.includes(this.srcPluginName) || file.path.includes('-core');
    return isCorePlugin(file) ? arrDestPath[1] : arrDestPath[0];
  },

  clearForTask(currentPath, destPath) {
    if (Array.isArray(destPath)) {
      destPath =
        currentPath.includes(this.srcPluginName) || currentPath.includes('-core')
          ? destPath[1]
          : destPath[0];
    }

    let lastFolder = nodePath.basename(destPath);
    let indexLastFolder = currentPath.lastIndexOf(lastFolder);

    if (indexLastFolder == -1) {
      if (currentPath.includes(nodePath.basename(this.src.html))) {
        lastFolder = nodePath.basename(this.src.html);
      } else if (currentPath.includes(this.srcPluginName)) {
        lastFolder = nodePath.basename(this.srcPluginName);
      } else {
        lastFolder = nodePath.basename(this.src.php);
      }
      indexLastFolder =
        Math.max(
          currentPath.lastIndexOf(`/${lastFolder}`),
          currentPath.lastIndexOf(`\\${lastFolder}`)
        ) + 1; // для того что бы исключить возможные совподения имени папки и расширения
    }
    let clearPath = nodePath.join(
      destPath,
      currentPath.substring(indexLastFolder + lastFolder.length)
    );

    app.plugins.del(clearPath, { force: true });
  },

  resolvDest(path) {
    return {
      src:
        app.isWP && app.forPlugin
          ? [...path.src.php, ...path.src.plug]
          : app.isWP
          ? path.src.php
          : app.forPlugin
          ? path.src.plug
          : path.src.html,
      ...(Object.keys(path.prod).length !== 0
        ? {
            dest:
              app.isWP && app.forPlugin
                ? [path.prod.php, path.prod.plug]
                : app.isWP
                ? path.prod.php
                : app.forPlugin
                ? path.prod.plug
                : path.prod.html,
          }
        : {}),
    };
  },

  //--------  неспользуемые но рабочие  --------------
  objClearForTask(path) {
    // сохранить!!

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

  old_var_clearForTask(srcPath, prodPath) {
    /**
     *   ! if srcPath hasn't file name will be returned srcPath without changes
     *
     */

    if (
      (Array.isArray(srcPath) && srcPath.length === 0) ||
      (Array.isArray(prodPath) && prodPath.length === 0)
    ) {
      console.log('The path you provided is empty');
      return false;
    }

    return srcPath
      .map((el, index) => {
        return el.map(el_2 => {
          try {
            return prodPath[index] + el_2.match(/\/([^/]+\.[a-z]+)$/i)[0];
          } catch {
            return el;
          }
        });
      })
      .reduce((acc, curr) => acc.concat(curr), []);
  },
};

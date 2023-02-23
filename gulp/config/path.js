import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = './dist';
const srcFolder = './src';

export const path = {
   build: {
      php: `${buildFolder}/`,
      files: `${buildFolder}/files/`,
   },
   src: {
      php: `${srcFolder}/*.php`,       // копирую только итоговые файлы которые будут собираться гампом из частей предназначено для HTML!
      files: `${srcFolder}/files/**/*.*`,
   },
   watch: {
      php: `${srcFolder}/**/*.php`,    // слежу за всеми 
      files: `${srcFolder}/files/**/*.*`
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder,
   ftp: '',
}
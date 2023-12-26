import plumber from "gulp-plumber"; // оброботка ошибок
import notify from "gulp-notify"; // вывод соообщений об ошибках в windows!
import newer from "gulp-newer";
import versionNumber from "gulp-version-number";
import ifPugin from "gulp-if";
import replace from "gulp-replace";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import rename from "gulp-rename";
import del from "del";
import fileInclude from "gulp-file-include";
import browsersync from "browser-sync";
import webp from "gulp-webp";
import imageMin from "gulp-imagemin";
import multiDest from "gulp-multi-dest";
import flatten from "gulp-flatten";
import tap from "gulp-tap";
import * as nodePath from 'path';
import fs from 'fs';



export const plugins = {
   plumber: plumber,
   notify: notify,
   newer: newer,
   versionNumber: versionNumber,       // в файлах php или html добавляет версию css и js файлов <link href="./styles/main-style.min.css?_v=20231127132542" rel="stylesheet" type="text/css"> 
   if: ifPugin,
   replace: replace,
   webpHtmlNosvg: webpHtmlNosvg,
   rename: rename,
   del: del,
   fileInclude: fileInclude,
   browsersync: browsersync,
   webp: webp,
   imageMin: imageMin,
   multiDest: multiDest,
   flatten: flatten,
   fs: fs,
   tap: tap,
   nodePath: nodePath,

}
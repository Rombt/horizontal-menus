import plumber from "gulp-plumber"; // оброботка ошибок
import notify from "gulp-notify"; // вывод соообщений об ошибках в windows!
import newer from "gulp-newer";
import versionNumber from "gulp-version-number";
import ifPugin from "gulp-if";
import replace from "gulp-replace";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import rename from "gulp-rename";
import del from "del";




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


   // browsersync: browsersync,
   // if: ifPugin,
   // tap: tap,
   // fs: fs,
}
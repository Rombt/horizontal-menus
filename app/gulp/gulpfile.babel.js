import gulp from "gulp";
import { path } from "./config/path.js";
import { plugins } from "./config/plugins.js";
import { copy } from "./tasks/copy.js";
// import { html } from "./tasks/html.js";
import { php } from "./tasks/php.js";
import { wpPlugin } from "./tasks/wpPlugin.js";
import { reset } from "./tasks/reset.js";
import { styles } from "./tasks/styles.js";
import { server } from "./tasks/server.js";



// todo очищать readme.md только при использовании сборки в качестве шаблона



global.app = {
   gulp: gulp,

   path: path,
   plugins: plugins,

   isProd: process.argv.includes('--prod'),
   // isDev: !process.argv.includes('--prod'),
   isWP: process.argv.includes('--wp'),
   isSASS: process.argv.includes('--sass'),
   // isHTML: !process.argv.includes('--wp'),


}


function watcher() {
   gulp.watch(path.src.copy, copy)
   gulp.watch(path.src.php, php) // для отправки файлов по ftp при каждом обновлении добавить вместо php gulp.series(php,ftp)
   gulp.watch(path.watch.styles, styles)



   // gulp.watch(path.watch.js, js)
   // gulp.watch(path.watch.images, images)


}





// const mainTasks = gulp.series(gulp.parallel(copyFonts, styles, js, images, copy), wpPlugin, listProcFiles);
const mainTasks = gulp.parallel(styles);


export const wp = gulp.series(reset, php, mainTasks, wpPlugin, copy, gulp.parallel(watcher, server));
export const html = gulp.series(reset, php, mainTasks, gulp.parallel(watcher, server));


// export const html = gulp.series(reset, html, mainTasks, gulp.parallel(watcher, server));
// export const wp = gulp.series(reset, wp, wpPlugin, copy, mainTasks, gulp.parallel(watcher, server));




// export const deployZIP = gulp.series('сначало собрать проэкт html или wp и только потом архивировать');     //!
// export const deployFTP = gulp.series('сначало собрать проэкт html или wp и только потом отправлять');    //!


// export const createFonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
// export { createSvgSprite };
// export { grid };
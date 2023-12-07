import gulp from "gulp";
import { path } from "./config/path.js";
import { plugins } from "./config/plugins.js";
import { copy } from "./tasks/copy.js";
import { php } from "./tasks/php.js";
import { wpPlugin } from "./tasks/wpPlugin.js";
import { reset } from "./tasks/reset.js";
import { styles } from "./tasks/styles.js";
import { server } from "./tasks/server.js";
import { js } from "./tasks/js.js";
import { images } from "./tasks/images.js";
import { grid } from "./tasks/grid.js";
import { otfToTtf, ttfToWoff, fontStyle, copyFonts } from "./tasks/fonts.js";
import { createSvgSprite } from "./tasks/svgsprite.js";


// import { zip } from "./gulp/tasks/zip.js";
// import { ftp } from "./gulp/tasks/ftp.js";



// todo очищать readme.md только при использовании сборки в качестве шаблона
// todo преобразавание .ico в иконочный шрифт 



global.app = {
   gulp: gulp,

   path: path,
   plugins: plugins,

   isProd: process.argv.includes('--prod'),
   // isDev: !process.argv.includes('--prod'),
   isWP: process.argv.includes('--wp'),
   forPlugin: process.argv.includes('--pl'),
   isSASS: process.argv.includes('--sass'),
   // isHTML: !process.argv.includes('--wp'),


}


function watcher() {
   gulp.watch(path.src.copy, copy)
   gulp.watch(path.src.php, php) // для отправки файлов по ftp при каждом обновлении добавить вместо php gulp.series(php,ftp)
   gulp.watch(path.watch.styles, styles)
   gulp.watch(path.watch.images, images)
   gulp.watch(path.watch.js, js)


}





// const mainTasks = gulp.series(gulp.parallel(copyFonts, styles, js, images, copy), wpPlugin, listProcFiles);

export const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
const mainTasks = gulp.series(copyFonts, gulp.parallel(styles, images, js));


export const wp = gulp.series(reset, php, mainTasks, wpPlugin, copy, gulp.parallel(watcher, server));
export const html = gulp.series(reset, php, mainTasks, gulp.parallel(watcher, server));
export { grid };
export { createSvgSprite };

// export const html = gulp.series(reset, html, mainTasks, gulp.parallel(watcher, server));
// export const wp = gulp.series(reset, wp, wpPlugin, copy, mainTasks, gulp.parallel(watcher, server));




// export const deployZIP = gulp.series('сначало собрать проэкт html или wp и только потом архивировать');     //!
// export const deployFTP = gulp.series('сначало собрать проэкт html или wp и только потом отправлять');    //!



// export { createSvgSprite };
// export { grid };
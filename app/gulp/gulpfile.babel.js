import gulp from "gulp";
import { path } from "./config/path.js";
import { plugins } from "./config/plugins.js";
import { copy } from "./tasks/copy.js";
import { html } from "./tasks/html.js";
import { wp } from "./tasks/wp.js";
import { wpPlugin } from "./tasks/wpPlugin.js";
import { reset } from "./tasks/reset.js";





export { copy };
export { wpPlugin };
export { reset };
export const wp1 = gulp.series(reset, wp, wpPlugin, copy);
// export { wp };


// todo очищать readme.md только при использовании сборки в качестве шаблона



global.app = {
   gulp: gulp,

   path: path,
   plugins: plugins,

   isProd: process.argv.includes('--prod'),
   isDev: !process.argv.includes('--prod'),
   isWP: process.argv.includes('--wp'),
   // isHTML: !process.argv.includes('--wp'),


}



// const mainTasks = gulp.series(gulp.parallel(copyFonts, styles, js, images, copy), wpPlugin, listProcFiles);



// export const html = gulp.series(reset, html, mainTasks, gulp.parallel(watcher, server));
// export const wp = gulp.series(reset, wp, wpPlugin, copy, mainTasks, gulp.parallel(watcher, server));




// export const deployZIP = gulp.series('сначало собрать проэкт html или wp и только потом архивировать');     //!
// export const deployFTP = gulp.series('сначало собрать проэкт html или wp и только потом отправлять');    //!


// export const createFonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
// export { createSvgSprite };
// export { grid };
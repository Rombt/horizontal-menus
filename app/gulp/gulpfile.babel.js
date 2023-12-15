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
import { moveSvgSprite } from "./tasks/moveSvgSprite.js";
import { grid } from "./tasks/grid.js";
import { otfToTtf, ttfToWoff, fontStyle, copyFonts } from "./tasks/fonts.js";
import { createSvgSprite } from "./tasks/svgsprite.js";
import { zip, zipPl } from "./tasks/zip.js";
import { ftp } from "./tasks/ftp.js";


import { test } from "./tasks/test.js";



global.app = {
   gulp: gulp,
   path: path,
   plugins: plugins,
   isProd: process.argv.includes('--prod'),
   isWP: process.argv.includes('--wp'),
   forPlugin: process.argv.includes('--pl'),
   isSASS: process.argv.includes('--sass'),
}

function watcher() {
   gulp.watch(path.src.copy, copy)
   gulp.watch(path.watch.php, php)
   gulp.watch(path.watch.styles, styles)
   gulp.watch(path.watch.images, procImages)
   gulp.watch(path.watch.js, js)
}

const procImages = gulp.series(images, moveSvgSprite);
const mainTask = gulp.series(copyFonts, gulp.parallel(procImages, styles, js, php));

export const wp = gulp.series(reset, mainTask, wpPlugin, copy, gulp.parallel(watcher, server));
export const html = gulp.series(reset, mainTask, gulp.parallel(watcher, server));


export const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
export { grid };
export { createSvgSprite };

export const makeZip = gulp.series(zip);
export const makeZipPl = gulp.series(zipPl);
export const makeZipWpPl = gulp.series(zipPl, zip);

export { ftp };




export { test };


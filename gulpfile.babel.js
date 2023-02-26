import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { reset } from "./gulp/tasks/reset.js";
import { copy } from "./gulp/tasks/copy.js";
import { php } from "./gulp/tasks/php.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontStyle, copyFonts } from "./gulp/tasks/fonts.js";
import { createSvgSprite } from "./gulp/tasks/svgsprite.js";

global.app = {
    isBuild: process.argv.includes('--build');
    isDev: !isBuild,
    path: path,
    gulp: gulp,
    plugins: plugins, // оиск и замена по регуляракам 
}

function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.php, php)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}

const mainTasks = gulp.parallel(copyFonts, copy, php, scss, js, images);
export const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
export const build = gulp.series(reset, mainTasks);

export const createFonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
export { createSvgSprite };



gulp.task('default', dev);
gulp.task('fonts', createFonts);
import gulp from "gulp";
import { reset } from "./gulp/tasks/reset.js";
import { path } from "./gulp/config/path.js";
import { copy } from "./gulp/tasks/copy.js";
import { php } from "./gulp/tasks/php.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/tasks/server.js";

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins, // оиск и замена по регуляракам 
}


// let proxyPath = '';
// if (__dirname.includes('OSPanel')) {
//     proxyPath = "http://twily/gulp/build/"; // домашний комп
// } else {
//     proxyPath = "http://web/twily/gulp/build/"; // рабочий комп
// }


function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.php, php)
}

const mainTasks = gulp.parallel(copy, php);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));


gulp.task('default', dev);
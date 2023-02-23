import gulp from "gulp";
import { path } from "./gulp/config/path";
import { reset } from "./gulp/tasks/reset";
import { copy } from "./gulp/tasks/copy";
import { php } from "./gulp/tasks/php";
import { plugins } from "./gulp/config/plugins";

global.app = {
   path: path,
   gulp: gulp,
   plugins: plugins,       // оиск и замена по регуляракам 
}


function watcher() {
   gulp.watch(path.watch.files, copy)
   gulp.watch(path.watch.php, php)
}

const mainTasks = gulp.parallel(copy, php);
const dev = gulp.series(reset, mainTasks, watcher);


gulp.task('default', dev);




import replace from "gulp-replace";    // поиск и замена по регуляракам
import plumber from "gulp-plumber";    // оброботка ошибок
import notify from "gulp-notify";      // вывод соообщений об ошибках в windows!


export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
}

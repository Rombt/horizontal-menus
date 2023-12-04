import { configFTP } from "../config/ftp_config.js";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";


export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);

    return app.gulp.src(app.plugins.if(app.isWP, [
        `${app.path.themePath}/**/*.*`,
        `!${app.path.themePath}/${app.path.rootFolder}/**/*.*`,
        `!${app.path.themePath}/.git/**/*.*`,
    ], `${app.path.prodFolder}/**/*.*`), {})
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "FTP", message: "Error: <%= error.message %>" })))


        // .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))    // создаст на ftp сервере папку с именем root папки проэкта и положет всё туда
        .pipe(ftpConnect.dest(`/${app.path.ftp}`))
}
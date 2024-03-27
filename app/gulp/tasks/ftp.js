/**
 * Moves files from folder srcPath to app.path.ftp
 * Ensure your project is precompiled!
 * 
 */

import { configFTP } from "../config/ftp_config.js";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";


export const ftp = () => {
    app.forPlugin = false;
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);

    let srcPath;
    let destPath;

    if (app.isWP) {
        srcPath = app.path.clear.src;
        destPath = app.path.ftp.php;
    } else {
        srcPath = app.path.clear.src;
        destPath = app.path.ftp.html;
    }

    return app.gulp.src(srcPath, {})
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "FTP", message: "Error: <%= error.message %>" })))
        .pipe(ftpConnect.dest(destPath))
}


export const ftpPL = () => {

    app.forPlugin = true;
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);

    return app.gulp.src(app.path.clear.src, {})
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "FTP", message: "Error: <%= error.message %>" })))
        .pipe(ftpConnect.dest(app.path.ftp.plug))

}


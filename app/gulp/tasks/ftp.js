/**
 * Moves files from folder srcPath to app.path.ftp
 * Ensure your project is precompiled!
 * 
 */

import { configFTP } from "../config/ftp_config.js";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";


export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);

    let srcPath;
    let destPath;

    if (app.isWP) {
        if (app.forPlugin) {
            srcPath = app.path.clearPL;
            destPath = app.path.ftpPl;
        } else {
            srcPath = app.path.clearWP;
            destPath = app.path.ftpWp;
        }
    } else {
        srcPath = app.path.clearHtml;
        destPath = app.path.ftpHtml;
    }

    return app.gulp.src(srcPath, {})
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "FTP", message: "Error: <%= error.message %>" })))
        .pipe(ftpConnect.dest(destPath))
}
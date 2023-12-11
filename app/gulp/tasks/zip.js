/**
 * 
 * Creates a zip archive in three modes. 
 * Ensure your project is precompiled!
 *      HTML coding:
 *          Packs all files from the "docs" folder.
 *      WP development:
 *          Theme development: use the '--wp'
 *              Packs only the theme's files from the root folder of your theme.
 *              Includes all files from the "core-plugin" folder if it is located in app.path.wpPluginPath.
 *          Plugins development: use the '--pl'
 *              Packs only all files from the "core-plugin" folder if it is located in app.path.wpPluginPath. 
 *          Theme development with core-lugin use the '--wp' and '--pl'
 *              Bundles all files from the "core-plugin" folder and 
 *               the theme's files from the root folder of your theme into a single archive.
 *      In all modes, the archive is placed in the root folder of your theme.
 *              
 * 
 */


import zipPlugin from "gulp-zip";


export const zip = () => {

    let zipName;
    let srcPath;

    if (app.isWP) {
        if (app.forPlugin) {
            zipName = `${app.path.ThemeName}_wp_pl.zip`;
            srcPath = app.path.clearWP.filter(function (path) {
                return path !== `!${app.path.prodFolder}/${app.path.ThemeName}_core.zip`
            });
            srcPath.push(`!${app.path.prodFolder}/${app.path.ThemeName}_wp_pl.zip`);
        } else {
            zipName = `${app.path.ThemeName}_wp.zip`;
            srcPath = app.path.clearWP;
        }
    } else {
        zipName = `${app.path.ThemeName}_html.zip`;
        srcPath = app.path.clearHtml;
    }

    return app.gulp.src(srcPath, { allowEmpty: true, nounique: true })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: `${app.isWP ? 'zipWp' : 'zipHtml'}`, message: "Error: <%= error.message %>" })))
        .pipe(zipPlugin(zipName))
        .pipe(app.gulp.dest(app.path.prodFolder))
        .pipe(app.plugins.if(app.forPlugin && app.isWP, app.plugins.tap(() => { app.plugins.del(`${app.path.prodFolder}/${app.path.ThemeName}_core.zip`, { force: true }) })))
}


export const zipPl = () => {

    return app.gulp.src(app.path.clearPL, { "allowEmpty": true, })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "zipWpPl", message: "Error: <%= error.message %>" })))
        .pipe(zipPlugin(`${app.path.ThemeName}_core.zip`))
        .pipe(app.gulp.dest(app.path.prodFolder))
}
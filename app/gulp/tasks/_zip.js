import zipPlugin from "gulp-zip";

let files = '';


export const zip = () => {


    if (app.wpPlugins) {
        files = `${app.path.pluginsPath}/**/*.*`;
    } else {
        files = [
            `${app.path.themePath}/**/*.*`,
            `!${app.path.themePath}/${app.path.rootFolder}/**/*.*`,
            `!${app.path.themePath}/.git/**/*.*`,
        ];
    }


    app.plugins.del(app.plugins.if(app.wpPlugins, `./${app.path.wp.wpPluginName}.zip`, `./${app.path.wp.themeName}.zip`));

    return app.gulp.src(app.plugins.if(app.isWP, files, `${app.path.prodFolder}/**/*.*`), {})
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "ZIP", message: "Error: <%= error.message %>" })))

        .pipe(zipPlugin(app.plugins.if(app.wpPlugins, `${app.path.wp.wpPluginName}.zip`, `${app.path.wp.themeName}.zip`)))
        .pipe(app.gulp.dest(app.plugins.if(app.wpPlugins, app.path.themePath, './')));
}
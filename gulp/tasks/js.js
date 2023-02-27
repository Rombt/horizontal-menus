import webpackStream from "webpack-stream";

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: global.app.isDev, "allowEmpty": true }) // "allowEmpty": true для того что бы  не было ошибок из-за отсутствия файлов .sass
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(webpackStream({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}
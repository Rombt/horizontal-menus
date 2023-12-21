import webpackStream from "webpack-stream";

export const js = () => {


    return app.gulp.src(app.path.js.src, { sourcemaps: app.isDev, allowEmpty: true, })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(webpackStream({
            mode: app.isProd ? 'production' : 'development',
            entry: {
                app: app.path.js.src[0],        // Входная точка для фронтенда
                ...(app.forPlugin && app.isWP ? { admin: app.path.js.src[1] } : {}),          // Входная точка для админ панели
            },
            output: {
                filename: '[name].main.min.js',
            }
        }))
        .pipe(app.plugins.if(
            app.isWP && '**/app.main.min.js',
            app.gulp.dest(Array.isArray(app.path.js.dest) ? app.path.js.dest[0] : app.path.js.dest)
        ))
        .pipe(app.plugins.if(
            app.forPlugin && '**/admin.main.min.js',
            app.gulp.dest(app.path.js.dest[1])
        ))
        .pipe(app.plugins.if(
            !app.isWP,
            app.gulp.dest(app.path.js.dest)
        ))
        .pipe(app.plugins.browsersync.stream());


}
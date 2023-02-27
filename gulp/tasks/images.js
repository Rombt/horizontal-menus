import webp from "gulp-webp";
import imageMin from "gulp-imagemin";



export const images = () => {
    return app.gulp.src(app.path.src.images, { sourcemaps: true, "allowEmpty": true }) // "allowEmpty": true для того что бы  не было ошибок из-за отсутствия файлов .sass
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "Images", message: "Error: <%= error.message %>" })))
        .pipe(app.plugins.newer(app.path.prod.images))

        .pipe(app.plugins.if(app.isProd, webp()))
        .pipe(app.plugins.if(app.isProd, app.gulp.dest(app.path.prod.images)))
        .pipe(app.plugins.if(app.isProd, app.gulp.src(app.path.src.images)))
        .pipe(app.plugins.if(app.isProd, app.plugins.newer(app.path.prod.images)))
        .pipe(app.plugins.if(app.isProd, imageMin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        })))

        .pipe(app.gulp.dest(app.path.prod.images))
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.prod.images))
        .pipe(app.plugins.browsersync.stream());
}
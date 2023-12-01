// import webp from "gulp-webp";
// import imageMin from "gulp-imagemin";



export const images = () => {


    return app.gulp.src(
        app.isWP ? app.path.src.images : app.path.src.images[0], {
        allowEmpty: true,
    })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "Images", message: "Error: <%= error.message %>" })))
        .pipe(app.plugins.newer(app.plugins.if(app.isWP, ...app.path.prod.images, app.path.prod.images[0])))       // не принимает массивы только значения через запятую!!
        .pipe(app.plugins.if(app.isProd, app.plugins.webp()))
        .pipe(app.plugins.if(app.isProd, app.plugins.multiDest(app.plugins.if(app.isWP, app.path.prod.images, app.path.prod.images[0]))))

        .pipe(app.plugins.if(app.isProd, app.gulp.src(app.isWP ? app.path.src.images : app.path.src.images[0])))
        .pipe(app.plugins.if(app.isProd, app.plugins.newer(app.plugins.if(app.isWP, ...app.path.prod.images, app.path.prod.images[0]))))
        .pipe(app.plugins.if(app.isProd, app.plugins.imageMin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
        })))

        .pipe(app.plugins.multiDest(app.plugins.if(app.isWP, app.path.prod.images, app.path.prod.images[0])))
        .pipe(app.gulp.src(app.path.src.svg, {}))
        .pipe(app.plugins.multiDest(app.plugins.if(app.isWP, app.path.prod.images, app.path.prod.images[0])))

        .pipe(app.plugins.browsersync.stream());
}
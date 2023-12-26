export const images = (done) => {


    let neverDest = app.path.selectSrcPath(app.path.images.dest, '/**/*`');

    return app.gulp.src(app.path.images.src, {
        allowEmpty: true,
    })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "Images", message: "Error: <%= error.message %>" })))
        .pipe(app.plugins.newer(...neverDest))
        .pipe(app.plugins.if(app.isProd, app.plugins.webp()))
        .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, app.path.images.dest))) // because, we need two file formats: one for browsers that support .webp and another for browsers that don't support .webp.
        .pipe(app.plugins.if(app.isProd, app.gulp.src(app.path.images.src)))
        .pipe(app.plugins.if(app.isProd, app.plugins.imageMin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
        })))
        .pipe(app.plugins.if(app.isProd, app.gulp.dest((file) => app.path.selectDestPath(file, app.path.images.dest))))
        .pipe(app.plugins.browsersync.stream());
};



export const moveSvgSprite = () => {

    return app.gulp.src(Array.isArray(app.path.svg.dest) ? path.map(el => `${el}/**/*.{svg,html}`) : `${app.path.svg.dest}/**/*.{svg,html}`, {})
        .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, Array.isArray(app.path.images.dest) ?
            app.path.images.dest.map((el) => `${el}/icons`) :
            `${app.path.images.dest}/icons`)))
        .pipe(app.plugins.browsersync.stream());
};
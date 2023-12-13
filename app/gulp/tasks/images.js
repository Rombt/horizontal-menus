

export const images = (done) => {

    app.plugins.del(app.isWP ? app.path.prod.imgPhp : app.path.prod.imgHtml, { force: true })
        .then((result) => {
            return app.gulp.src(
                app.isWP ? app.path.src.images : app.path.src.images[0], {
                allowEmpty: true,
            })
                .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "Images", message: "Error: <%= error.message %>" })))
                .pipe(app.plugins.newer(app.plugins.if(app.isWP, ...app.path.prod.imgPhp, app.path.prod.imgHtml)))
                .pipe(app.plugins.if(app.isProd, app.plugins.webp()))
                .pipe(app.gulp.dest((file) => app.isWP ? app.plugins.getDestPath(file, app.path.prod.imgPhp) : app.path.prod.imgHtml))    // because, we need two file formats: one for browsers that support .webp and another for browsers that don't support .webp.
                .pipe(app.plugins.if(app.isProd, app.gulp.src(app.isWP ? app.path.src.images : app.path.src.images[0])))
                .pipe(app.plugins.if(app.isProd, app.plugins.imageMin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3, // 0 to 7
                })))
                .pipe(app.gulp.dest((file) => app.isWP ? app.plugins.getDestPath(file, app.path.prod.imgPhp) : app.path.prod.imgHtml))
                .pipe(app.plugins.browsersync.stream());

        })
        .then(() => done())
        .catch(error => {
            done(error);
        });
};



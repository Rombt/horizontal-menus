

export const moveSvgSprite = () => {

    return app.gulp.src(app.isWP ? app.path.prod.svg.map((el) => { return `${el}/**/*.{svg,html}` }) : `${app.path.prod.svg[0]}/**/*.{svg,html}`, {})
        .pipe(app.gulp.dest((file) => app.isWP ? app.plugins.getDestPath(file, app.path.prod.svg1) : app.path.prod.imgHtml))
        .pipe(app.plugins.browsersync.stream());
};



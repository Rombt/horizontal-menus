import svgSprite from "gulp-svg-sprite";


export const createSvgSprite = () => {
    return app.gulp.src(app.path.src.svgicons, { base: app.path.srcFolder })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "SVG", message: "Error: <%= error.message %>" })))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons/icons.svg',
                    example: true, // создаёт html страницу с примерами иканак
                }
            },
        }))

        .pipe(app.gulp.dest(app.plugins.if(app.isWP, app.path.wp.svgicons, app.path.prod.svgicons)))
        .pipe(app.plugins.if(app.isWP, app.plugins.tap(function (file) {
            file.path ? app.path.wp.arr_processedFiles.push(file.path) : null;
        })))
}
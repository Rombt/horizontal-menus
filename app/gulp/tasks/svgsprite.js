/**
 * 
 * Creates SVG sprite 
 *  Source and destination is app.path.src.svg 
 *  move svg files in task 'image'
 */


import svgSprite from "gulp-svg-sprite";


// todo поправить путь для сохранения svg файлов при html сборке

export const createSvgSprite = (done) => {

    if (app.plugins.fs.existsSync(
        app.isWP ? `${app.path.prod.svg[1]}/sprite.svg`
            : `${app.path.prod.svg[0]}/sprite.svg`)
    ) {
        console.log("sprite.svg has already existing, for re-creation you must delete it.");
        return done();
    }


    return app.gulp.src(app.forPlugin ? app.path.src.svg[1] : app.path.src.svg[0], { "allowEmpty": true })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "SVG", message: "Error: <%= error.message %>" })))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true, // creates html page with examples icons
                }
            },
        }))
        .pipe(app.gulp.dest(app.isWP ? app.path.prod.svg[1] : app.path.prod.svg[0]))

}

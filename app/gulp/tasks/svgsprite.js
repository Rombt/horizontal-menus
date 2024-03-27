/**
 * 
 * Creates SVG sprite 
 *  Source and destination is app.path.src.svg  
 *  move svg files in task 'image'
 * 
 * for WP plugin --pl
 * ! Doеs not create SVG sprite for WP and plugin at the some time
 */


import svgSprite from "gulp-svg-sprite";


export const createSvgSprite = (done) => {


    if (app.plugins.fs.existsSync(`${app.path.svg.dest}/sprite.svg`)
    ) {
        console.log("sprite.svg has already existing, for re-creation you must delete it.");
        return done();
    }

    return app.gulp.src(app.path.svg.src, { "allowEmpty": true })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "SVG", message: "Error: <%= error.message %>" })))
        .pipe(svgSprite({
            mode: {
                stack: {
                    example: true, // creates html page with examples icons
                },
                symbol: {    // Create a «symbol» sprite
                    sprite: '../sprite.svg',
                }
            },
        }))

        .pipe(app.gulp.dest(app.path.svg.dest))
}

/**
 * 
 * Moves files from app.path.copy without making any changes 
 * 
 * 
 */


export const copy = () => {



   return app.gulp.src(app.path.src.files, { base: app.path.srcFolder })



      .pipe(app.gulp.dest(app.plugins.if(app.isWP, app.path.wp.files, app.path.prod.files)))

}
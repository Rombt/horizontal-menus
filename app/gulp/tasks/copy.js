/**
 * 
 * Moves files from app.path.copy without making any changes 
 * 
 * 
 */


export const copy = () => {



   return app.gulp.src(app.path.src.copy, { base: app.path.srcFolder })



      .pipe(app.gulp.dest(app.path.prodFolder))

}
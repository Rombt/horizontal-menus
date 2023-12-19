/**
 * 
 * Moves files from app.path.copy without making any changes 
 * 
 * 
 */


export const copy = (done) => {

   if (!app.path.selectSrcPath(app.path.copy.src)) {
      return done();
   }

   app.path.clearForTask(path)


   return app.gulp.src(app.path.copy.src, {
      allowEmpty: true,
   })
      .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, app.path.copy.dest)))

}
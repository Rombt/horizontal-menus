/**
 * 
 * Moves files from app.path.copy without making any changes 
 * 
 * 
 */


export const copy = () => {

   console.log("app.forPlugin = ", app.forPlugin);


   return app.gulp.src(app.forPlugin
      ? app.path.src.copyPL
      : app.path.src.copy, {
      base: app.forPlugin
         ? `${app.path.srcFolder}/core-plugin/`
         : app.path.srcFolder
   })


      .pipe(app.gulp.dest(app.path.prodFolder))

}
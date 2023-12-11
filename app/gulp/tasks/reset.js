/**
 * 
 * Deletes !! ALL !! files from root theme folder and app.path.wpPluginPath  
 * except app.path.clearWP and app.path.clearHtml
 * 
 */



export const reset = (done) => {

   let clearPath = (app.isWP ? app.path.clearWP : app.path.clearHtml).map((el) => el.replace(/\\/g, '/'));

   if (!clearPath || clearPath.length === 0) {
      console.log("ERROR: array clearPath does not exist!!!");

      return done();
   }

   return app.plugins.del(clearPath, { force: true });
}

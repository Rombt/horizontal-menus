/**
 * 
 * Deletes !! ALL !! files from root theme folder 
 *    except 
 *         `!${app.path.prodFolder}/app`,
 *         `!${app.path.prodFolder}/.git`,  
 *         `!${app.path.prodFolder}/docs`,  
 */



export const reset = (done) => {

   let clearPath = [];


   if (app.isWP) {
      clearPath = [
         app.path.prod.wpPlugin,
         `${app.path.prodFolder}/**`,
         `!${app.path.prodFolder}/app`,
         `!${app.path.prodFolder}/.git`,
         `!${app.path.prodFolder}/.gitignore`,
         `!${app.path.prodFolder}/docs`,
      ]
   } else {
      clearPath = [
         `${app.path.prod.html}/**`,
         `!${app.path.prod.html}/.gitkeep`
      ];
   }

   let _clearPath = clearPath.map((el) => {    //Note that glob patterns can only contain forward-slashes, not backward-slashes.  from   https://www.npmjs.com/package/del#api    
      return el.replace(/\\/g, '/');
   })


   if (!_clearPath || _clearPath.length === 0) {
      console.log("ERROR: array clearPath does not exist!!!");

      return done();
   }

   return app.plugins.del(_clearPath, { force: true });
}

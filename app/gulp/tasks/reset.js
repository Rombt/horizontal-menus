/**
 * 
 * Deletes !! ALL !! files from root theme folder 
 *    except 
 *         `!${app.path.prodFolder}/app`,
 *         `!${app.path.prodFolder}/.git`,  
 *         `!${app.path.prodFolder}/docs`,  
 */



export const reset = () => {

   let clearPath = [];


   if (app.isWP) {
      clearPath = [
         app.path.prod.wpPlugin,
         `${app.path.prodFolder}/**`,
         `!${app.path.prodFolder}/app`,
         `!${app.path.prodFolder}/.git`,
         `!${app.path.prodFolder}/docs`,
      ]
   } else {
      clearPath = [
         `${app.path.prod.html}/**`,
         `!${app.path.prod.html}/.gitkeep`
      ];
   }

   clearPath = clearPath.map((el) => {    //Note that glob patterns can only contain forward-slashes, not backward-slashes.  from   https://www.npmjs.com/package/del#api    
      return el.replace(/\\/g, '/');
   })


   return app.plugins.del(clearPath, { force: true });
}

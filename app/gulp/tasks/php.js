/**
 * 
 * Moves  php files those that have been changed from app.path.src.php in root theme folder
 * 
 */




export const php = (done) => {
   const clearPath = app.path.clearWP.map(el => el.indexOf('!') !== 0 ? el.replace(/(?:\.\*)|(?:\*\*\/?)$/, '.php') : el);
   const sourcePath = app.isWP ? app.path.src.php : app.path.src.html;
   const destPath = app.isWP ? app.path.prodFolder : app.path.prod.html;

   app.plugins.del(app.isWP ? clearPath : `${app.path.prod.html}/**/*.html`, { force: true })
      .then((result) => {
         return app.gulp.src(sourcePath, app.isWP ? { base: app.path.srcFolder } : {})
            .pipe(app.plugins.plumber(app.plugins.notify.onError({
               title: "PHP",
               message: "Error: <%= error.message %>"
            })))
            .pipe(app.plugins.if(!app.isWP, app.plugins.fileInclude()))
            .pipe(app.plugins.if(app.isProd, app.plugins.webpHtmlNosvg()))
            .pipe(app.gulp.dest(destPath))
            .pipe(app.plugins.browsersync.stream());
      })
      .then(() => done())
      .catch(error => {
         done(error);
      });
};


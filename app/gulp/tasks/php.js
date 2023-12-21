/**
 * 
 * Moves  php files those that have been changed from app.path.src.php in root theme folder
 * 
 */




export const php = (done) => {

   app.plugins.del(app.path.php.clear, { force: true })
      .then((result) => {
         return app.gulp.src(app.path.php.src, {})
            .pipe(app.plugins.plumber(app.plugins.notify.onError({
               title: "PHP",
               message: "Error: <%= error.message %>"
            })))
            .pipe(app.plugins.if(!app.isWP, app.plugins.fileInclude()))
            .pipe(app.plugins.if(app.isProd, app.plugins.webpHtmlNosvg()))
            .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, app.path.php.dest)))
            .pipe(app.plugins.browsersync.stream());
      })
      .then(() => done())
      .catch(error => {
         done(error);
      });
};


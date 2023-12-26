/**
 * 
 * Moves  php files those that have been changed from app.path.src.php in root theme folder
 * Renames the main file of the core plugin to 'this_theme_name-core'.
 * 
 */




export const php = () => {



   return app.gulp.src(app.path.php.src, {})

      .pipe(app.plugins.plumber(app.plugins.notify.onError({
         title: "PHP",
         message: "Error: <%= error.message %>"
      })))
      .pipe(app.plugins.if(!app.isWP, app.plugins.fileInclude()))
      .pipe(app.plugins.if(app.isProd, app.plugins.webpHtmlNosvg()))
      .pipe(app.plugins.if(app.forPlugin, app.plugins.rename(function (path) {
         path.basename = path.basename.replace(/.*-core/g, `${app.path.ThemeName}-core`);
      })))
      .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, app.path.php.dest)))
      .pipe(app.plugins.browsersync.stream());
};


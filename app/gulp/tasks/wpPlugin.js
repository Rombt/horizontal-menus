/**
 * Moves core plugin files of theme in folder plugins WP.
 * Renames the main file of the core plugin to 'this_theme_name-core'.
 * 
 */


export const wpPlugin = () => {


   return app.gulp.src(app.path.src.wpPlugin, { base: `${app.path.srcFolder}/core-plugin/` })

      .pipe(app.plugins.rename(function (path) {
         path.basename = path.basename.replace(/.*-core/g, `${app.path.ThemeName}-core`);
      }))

      .pipe(app.gulp.dest(app.path.prod.wpPlugin))

}
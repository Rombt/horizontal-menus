/**
 * 
 * Moves  php files those that have been changed from app.path.src.php in root theme folder
 * 
 */



export const wp = () => {

   return app.gulp.src(app.path.src.php, { base: app.path.srcFolder })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "PHP",
            message: "Error: <%= error.message %>"
         })))
      .pipe(app.plugins.newer(app.path.prodFolder))
      .pipe(app.plugins.if(app.isProd, app.plugins.webpHtmlNosvg())) // оборачивает тег img в тег <picture> 
      .pipe(app.plugins.if(app.isProd, app.plugins.versionNumber({
         'value': '%DT%',
         'append': {
            'key': '_v',
            'cover': 0,
            'to': [
               'css',
               'js',
            ]
         },
         'output': {
            'file': 'version.json'
         }
      })))

      .pipe(app.gulp.dest(app.path.prodFolder))

}
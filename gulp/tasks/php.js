import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";


export const php = () => {
   return app.gulp.src(app.path.src.php)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "PHP",
            message: "Error: <%= error.masage %"
         })))
      .pipe(webpHtmlNosvg())        // оборачивает тег img в тег <picture> 
      .pipe(versionNumber({
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
            'file': 'gulp/version.json'
         }
      }))
      .pipe(app.gulp.dest(app.path.build.php))
}
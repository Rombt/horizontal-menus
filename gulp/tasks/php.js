import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import fileInclude from "gulp-file-include";


export const php = () => {
    return app.gulp.src(app.path.src.php)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "PHP",
                message: "Error: <%= error.message %>"
            })))
        // .pipe(fileInclude())
        .pipe(app.plugins.if(app.isProd, fileInclude({
            context: {
                'isProd': app.isProd
            }
        }), fileInclude({
            context: {
                'isProd': false
            }
        })))
        .pipe(app.plugins.if(app.isProd, webpHtmlNosvg())) // оборачивает тег img в тег <picture> 
        .pipe(app.plugins.if(app.isProd, versionNumber({
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
        })))
        .pipe(app.gulp.dest(app.path.prod.php))
        .pipe(app.plugins.browsersync.stream());
}
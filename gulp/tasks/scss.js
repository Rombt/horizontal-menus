import dartSasss from 'sass';
import gulpSasss from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss'    // в зависимости об браузера(!) в файл стилей картинки либо в фотмате webp либо обычные требует дополнительного js кода
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSasss(dartSasss);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: true, "allowEmpty": true })    // "allowEmpty": true для того что бы  не было ошибок из-за отсутствия файлов .sass
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })))
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .pipe(groupCssMediaQueries())
      .pipe(webpCss({
         webpClass: ".webp",
         nowebpClass: ".no-webp",
      }))
      .pipe(autoprefixer({
         grid: true,
         overrideBrowsersList: ["last 3 versions"],
         cascad: true,
      }))

      .pipe(cleanCss())
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.scss))
      .pipe(app.plugins.browsersync.stream());
}
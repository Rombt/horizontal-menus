/**
 * 
 * 
 * 
 * 
 */

import dartSasss from 'sass';
import gulpSasss from 'gulp-sass';
import less from 'gulp-less';
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss' // в зависимости от браузера(!) в файл стилей картинки либо в фотмате webp либо обычные требует дополнительного js кода
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
const sass = gulpSasss(dartSasss);



export const styles = (done) => {

    let clear = app.path.styles.clear.map(el => el.replace(/(\.(less|sass))$/i, '.min.css'));

    app.plugins.del(clear, { force: true })
        .then((result) => {
            return app.gulp.src(app.path.styles.src, { sourcemaps: app.isDev, "allowEmpty": true })
                .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: 'Styles', message: "Error: <%= error.message %>" })))
                .pipe(app.plugins.if(app.isSASS, sass({ outputStyle: 'expanded' }), less()))
                .pipe(app.plugins.if(app.isProd, groupCssMediaQueries()))
                .pipe(app.plugins.if(app.isProd, webpCss({
                    webpClass: ".webp",
                    nowebpClass: ".no-webp",
                })))
                .pipe(app.plugins.if(app.isProd, autoprefixer({
                    grid: true,
                    overrideBrowsersList: ["last 3 versions"],
                    cascad: true,
                })))
                .pipe(app.plugins.if(app.isProd, cleanCss()))
                .pipe(app.plugins.rename({ extname: ".min.css" }))
                .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, app.path.styles.dest)))
                .pipe(app.plugins.browsersync.stream());
        })
        .then(() => done())
        .catch(error => {
            done(error);
        });
}
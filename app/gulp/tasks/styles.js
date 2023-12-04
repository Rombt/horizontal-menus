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

export const styles = () => {

    let pathSrc;

    if (app.isWP) {
        if (app.isSASS) {
            pathSrc = [
                app.path.src.styles.scss,
                `${app.path.prod.wpPluginPath}/assets/styles/main-style.scss`,

            ];
        } else {
            pathSrc = [
                app.path.src.styles.less,
                `${app.path.prod.wpPluginPath}/assets/styles/main-style.less`,
            ];
        }
    } else {
        if (app.isSASS) {
            pathSrc = app.path.src.styles.scss;
        } else {
            pathSrc = app.path.src.styles.less;
        }
    }

    return app.gulp.src(
        pathSrc,
        { sourcemaps: app.isDev, base: app.path.srcFolder, "allowEmpty": true }) // "allowEmpty": true для того что бы  не было ошибок из-за отсутствия файлов .sass
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "SCSS", message: "Error: <%= error.message %>" })))
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
        .pipe(app.plugins.multiDest(app.isWP ? app.path.prod.stylesPhp : app.path.prod.stylesHtml))
        .pipe(app.plugins.browsersync.stream());
}
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


    let pathSrc = app.isWP
        ? app.path.src.styles.map(el => `${el}${app.isSASS ? '.sass' : '.less'}`)
        : `${app.path.src.styles[0]}${app.isSASS ? '.sass' : '.less'}`;

    return app.gulp.src(
        pathSrc,
        { sourcemaps: app.isDev, "allowEmpty": true })
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
        .pipe(app.gulp.dest((file) => app.isWP ? app.plugins.getDestPath(file, app.path.prod.stylesPhp) : app.path.prod.stylesHtml))
        .pipe(app.plugins.browsersync.stream());
}
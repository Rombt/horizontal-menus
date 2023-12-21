/**
 * This task creating fonts in woff and woff2 formats and generates styles file with font inclusion whith needs to be inclusion in main styles file.
 * Fonts file can be created for less or sass preprocessor. It is created once! For re-creation you must delete existing file fonts.*
 * Creating fonts takes too much time, so we generate fonts only once. Subsequently, we only copy them.
 * 
 *  Source files:
 *      app.path.fonts.src
 *      the styles file name of fonts is generated based on app.path.styles.src
 * 
 * !! Destination paths:
 *      - For creation: The same folder as the source
 *      - For copying:
 *          app.path.prod.fontHtml
 *          -- wp app.path.prod.fontPhp
 */



import ttf2woff2 from 'gulp-ttf2woff2';
import fonter from 'gulp-fonter';

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.fonts.src}/**/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.plugins.flatten())
        .pipe(app.gulp.dest(app.path.fonts.src))
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.fonts.src}/**/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.plugins.flatten())
        .pipe(app.gulp.dest(app.path.fonts.src))
        .pipe(app.gulp.src(`${app.path.fonts.src}/**/*.ttf`, {}))
        .pipe(ttf2woff2())
        .pipe(app.plugins.flatten())
        .pipe(app.gulp.dest(app.path.fonts.src))
}

export const fontStyle = (done) => {

    let arrfontsFiles = app.path.styles.src.map(el => el.replace(/\/([^/]+\.[a-z]+)$/i, '') + `/fonts.${app.isSASS ? 'sass' : 'less'}`);

    arrfontsFiles.map((styleFile, index) => {
        app.plugins.fs.readdir(app.path.fonts.src[index], function (err, fontsFiles) {
            if (styleFile) {
                if (!app.plugins.fs.existsSync(styleFile)) {
                    app.plugins.fs.writeFile(styleFile, '', cd);
                    let newFileOnly;
                    for (var i = 0; i < fontsFiles.length; i++) {
                        let fontFileName = fontsFiles[i].split('.')[0];
                        if (newFileOnly !== fontFileName) {
                            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                            if (fontWeight.toLowerCase() === 'thin') {
                                fontWeight = 100;
                            } else if (fontWeight.toLowerCase() === 'extralight') {
                                fontWeight = 200;
                            } else if (fontWeight.toLowerCase() === 'light') {
                                fontWeight = 300;
                            } else if (fontWeight.toLowerCase() === 'medium') {
                                fontWeight = 500;
                            } else if (fontWeight.toLowerCase() === 'semibold') {
                                fontWeight = 600;
                            } else if (fontWeight.toLowerCase() === 'bold') {
                                fontWeight = 700;
                            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                                fontWeight = 800;
                            } else if (fontWeight.toLowerCase() === 'black') {
                                fontWeight = 900;
                            } else {
                                fontWeight = 400;
                            }
                            app.plugins.fs.appendFile(styleFile,
                                `@font-face {
                        font-family: "${fontName}";
                        font-display: swap;
                        src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n
                     }\r\n`, cd);
                            newFileOnly = fontFileName;
                        }
                    }
                } else {

                    console.log(`File fonts.${app.isSASS ? 'sass' : 'less'} has already existing. For update you need to delete it!`);
                }
            }
        });

    })

    return done();
    function cd() { };
}

export const copyFonts = () => {
    return app.gulp.src(`${app.path.fonts.src}/*.{woff,woff2}`, {})
        .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, app.path.fonts.dest)))
}
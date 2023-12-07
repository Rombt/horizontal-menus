/**
 * This task creating fonts in woff and woff2 formats and generates styles file with font inclusion whith needs to be inclusion in main styles file.
 * Fonts file can be created for less or sass preprocessor. It is created once! For re-creation you must delete existing file fonts.*
 * Creating fonts takes too much time, so we generate fonts only once. Subsequently, we only copy them.
 * 
 * Source files:
 *      - From app.path.src.fonts
 *      -- wp From app.path.src.fontsPlugin
 * 
 * Destination paths:
 *      - For creation: The same folder as the source
 *      - For copying:
 *          app.path.prod.fontHtml
 *          -- wp app.path.prod.fontPhp
 */



import ttf2woff2 from 'gulp-ttf2woff2';
import fonter from 'gulp-fonter';


export const otfToTtf = () => {
    return app.gulp.src(app.forPlugin ? `${app.path.src.fontsPlugin}/**/*.otf` : `${app.path.src.fonts}/**/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })))

        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.plugins.flatten())
        .pipe(app.gulp.dest(app.forPlugin ? app.path.src.fontsPlugin : app.path.src.fonts))
}

export const ttfToWoff = () => {
    return app.gulp.src(app.forPlugin ? `${app.path.src.fontsPlugin}/**/*.ttf` : `${app.path.src.fonts}/**/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.plugins.flatten())
        .pipe(app.gulp.dest(app.forPlugin ? app.path.src.fontsPlugin : app.path.src.fonts))
        .pipe(app.gulp.src(app.forPlugin ? `${app.path.src.fontsPlugin}/**/*.ttf` : `${app.path.src.fonts}/**/*.ttf`, {}))
        .pipe(ttf2woff2())
        .pipe(app.plugins.flatten())
        .pipe(app.gulp.dest(app.forPlugin ? app.path.src.fontsPlugin : app.path.src.fonts))
}

export const fontStyle = () => {

    let fontsFile;
    let srcFonts;

    if (app.forPlugin) {
        fontsFile = `${app.path.srcFolder}/core-plugin/assets/styles/fonts.${app.isSASS ? 'sass' : 'less'}`;
        srcFonts = `${app.path.srcFolder}/core-plugin/assets/fonts`;
    } else {
        fontsFile = `${app.path.srcFolder}/assets/styles/fonts.${app.isSASS ? 'sass' : 'less'}`;
        srcFonts = `${app.path.srcFolder}/assets/fonts`;
    }

    app.plugins.fs.readdir(srcFonts, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!app.plugins.fs.existsSync(fontsFile)) {
                app.plugins.fs.writeFile(fontsFile, '', cd);
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
                        app.plugins.fs.appendFile(fontsFile,
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
    return app.gulp.src(`${app.path.srcFolder}`);

    function cd() { };
}


export const copyFonts = () => {
    return app.gulp.src([
        `${app.path.src.fonts}/*.{woff,woff2}`,
        app.isWP && `${app.path.src.fontsPlugin}/*.{woff,woff2}`,
    ].filter(Boolean), {})
        .pipe(app.gulp.dest((file) => app.isWP ? app.plugins.getDestPath(file, app.path.prod.fontPhp) : app.path.prod.fontHtml))
}
import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';


export const otfToTtf = () => {
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})    // "allowEmpty": true для того что бы  не было ошибок из-за отсутствия файлов .sass
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         })))

      .pipe(fonter({
         formats: ['ttf']
      }))
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))

}

export const ttfToWoff = () => {
   return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})    // "allowEmpty": true для того что бы  не было ошибок из-за отсутствия файлов .sass
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         })))

      .pipe(fonter({
         formats: ['woff']
      }))
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      .pipe(ttf2woff2())
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontStyle = () => {
   let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      if (fontsFile) {
         if (!fs.existsSync(fontStyle)) {
            fs.writeFile(fontsFile, '', cd);
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
                  fs.appendFile(fontsFile,
                     `@font-face {
                        font-famely: ${fontName};
                        font-display: swap;
                        src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normale;\n
                     }\r\n`, cd);

               }
            }
         }
      }
   })
}




function fontsStyle(params) {

   let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
   if (file_content == '') {
      fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
      return fs.readdir(path.build.fonts, function (err, items) {
         if (items) {
            let c_fontname;
            for (var i = 0; i < items.length; i++) {
               let fontname = items[i].split('.');
               fontname = fontname[0];
               if (c_fontname != fontname) {
                  fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
               }
               c_fontname = fontname;
            }
         }
      })
   }
}

function cb() { }
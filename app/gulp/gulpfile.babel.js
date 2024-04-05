import gulp from 'gulp';
import { path } from './config/path.js';
import { plugins } from './config/plugins.js';
import { otfToTtf, ttfToWoff, fontStyle, copyFonts } from './tasks/fonts.js';
import { copyPHP } from './tasks/copyPHP.js';
import { copyPl } from './tasks/copyPl.js';
import { createSvgSprite } from './tasks/svgsprite.js';
import { images, moveSvgSprite } from './tasks/images.js';
import { php } from './tasks/php.js';
import { js } from './tasks/js.js';
import { styles } from './tasks/styles.js';
import { reset } from './tasks/reset.js';
import { server } from './tasks/server.js';
import { grid } from './tasks/grid.js';
import { zip, zipPl } from './tasks/zip.js';
import { ftp, ftpPL } from './tasks/ftp.js';

global.app = {
  gulp: gulp,
  path: path,
  plugins: plugins,
  isProd: process.argv.includes('--prod'),
  isWP: process.argv.includes('--wp'),
  forPlugin: process.argv.includes('--pl'),
  isSASS: process.argv.includes('--sass'),
};

function watcher() {
  gulp
    .watch(
      path.watch.copy,
      { ignorePermissionErrors: true },
      gulp.parallel(copyPHP, copyPl)
    )
    .on('unlink', currentPath => {
      path.clearForTask(currentPath, path.copy.dest);
    });

  gulp
    .watch(path.watch.images, { ignorePermissionErrors: true }, procImages)
    .on('unlink', currentPath => {
      path.clearForTask(currentPath, path.images.dest);
    });

  gulp
    .watch(path.watch.php, { ignorePermissionErrors: true }, php)
    .on('unlink', currentPath => {
      path.clearForTask(currentPath, path.php.dest);
    });

  gulp
    .watch(path.watch.styles, { ignorePermissionErrors: true }, styles)
    .on('unlink', currentPath => {
      path.clearForTask(currentPath, path.styles.dest);
    });
  gulp
    .watch(path.watch.js, { ignorePermissionErrors: true }, js)
    .on('unlink', currentPath => {
      path.clearForTask(currentPath, path.js.dest);
    });
  gulp
    .watch(path.watch.fonts, { ignorePermissionErrors: true }, copyFonts)
    .on('unlink', currentPath => {
      path.clearForTask(currentPath, path.fonts.dest);
    });
}

const procImages = gulp.series(images, moveSvgSprite);

const mainTask = gulp.series(copyFonts, gulp.parallel(procImages, styles, js, php));
export const run = gulp.series(
  reset,
  mainTask,
  gulp.parallel(copyPHP, copyPl),
  gulp.parallel(watcher, server)
);

export const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
export { grid };
export { createSvgSprite };

export { zip };
export { zipPl };
export const zipWpPl = gulp.series(
  zipPl,
  done => {
    app.isWP = true;
    return done();
  },
  zip
);

export { ftp };
export { ftpPL };
export const ftpWpPl = gulp.series(
  ftpPL,
  done => {
    app.isWP = true;
    return done();
  },
  ftp
);

/**
 * 
 * Moves files from app.path.copy without making any changes 
 * 
 * 
 */


export const copyPl = (done) => {

    let srcPath;

    if (!app.path.copy || app.path.copy.src.length == 0) {
        return done();
    } else if (Array.isArray(app.path.copy.src)) {
        srcPath = app.path.copy.src.filter(el => el.includes(app.path.srcPluginName));
    } else if (typeof app.path.copy.src === 'string') {
        srcPath = app.path.copy.src.includes(app.path.srcPluginName) ? app.path.copy.src : '';
    }

    if (srcPath.length == 0) {
        return done();
    }

    return app.gulp.src(srcPath, {
            allowEmpty: true,
        })
        .pipe(app.gulp.dest((file) => app.path.selectDestPath(file, app.path.copy.dest)))
}
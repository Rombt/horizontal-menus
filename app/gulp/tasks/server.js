import process from 'process';

let absPath = process.cwd();


export const server = (done) => {

    // if (app.isWP) {      // todo path to root folder site not theme
    //     proxyPath = `${app.path.RootPath}/../../../..`;
    // } else {     //path for html-coding
    //     proxyPath = `${app.path.prodFolder}/docs`;
    // }


    let proxyPath;


    if (absPath.includes('OSPanel')) {
        proxyPath = `http://ms/`;
    } else {        // рабочий комп и домашний ноут
        proxyPath = `http://web/rombt/gulp-assembly`;
    }

    app.plugins.browsersync.init({
        proxy: proxyPath,
        open: false,
    })
}
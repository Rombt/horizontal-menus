export const server = (done) => {

    // if (app.isWP) {      // todo path to root folder site not theme
    //     proxyPath = `${app.path.RootPath}/../../../..`;
    // } else {     //path for html-coding
    //     proxyPath = `${app.path.prodFolder}/docs`;
    // }


    let proxyPath;


    if (app.path.RootPath.includes('OSPanel')) {
        proxyPath = app.path.proxy[0];
    } else { // рабочий комп и домашний ноут
        proxyPath = app.path.proxy[1];
    }

    app.plugins.browsersync.init({
        // proxy: proxyPath,
        // server: app.path.prod.html,
        ...(app.forPlugin || app.isWP ? { proxy: proxyPath } : { server: app.path.prod.html }),
        open: false,
    })
}
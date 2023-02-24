

let proxyPath = '';
if (__dirname.includes('OSPanel')) {
    proxyPath = "http://twily/gulp/build/"; // домашний комп
} else {
    proxyPath = "http://web/rombt/e-shop-clothes/dist"; // рабочий комп
}

export const server = (done) => {
    app.plugins.browsersync.init({
        proxy: proxyPath,
        open: false,
        // server: {
        //     baseDir: `${app.path.build.php}`
        // },
        // notify: false,
        // port: 3000,
    })
}
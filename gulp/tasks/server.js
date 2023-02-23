export const server = (done) => {
    app.plugins.browsersync.init({
        proxy: proxyPath,
        open: false,
        server: {
            baseDir: `${app.path.build.php}`
        },
        notify: false,
        port: 3000,
    })
}
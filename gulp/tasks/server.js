// для старых версий node.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);



export const server = (done) => {

    let rootFolder = app.path.prodFolder.slice(2);
    let proxyPath = '';

    if (__dirname.includes('OSPanel')) {
        proxyPath = `http://rombt/${app.path.rootFolder}/${rootFolder}`; // домашний комп
    } else {
        proxyPath = `http://web/rombt/${app.path.rootFolder}/${rootFolder}`; // рабочий комп и домашний ноут
    }

    app.plugins.browsersync.init({
        proxy: proxyPath,
        open: false,
        // server: {
        //     baseDir: `${app.path.prod.php}`
        // },
        // notify: false,
        // port: 3000,
    })
}
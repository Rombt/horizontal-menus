// для старых версий node.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// // for home laptop
// const __filename = fileURLToPath(
//     import.meta.url);
// const __dirname = dirname(__filename);

// rootFolder = nodePath.basename(nodePath.resolve());      //  может пригодится для нахождения путей 

let proxyPath = '';
if (__dirname.includes('OSPanel')) {
    proxyPath = "http://twily/gulp/prod/"; // домашний комп
} else {
    proxyPath = "http://web/rombt/e-shop-clothes/dist"; // рабочий комп и домашний ноут
}



// D:\web\e-shop-clothes

export const server = (done) => {
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
import smartgrid from "smart-grid";
import { settings } from '../config/grid_config.js';


export const grid = (done) => {

    smartgrid('./src/styles', settings);
    done();
}
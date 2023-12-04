import { settings } from '../config/grid_config.js';
import smartgrid from "smart-grid";


export const grid = (done) => {

    smartgrid('../src/assets/styles', settings);
    done();
}
/// <reference path="../ts.d/sbm.d.ts"/>

import Config = require('./config');

class App {
    config: Config;

    constructor() {
        this.config = new Config();
    }

    start() {
        console.log('Started with arguments', process.argv);
        this.config.load((err) => {
            if (process.argv[2] == 'init') {
                console.log('Running init');
                return Config.init((err) => {
                    if (err) throw err;
                });
            } else if (err && err.code == 'ENOENT') {
                return console.log('No sbm.json in the current directory.');
            }
            console.log('Starting the app');
        });
    }
}

export = App;

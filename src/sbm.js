/// <reference path="../ts.d/sbm.d.ts"/>
var Config = require('./config');
var App = (function () {
    function App() {
        this.config = new Config();
    }
    App.prototype.start = function () {
        console.log('Started with arguments', process.argv);
        this.config.load(function (err) {
            if (process.argv[2] == 'init') {
                console.log('Running init');
                return Config.init(function (err) {
                    if (err)
                        throw err;
                });
            }
            else if (err && err.code == 'ENOENT') {
                return console.log('No sbm.json in the current directory.');
            }
            console.log('Starting the app');
        });
    };
    return App;
})();
module.exports = App;

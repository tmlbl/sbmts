/// <reference path="../ts.d/sbm.d.ts"/>
var fs = require('fs');
var Config = (function () {
    function Config() {
    }
    Config.prototype.load = function (cb) {
        var _this = this;
        fs.readFile('./sbm.json', function (err, data) {
            if (err)
                return cb(err);
            var conf = JSON.parse(data.toString());
            validateConfig(conf);
            _this.config = conf;
            cb();
        });
    };
    Config.prototype.add = function (dep) {
        this.config.dependencies.push(dep);
    };
    Config.init = function (cb) {
        if (fs.existsSync('./sbm.json')) {
            return cb(new Error('An sbm.json already exists here!'));
        }
        // Set the name of the project to the name
        // of the current directory
        var path = process.cwd().split('/');
        var name = path[path.length - 1];
        // Write the empty config
        var writeData = JSON.stringify({
            project: name,
            dependencies: []
        }, null, 4) + '\n';
        fs.writeFile('./sbm.json', writeData, cb);
    };
    Config.prototype.save = function (cb) {
        var writeData = JSON.stringify(this.config, null, 4);
        fs.writeFile('./sbm.json', writeData, cb);
    };
    return Config;
})();
function validateConfig(config) {
    if (!Array.isArray(config.dependencies)) {
        throw new Error('Missing dependencies array');
    }
}
module.exports = Config;

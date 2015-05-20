/// <reference path="../ts.d/sbm.d.ts"/>

import fs = require('fs');

class Config {
    config: SbmConfig;

    load(cb: (err?: NodeJS.ErrnoException) => any) {
        fs.readFile('./sbm.json', (err, data) => {
            if (err) return cb(err);
            var conf = <SbmConfig>JSON.parse(data.toString());
            validateConfig(conf);
            this.config = conf;
            cb();
        });
    }

    add(dep: Dependency) {
        this.config.dependencies.push(dep);
    }

    static init(cb: (err?) => any) {
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
    }

    save(cb?) {
        var writeData = JSON.stringify(this.config, null, 4);
        fs.writeFile('./sbm.json', writeData, cb);
    }
}

function validateConfig(config: SbmConfig) {
    if (!Array.isArray(config.dependencies)) {
        throw new Error('Missing dependencies array');
    }
}

export = Config;

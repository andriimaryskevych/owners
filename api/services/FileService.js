'use strict';

const fs = require('fs');
const path = require('path');
var shell = require('shelljs');

const basePath = global.appRoot;

class FileService {
    saveFile(name, buffer) {
        return new Promise((resolve, reject) => {
            const destinationFilePath = path.resolve(basePath, 'bucket', name);
            const destinationFolderPath = destinationFilePath.substr(0, destinationFilePath.lastIndexOf('/'));

            shell.mkdir('-p', destinationFolderPath);

            fs.writeFile(destinationFilePath, buffer, (err, file) => {
                if (err) {
                    return reject(err);
                }

                resolve(file);
            });
        });
    }
}

module.exports = new FileService();
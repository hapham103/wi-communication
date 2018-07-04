var fs = require('fs');
var jsonResponse = require('./response');
var PATH = require('path');
var directoryExists = require('directory-exists');

module.exports.upload = (req, res) => {
    let folderUpload = PATH.join(__dirname, '../database/upload/' + req.body.name);
    directoryExists(folderUpload, (error, result) => {
        if (!result) {
            fs.mkdir(folderUpload, function (err) {
                if (err) {
                    res.send(jsonResponse(400, 'CREATE FOLDER FAIL: ' + err));
                } else {
                    console.log('******MKDIR UPLOAD SUCCESS********');
                    let file = req.files.file;
                    let fileName = Date().split(' ').join('') + file.name;
                    let path = PATH.join(__dirname, '../database/upload/' + req.body.name + '/' + fileName);
                    fs.copyFile(file.path, path, (err) => {
                        if (err) {
                            res.send(jsonResponse(400, 'UPLOAD FAIL: ' + err));
                        }
                        else {
                            console.log('****UPLOAD SUCCESS****');
                            res.send(jsonResponse(200, 'SUCCESSFULLY', apiService.url + '/' + req.body.name + '/' + fileName));
                        }
                    });
                }
            });
        } else {
            let file = req.files.file;
            let fileName = Date().split(' ').join('') + file.name;
            let path = PATH.join(__dirname, '../database/upload/' + req.body.name + '/' + fileName);
            fs.copyFile(file.path, path, (err) => {
                if (err) {
                    res.send(jsonResponse(400, 'UPLOAD FAIL: ' + err));
                }
                else {
                    console.log('****UPLOAD SUCCESS****');
                    res.send(jsonResponse(200, 'SUCCESSFULLY', apiService.url + '/' + req.body.name + '/' + fileName));
                }
            });
        }
    });
};

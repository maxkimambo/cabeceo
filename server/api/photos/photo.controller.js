'use strict';
let AWS = require('aws-sdk');
let config = require('../../config/local.env');
const bucket = "maxkimambotest";
let fs = require('fs');

console.log(config.AWS_KEY);
module.exports.getById = function(req, res){

}

module.exports.uploadPhoto = function(req, res){

  let userId = req.body.id;
  console.log(req.file);
  // generate name to use
  let fileName = _generateFileName(userId, req.file.filename);
  req.body.fileName = fileName;

  // upload the renamed file to S3
  var photofile = fs.createReadStream(req.file.path);

  // set the credentials.
  AWS.config.update({accessKeyId: config.AWS_ID, secretAccessKey: config.AWS_KEY, region: config.AWS_REGION});

  var s3Object = new AWS.S3({params: {Bucket: bucket, Key: fileName}});
  s3Object.upload({Body: photofile}).send(function(err,data){
    console.log(err,data);
  });



  res.json(req.body);
}

module.exports.delete = function(req, res){

}
function _generateFileName(id, file){
  return `${id}_${file}`;
}

function _renameFile(filePath, newName){

}

function _uploadOverHttp(url){

}

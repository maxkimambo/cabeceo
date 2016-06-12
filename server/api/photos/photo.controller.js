'use strict';
let AWS = require('aws-sdk');
let config = require('../../config/local.env');
const bucket = "maxkimambotest";
let fs = require('fs');
let User = require('../user/user.model');
let log = require('../../components/logger');

module.exports.getById = function(req, res){
  // grab photo from s3


}

/**
* Fetches all photo url associated with the user
*/
module.exports.getByUserId = function(req, res){

}

function _getExtension(file){
  return file.substr(file.length -3);
}
//TODO: refactor this method.
module.exports.uploadPhoto = function(req, res){

  let userId = req.body.id;

  let extension = _getExtension(req.file.originalname);

  // generate name to use
  let fileName = _generateFileName(userId, req.file.filename) +'.'+ extension;

  req.body.fileName = fileName;

  // upload the renamed file to S3
  var photofile = fs.createReadStream(req.file.path);

  // set the credentials.
  AWS.config.update({accessKeyId: config.AWS_ID, secretAccessKey: config.AWS_KEY, region: config.AWS_REGION});

  var s3Object = new AWS.S3({params: {Bucket: bucket, Key: fileName}});
  s3Object.upload({Body: photofile}).send(function(err,data){

    if(!err){
       _addPhotoToUser(userId, data.Location );
      console.log(data);
      // remove the file from local storage
      _deleteLocal(req.file.path, function(err,res){
          console.log(err, res);
      })
    }
  });


  // save new filepath to the user object
  res.json(req.body);
}

module.exports.delete = function(req, res, next){
  let fileKey = req.params.id;
  AWS.config.update({accessKeyId: config.AWS_ID, secretAccessKey: config.AWS_KEY, region: config.AWS_REGION});

  var s3 = new AWS.S3({params: {Bucket: bucket, Key: fileKey}});

  var params = {
    Bucket: bucket, /* required */
    Key: fileKey, /* required */
    VersionId: null
  };

  s3.deleteObject(params, function(err,data){
    if (err){
      next(err);
    }
    res.status(200).end();
  });

}

function _addPhotoToUser(userId, filePath){
  // find user with this id;
  User.findOne({_id: userId}).then(user => {

    if(user){
        user.photos.push(filePath);
        // save back the user
        user.save().catch(err => {
          log.error(err);
        });
    }

  });

}

function _deleteLocal(path, done){
  return fs.unlink(path, done);
  }

function _generateFileName(id, file){
  return `${id}_${file}`;
}

'use strict';


module.exports.getById = function(req, res){

}

module.exports.uploadPhoto = function(req, res){

  let userId = req.body.id;
  console.log(req.file.filename);
  // generate name to use
  let fileName = _generateFileName(userId, req.file.filename);
  // grab the file rename
  console.log(fileName);

  // upload the renamed file to S3

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

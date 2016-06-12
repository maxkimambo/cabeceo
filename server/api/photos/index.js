'use strict';

let router = require('express').Router();
let log = require('./../../components/logger');
let photoController = require('./photo.controller');
let multer = require('multer');
let upload = multer({
  dest: './uploads',
  onError: function(err){
    console.log(err);
  },
  rename: function(fieldname, filename){
     return fieldname + filename + Date.now();
  }

});

function _getExtension(filename){
  var parts = filename.split('.');
    return parts.pop();
}

router.get('/', function(req, res){
  res.send('got here');
});
// routes
// returns all the photos by user id
router.get('/:id', photoController.getById);

//uploads photos for a user
router.post('/:id', upload.single('photo'), photoController.uploadPhoto);

// deletes a photo by its id
router.delete('/:id', photoController.delete);

module.exports = router;

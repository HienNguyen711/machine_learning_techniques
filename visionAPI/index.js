'use strict'
//import 
var express = require('express');
var fs = require('fs');
var util = require('util');
var mime = require('mime');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var app = express();

//set up auth 
var gcloud = require('gcloud')({
  keyFilename: 'key.json',
  projectId: '<projectidhere>'
});

var vision = gcloud.vision();
//simple upload form
var form = '<!DOCTYPE HTML><html><body>' +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
  "<input type='file' name='image'/>" +
  "<input type='submit' /></form>" +
  '</body></html>';

app.get('/', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(form);
});

//get the upload image
// Image is uploaded to req.file.path
app.post('/upload', upload.single('image'), function(req, res, next) {

  // Choose what the Vision API should detect
  // Choices are: faces, landmarks, labels, logos, properties, safeSearch, texts from google vision api 
  var types = ['labels']; 
  //send the image to cloud vision API
  vision.detect(req.file.path,types ,function(err,detections, apiResponse){
      if (err) {
      res.end('Error!');
      } else {
          res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write('<!DOCTYPE HTML><html><body>');
      // Base64 the image so we can display it on the page
      res.write('<img width=200 src="' + base64Image(req.file.path) + '"><br>');

      // Write out the JSON output of the Vision API
      res.write(JSON.stringify(detections, null, 4));

      // Delete file (optional)
      fs.unlinkSync(req.file.path);

      res.end('</body></html>');
    }
  });
});

app.listen(8080);
console.log('Server Started');

// Turn image into Base64 so we can display it easily

function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}
var express = require('express'),
    multer = require('multer');

var app = express();
var storge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        var fileformat = (file.originalname).split('.');
        cb(null, file.fieldname+'-'+Date.now()+'.'+fileformat[fileformat.length-1]);
    }
})

var upload = multer({storage: storge})
app.use(express.static('./static'));

app.post('/uploadimg', upload.array('files',20), function (req, res, next) {
    res.send(req.files);
})

var server = app.listen(9999, 'localhost', function() {
    console.log('server is running at port 9999...');
});
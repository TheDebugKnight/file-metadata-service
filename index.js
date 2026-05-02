var express = require('express');
var cors = require('cors');
require('dotenv').config();
/* -- Import the multer package to handle file uploads -- */
var multer = require('multer');
/* -- Configure multer to use a temporary destination or memory -- */
var upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/* -- POST endpoint to handle the file upload -- */
/* -- .single('upfile') matches the name attribute in your HTML form -- */
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;

  /* -- Error handling if no file is uploaded -- */
  if (!file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }

  /* -- Return the required metadata in the response -- */
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
const router = require('./routes/index');
const lib = require('./config/index');

const fs = require('fs');
const path = require('path');
const express = require('express');
const loginApi = require('./routes/Home/home');
const cors = require('cors');
const bodyParse = require('body-parser')
const multer = require('multer');

const app = express();

app.use(multer({ dest: './public/upload' }).array('file'));

app.use('/image', express.static(path.join(__dirname, './public/image')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParse.urlencoded({ extended: false }));

// 
router('/api', app);
lib(app);


app.listen('8888', () => {
    console.log('http://127.0.0.1:8888 is running....');
})
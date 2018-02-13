const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/user_api');
const multer = require('multer');
const app = express();

app.use(express.static(path.join(__dirname , 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', routes);

// upload file pictrue
/*app.use(multer({dest: './uploads/', rename: function (fieldname, filename){
        return filename;
    }
}));*/

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(3000, function(){
    const port = server.address().port;
    console.log("server running at %s", port);
});

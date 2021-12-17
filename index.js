const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const path = require("path");

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "main.html"));
  });

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3014;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);


app.post("/upload", function(req, res){
    const file = req.files.file;
    const path = __dirname + "/uploads/" + file.name;
    console.log(path)
    file.mv(path, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send({ status: "success", path: path });
    });
    
  })
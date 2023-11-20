const About = require('./package.json');
const express = require("express");
const bodyParser = require('body-parser');
const mongodb = require("./database/connection");

const cors = require('cors');

const app = express();

const Port = process.env.PORT || 3000;  // If no defined environment port, listen on 3000.

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app .use(cors())
    .use('/', require('./routes'));

console.log('\n');
console.log(About.prettyName + ' v' + About.version + '\nby ' + About.author);


mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
        app.listen(Port, () => console.log("Server is running. Listening on port " + Port + ".\n"));
    }
});
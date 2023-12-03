const About = require('./package.json');
const tools = require('./tools');
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

tools.info('\n');
tools.info(About.prettyName + ' v' + About.version + '\nby ' + About.author);

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.info(err);
    } else {
        tools.info('MongoDB connected.');
        if (process.env.npm_lifecycle_event !== "test") {
            app.listen(Port, () => tools.info(`Server is running. Listening on port ${Port}\n`));
        }
    }
});

module.exports = app;
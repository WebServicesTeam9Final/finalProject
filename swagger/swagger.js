const About = require('/package.json');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: About.version,      
    title: About.prettyName,    
    description: 'A temple work REST API developed by ' + About.author,
  },
  host: '[TBD].onrender.com',   
  basePath: '/',  
  schemes: ['https'],   
  consumes: ['application/json'], 
  produces: ['application/json'], 
  tags: [],
};

const outputFile = './swagger/swaggerDoc.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
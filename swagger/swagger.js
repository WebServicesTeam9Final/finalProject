const About = require('../package.json');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: About.version,      
    title: About.prettyName,    
    description: 'A temple work REST API developed by ' + About.author,
  },
  host: 'finalwebservices.onrender.com',   
  basePath: '/',  
  schemes: ['https'],   
  consumes: ['application/json'], 
  produces: ['application/json'], 
  tags: [],

  components: {
    securityDefinitions: {
      OAuth2: {
        type: "oauth2",
        description: "This API uses OAuth 2.0 with the authorization code flow.",
        flow: "accessCode",
        authorizationUrl: 'https://finalwebservices.onrender.com/login/',
        tokenUrl: 'https://finalwebservices.onrender.com/oauth/token',
        scopes: {
          read: 'Grants read access',
          write: 'Grants write access',
          admin: 'Grants read and write access to administrative information'
        }
      }
    }
  }
};



const outputFile = './swagger/swaggerDoc.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
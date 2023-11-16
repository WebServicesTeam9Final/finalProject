// ROOT Controller
const package = require('../package.json');

const About = {
    "name": package.name,
    "prettyName": package.prettyName,
    "version": package.version,
    "author": package.author
};

const defaultRoute = async(req, res) => {
  /*  #swagger.summary = 'Return API name and version number.'
      #swagger.description = 'This endpoint simply returns an object containing the name of the API, version number, and author.'
      #swagger.tags = ['Main']
      #swagger.responses[200] = { 
        description: "Returns the version information for the API.",
        schema: {
          name: "finalproject",
          prettyName: "CSE-341 Team 9 Final Project REST API",
          version: "1.0.0",
          author: "Ashlee Butterfield, Madison Lutz, Jonas Nunn, Mike Lewis"
        } 
      }
      #swagger.responses[500] = { 
        description: "Internal server error.",
      }
  */
  console.log('/GET API VERSION');
  try {
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(About);
    console.log('    200 - OK');
  } catch (err) {
    res.setHeader('Content-Type', 'application/text');  
    res.status(500).send('Internal server error.');
    console.log(`    500 - ${err.name}: ${err.message}`);
  }
}

module.exports = {
  defaultRoute
};
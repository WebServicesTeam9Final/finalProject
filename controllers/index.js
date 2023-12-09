// ROOT Controller
const packageInfo = require('../package.json');
const tools = require('../tools');

const About = {
    "name": packageInfo.name,
    "prettyName": packageInfo.prettyName,
    "version": packageInfo.version,
    "author": packageInfo.author
};

// Not planning on making this an actual route right now, but will use it for testing.
const statusRoute = async(req, res) => {
  /*  #swagger.summary = 'Provide status of whether user is logged in or out.'
      #swagger.description = 'This endpoint simply returns a single boolean field indicating if a user is logged in or out.'
      #swagger.tags = ['Status']
      #swagger.responses[200] = { 
        description: "Returns whether a user is logged in or out.",
        schema: {
          loggedIn: "<true | false>"
        }
      }
      #swagger.responses[500] = { 
        description: "Internal server error.",
      }
  */
tools.log(`status/GET login status:`);
try {
  // Check if we are in a TEST state. If so, mock a stub function
  // in place of OAuth.
  if (process.env.npm_lifecycle_event === "test") {
    req["oidc"] = {
          "isAuthenticated": () => { return true; }
    }
  }
  // Moving on... 
  let theStatus = {
    "loggedIn": req.oidc.isAuthenticated()
  };
  tools.log(`    200 - OK`);
  res.status(200).json(theStatus);
} catch (err) {
  console.log(`    500 - ${err.message}`);
  res.setHeader('Content-Type', 'text/plain'); 
  res.status(500).send("Internal server error.");
}
}

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
  tools.log('/GET API VERSION');
  try {
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(About);
    tools.log('    200 - OK');
  } catch (err) {
    res.setHeader('Content-Type', 'application/text');  
    res.status(500).send('Internal server error.');
    console.log(`    500 - ${err.name}: ${err.message}`);
  }
}

module.exports = {
  defaultRoute,
  statusRoute
};
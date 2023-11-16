// User Records Controller

// const mongoDb = require('../db/connect'); // Must connect to DB if not already.
// const {ObjectId} = require('mongodb');
// const collection = 'users';

/////// GET ///////
  const getOne = async (req, res, next) => {
    /*  #swagger.summary = 'Get a single user record.'
        #swagger.description = 'Returns the user record identified by `id` for a single user record that needs user work completed.'
        #swagger.tags = ['Users']
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'A valid and unique 24-digit hexadecimal string that identifies a user record that needs user work completed.',
          type: 'string',
          format: 'hex'
        }
        #swagger.responses[200] = {
          description: "A single user record identified by `id` is successfully returned.",
          schema: {
            "_id": "a1b2c3d4e5f6a1b2c3d4e5f6",
            "userName": "Joseph Smith",
            "userPassword": "StickPuller1830"
          }
        }
        #swagger.responses[400] = {
          description: 'Invalid ID provided.'
        }
        #swagger.responses[404] = {
          description: "Not found.",
        }
        #swagger.responses[500] = {
          description: 'Internal server or database error.'
        }
    */
      res.status(418).json('Not yet implemented.');
  };
  
  /////// POST ///////
  const postData = async (req, res) => {
    console.log(`user records/POST document: `);
    /*  #swagger.summary = 'Add a single user record.'
        #swagger.description = 'Adds a single user record using information provided in a JSON body.'
        #swagger.tags = ['Users']
        #swagger.parameters['record'] = {
          in: 'body',
          description: 'A valid JSON object with required data elements populated.',
          type: 'object',
          format: 'json',
          schema: {
            "_id": "a1b2c3d4e5f6a1b2c3d4e5f6",
            "userName": "Joseph Smith",
            "userPassword": "StickPuller1830"
          }
        }
        #swagger.responses[201] = {
          description: "Created - A single user record is added with the data given. The return result provides the newly assigned ID number.",
          schema: {
            acknowledged: true,
            insertedId: '<hexadecimal string>'
          }
        }
        #swagger.responses[422] = {
          description: 'Invalid or missing data error.'
        }
        #swagger.responses[500] = {
          description: 'Internal server or database error.'
        }
    */
      res.status(418).json('Not yet implemented.');
  };
  
  /////// PUT ///////
  const putData = async (req, res, next) => {
    let response = {};
    /*  #swagger.summary = 'Update a single user record.'
        #swagger.description = 'Updates the user record identified by `id` using information provided in a JSON body.'
        #swagger.tags = ['Users']
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'A valid and unique 24-digit hexadecimal string that identifies a user record.',
          type: 'string',
          format: 'hex',
        } 
        #swagger.parameters['record'] = {
          in: 'body',
          description: 'A valid JSON object populated with one or more data fields to be changed.',
          type: 'object',
          format: 'json',
          schema: {
            "_id": "a1b2c3d4e5f6a1b2c3d4e5f6",
            "userName": "Joseph Smith",
            "userPassword": "StickPuller1830"
          }
        }
        #swagger.responses[204] = {
          description: "Success - The user record identified by `id` is updated with the new data. No data is returned other than this status.",
        }
        #swagger.responses[400] = {
          description: "Invalid ID provided.",
        }
        #swagger.responses[404] = {
          description: "Not found.",
        }
        #swagger.responses[422] = {
          description: 'Invalid or missing data error.'
        }
        #swagger.responses[500] = {
          description: "Internal server or database error.",
        }
    */
      res.status(418).json('Not yet implemented.');
  };
  
  
  /////// DELETE ///////
  const deleteData = async (req, res, next) => {
    /*  #swagger.summary = 'Delete a single user record.'
        #swagger.description = 'Deletes a user record identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a user record was actually deleted.'
        #swagger.tags = ['Users']
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'A valid and unique 24-digit hexadecimal string that identifies a user record.',
          type: 'string',
          format: 'hex',
        } 
        #swagger.responses[200] = {
          description: "The user record identified by `id` is deleted from the collection if it exists. The response is an object containing an aknowledgement and the number of matching user record(s) deleted.",
          schema: {
            acknowledged: true,
            deletedCount: 1
          }
        }
        #swagger.responses[400] = {
          description: "Invalid ID provided.",
        }
        #swagger.responses[500] = {
          description: 'Internal server or database error.'
        }
    */
      res.status(418).json('Not yet implemented.');
  };
  
  
  module.exports = {
    getOne,
    postData,
    putData,
    deleteData
  };
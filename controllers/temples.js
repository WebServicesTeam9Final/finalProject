// Temple Records Controller

// const mongoDb = require('../db/connect'); // Must connect to DB if not already.
// const {ObjectId} = require('mongodb');
// const collection = 'temples';

/////// GET ///////
const getAll = async (req, res, next) => {
    /*
      #swagger.summary = 'Return the entire list of temple records.'
      #swagger.description = 'Returns all temple records in the collection. No filtering is applied.'
      #swagger.tags = ['Temples']
      #swagger.responses[200] = {
        description: "All temple records are successfully fetched and returned in an array.",
        schema: [{
            _id: "0123456789abcdef01234567",
          }]
      }
      #swagger.responses[500] = {
          description: 'Internal server or database error.'
        }
    */
      res.status(418).json('Not yet implemented.');
  };
  
  const getOne = async (req, res, next) => {
    /*  #swagger.summary = 'Get a single temple record.'
        #swagger.description = 'Returns the temple record identified by `id` for a single temple record that needs temple work completed.'
        #swagger.tags = ['Temples']
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'A valid and unique 24-digit hexadecimal string that identifies a temple record that needs temple work completed.',
          type: 'string',
          format: 'hex'
        }
        #swagger.responses[200] = {
          description: "A single temple record identified by `id` is successfully returned.",
          schema: {
            _id: "0123456789abcdef01234567",
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
    console.log(`temple records/POST document: `);
    /*  #swagger.summary = 'Add a single temple record.'
        #swagger.description = 'Adds a single temple record using information provided in a JSON body.'
        #swagger.tags = ['Temples']
        #swagger.parameters['record'] = {
          in: 'body',
          description: 'A valid JSON object with required data elements populated.',
          type: 'object',
          format: 'json',
          schema: {
          }
        }
        #swagger.responses[201] = {
          description: "Created - A single temple record is added with the data given. The return result provides the newly assigned ID number.",
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
    /*  #swagger.summary = 'Update a single temple record.'
        #swagger.description = 'Updates the temple record identified by `id` using information provided in a JSON body.'
        #swagger.tags = ['Temples']
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'A valid and unique 24-digit hexadecimal string that identifies a temple record.',
          type: 'string',
          format: 'hex',
        } 
        #swagger.parameters['record'] = {
          in: 'body',
          description: 'A valid JSON object populated with one or more data fields to be changed.',
          type: 'object',
          format: 'json',
          schema: {
          }
        }
        #swagger.responses[204] = {
          description: "Success - The temple record identified by `id` is updated with the new data. No data is returned other than this status.",
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
    /*  #swagger.summary = 'Delete a single temple record.'
        #swagger.description = 'Deletes a temple record identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a temple record was actually deleted.'
        #swagger.tags = ['Temples']
        #swagger.parameters['id'] = {
          in: 'path',
          description: 'A valid and unique 24-digit hexadecimal string that identifies a temple record.',
          type: 'string',
          format: 'hex',
        } 
        #swagger.responses[200] = {
          description: "The temple record identified by `id` is deleted from the collection if it exists. The response is an object containing an aknowledgement and the number of matching temple record(s) deleted.",
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
    getAll,
    getOne,
    postData,
    putData,
    deleteData
  };
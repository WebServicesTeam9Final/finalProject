// User Records Controller
// DO NOT DELETE SWAGGER DOCUMENTATION.

const tools = require('../tools');
const mongoDb = require('../database/connection');
const {ObjectId} = require('mongodb');
const collection = 'users';

/////// GET ///////
// Not doing a GET ALL on Users for now. 
const getOne = async (req, res, next) => {
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Get a single user record.'
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

  const paddedId = req.params.id.padStart(24,'0');
  tools.log(`${collection}/GET document ${paddedId}:`);
  if (!ObjectId.isValid(req.params.id)) {
    tools.log('    400 - Invalid ID provided.');
    res.status(400).send('You must provide a valid ID (24-digit hexadecimal string).');
    return false;
  }
  
  const myObjId = new ObjectId(paddedId); 

  try {
    const result = await mongoDb.getDb()
      .db()
      .collection(collection)
      .findOne( {"_id": myObjId }
    );
      
    if (result) {
      tools.log(`    200 - OK`);
      res.setHeader('Content-Type', 'application/json');  
      res.status(200).json(result); 
    } else {
      tools.log(`    404 - Not found.`);
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/plain');  
        res.status(404).send('Not found.');  
      }
    }
  } catch (err) {
    console.log(`    500 - ${err.name}: ${err.message}`);
    res.status(500).send('Internal server or database error.');
    return false;
  }
};
  

/////// POST ///////
const addUser = async (req, res) => {
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Add a single user record.'
    #swagger.description = '<b>Must be authorized to use.</b> Adds a single user record using information provided in a JSON body.'
    #swagger.tags = ['Users']
    #swagger.parameters['record'] = {
      in: 'body',
      description: 'A valid JSON object with required data elements populated.',
      type: 'object',
      format: 'json',
      schema: {
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

  tools.log(`${collection}/POST document:`);
  const user = {
    userName: req.body.userName,
    userPassword: req.body.userPassword
  };
  try {
    const result = await mongoDb.getDb().db('TempleWork').collection(collection).insertOne(user);
    if(result.acknowledged){
      tools.log(`    201 - SUCCESS`);
      res.status(201).json(result);
    } 
  } catch (err) {
    console.log(`    500 - ${err.name}: ${err.message}`);
    res.status(500).json('An error occurred while creating the user.');
    return false;
  }
};


/////// PUT ///////
const updateUser = async (req, res) => {
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Update a single user record.'
    #swagger.description = '<b>Must be authorized to use.</b> Updates the user record identified by `id` using information provided in a JSON body.'
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

  tools.log(`${collection}/PUT document ${req.params.id}:`);
  if (!ObjectId.isValid(req.params.id)) {
    tools.log(`    400 - Invalid ID provided.`);
    res.status(400).json('Must use a valid user id to update a user.');
  }
  const userId = new ObjectId(req.params.id);
  const updatedUser = {
    userName: req.body.userName,
    userPassword: req.body.userPassword
  };
  try {
    const result = await mongoDb.getDb().db('TempleWork').collection(collection).replaceOne({ _id: userId }, updatedUser);
    if(result.modifiedCount > 0){
      tools.log(`    204 - SUCCESS`);
      res.status(204).send();
    }
  } catch (err) {
    console.log(`    500 - ${err.name}: ${err.message}`);
    res.status(500).json('An error occurred while updating the user.');
    return false;
  }
};
  

/////// DELETE ///////
const deleteData = async (req, res, next) => {
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Delete a single user record.'
    #swagger.description = '<b>Must be authorized to use.</b> Deletes a user record identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a user record was actually deleted.'
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

    const paddedId = req.params.id.padStart(24,'0');
    tools.log(`${collection}/DELETE document ${paddedId}:`);
    
    if (!ObjectId.isValid(req.params.id)) {
      tools.log('    400 - Invalid ID provided.');
      res.status(400).send('You must provide a valid ID (24-digit hexadecimal string).');
      return false;
    }
    const personId = new ObjectId(paddedId);
  
    try {
      const result = await mongoDb.getDb()
        .db('TempleWork')
        .collection(collection)
        .deleteOne(
          { _id: personId }
          , true
        );
  
      if(result) {
        tools.log(`    200 - Success - Documents deleted = ${result.deletedCount}`);
        res.setHeader('Content-Type', 'application/json'); 
        res.status(200).json(result);
      }
    } catch (err) {
      console.log(`    500 - ${err.name}: ${err.message}`);
      res.status(500).json('An error occurred while deleting the data.');
      return false;
    }  
};
  

module.exports = {
  getOne,
  addUser, 
  updateUser,
  deleteData
};

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
//POST
const addUser = async (req, res) => {
    const user = {
        userName: req.body.userName,
        userPassword: req.body.userPassword
    };
    const result = await mongodb.getDb().db('TempleWork').collection('users').insertOne(user);
    if(result.acknowledged){
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the user.');
    }
};

//PUT
const updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update a user.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        userName: req.body.userName,
        userPassword: req.body.userPassword
    };
    const result = await mongodb.getDb().db('TempleWork').collection('users').replaceOne({ _id: userId }, updatedUser);
    console.log(result)
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the user.');
    }
};
  
  /////// DELETE ///////
  const deleteData = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to delete user.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('TempleWork').collection('users').deleteOne({ _id: userId }, true);
    console.log(result)
    if(result.deletedCount > 0){
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the user.');
    }    
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
  };
  
  

  module.exports = {
    getOne,
    addUser, 
    updateUser,
    deleteData
  };

// Temple Records Controller

const mongodb = require('../database/connection');
const {ObjectId} = require('mongodb');
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
            "_id": "a1b2c3d4e5f6a1b2c3d4e5f6",
            "templeId": "1",
            "templeName": "Mount Timpanogos Utah Temple",
            "templeAddress": "742 N 900 E, American Fork, UT 84003, USA"
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
            "_id": "a1b2c3d4e5f6a1b2c3d4e5f6",
            "templeId": "1",
            "templeName": "Mount Timpanogos Utah Temple",
            "templeAddress": "742 N 900 E, American Fork, UT 84003, USA"
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
const addTemple = async (req, res) => {
    const temple = {
        templeName: req.body.templeName,
        templeAddress: req.body.templeAddress
    };
    //db name subject to change after mongodb setup
    const result = await mongodb.getDb().db('TempleWork').collection('temples').insertOne(temple);
    if(result.acknowledged){
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the temple.');
    }
};

  /////// PUT ///////
const updateTemple = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to update a temple.');
    }
    const templeId = new ObjectId(req.params.id);
    const updatedTemple = {
        templeName: req.body.templeName,
        templeAddress: req.body.templeAddress
    };
    //db name subject to change after mongodb setup, is ttracker for now
    const result = await mongodb.getDb().db('TempleWork').collection('temples').replaceOne({ _id: templeId }, updatedTemple);
    console.log(result)
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the temple.');
    }
};
  
  /////// DELETE ///////
  const deleteData = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to delete a temple.');
    }
    const templeId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('TempleWork').collection('temples').deleteOne({ _id: templeId }, true);
    console.log(result)
    if(result.deletedCount > 0){
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the temple.');
    }
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
  };
  
  
  module.exports = {
    getAll,
    getOne,
    addTemple, 
    updateTemple,
    deleteData
  };

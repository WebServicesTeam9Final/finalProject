// Temple Records Controller

const mongoDb = require('../database/connection');
const {ObjectId} = require('mongodb');
const collection = 'temples';

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
    console.log(`${collection}/GET ALL: `);
    try {
      const result = await mongoDb.getDb()
        .db()
        .collection(collection)
        .find();
      
      result.toArray()
        .then( (lists) => {
          console.log(`    200 - OK`);
          res.setHeader('Content-Type', 'application/json');  
          res.status(200).json(lists); 
        });
    } catch (err) {
      console.log(`    500 - ${err.name}: ${err.message}`);
      res.status(500).send('Internal server or database error.');
      return false;
    }
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
    const paddedId = req.params.id.padStart(24,'0');
    console.log(`${collection}/GET document ${paddedId}:`);
    if (!ObjectId.isValid(req.params.id)) {
      console.log('    400 - Invalid ID provided.');
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
        console.log(`    200 - OK`);
        res.setHeader('Content-Type', 'application/json');  
        res.status(200).json(result); 
      } else {
        console.log(`    404 - Not found.`);
        if (!res.headersSent) {
          res.setHeader('Content-Type', 'text/plain');  
          res.status(404).send('Not found.');  
        }
      }
    } catch (err) {
      console.log(`    500 - ${err}`);
      res.status(500).send('Internal server or database error.');
      return false;
    }
  };
  
  /////// POST ///////
const addTemple = async (req, res) => {
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
          "templeId": "1",
          "templeName": "Mount Timpanogos Utah Temple",
          "templeAddress": "742 N 900 E, American Fork, UT 84003, USA"
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
  const temple = {
      templeName: req.body.templeName,
      templeAddress: req.body.templeAddress
  };
  //db name subject to change after mongodb setup
  const result = await mongoDb.getDb().db('TempleWork').collection('temples').insertOne(temple);
  if(result.acknowledged){
      res.status(201).json(result);
  } else {
      res.status(500).json(response.error || 'An error occurred while creating the temple.');
  }
};

  /////// PUT ///////
const updateTemple = async (req, res) => {
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
            "templeId": "1",
            "templeName": "Mount Timpanogos Utah Temple",
            "templeAddress": "742 N 900 E, American Fork, UT 84003, USA"
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
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to update a temple.');
  }
  const templeId = new ObjectId(req.params.id);
  const updatedTemple = {
      templeName: req.body.templeName,
      templeAddress: req.body.templeAddress
  };
  //db name subject to change after mongodb setup, is ttracker for now
  const result = await mongoDb.getDb().db('TempleWork').collection('temples').replaceOne({ _id: templeId }, updatedTemple);
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
  const result = await mongoDb.getDb().db('TempleWork').collection('temples').deleteOne({ _id: templeId }, true);
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

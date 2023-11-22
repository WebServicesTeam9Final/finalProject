// Completed Records Controller

const mongoDb = require('../database/connection');
const {ObjectId} = require('mongodb');
const collection = 'completed';

/////// GET ///////
const getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Return the entire list of completed records.'
    #swagger.description = 'Returns all completed records in the collection. No filtering is applied.'
    #swagger.tags = ['Completed']
    #swagger.responses[200] = {
      description: "All completed records are successfully fetched and returned in an array.",
      schema: [{
          _id: "0123456789abcdef01234567",
          fname: "Joseph",
          lname: "Smith",
          gender: "Male",
          birthday: "23-Dec-1805",
          baptism: "15-May-1829",
          confirmation: "15-May-1829",
          initiatory: "5-May-1842",
          endowment: "5-May-1842",
          sealing: "28-May-1843",
        }]
    }
    #swagger.responses[500] = {
        description: 'Internal server or database error.'
      }
  */
  console.log(`completed/GET ALL: `);
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
  /*  #swagger.summary = 'Get a single completed record.'
      #swagger.description = 'Returns the completed record identified by `id` for a single family member record that has had all temple work completed.'
      #swagger.tags = ['Completed']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique 24-digit hexadecimal string that identifies a family member record that has had all temple work completed.',
        type: 'string',
        format: 'hex'
      }
      #swagger.responses[200] = {
        description: "A single completed record identified by `id` is successfully returned.",
        schema: {
          _id: "0123456789abcdef01234567",
          fname: "Joseph",
          lname: "Smith",
          gender: "Male",
          birthday: "23-Dec-1805",
          baptism: "15-May-1829",
          confirmation: "15-May-1829",
          initiatory: "5-May-1842",
          endowment: "5-May-1842",
          sealing: "28-May-1843",
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
  console.log(`railroads/GET document ${paddedId}:`);
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
    res.status(418).json('Not yet implemented.');
};

//POST
const addCompletedPerson = async (req, res) => {
  console.log(`completed/POST document: `);
  /*  #swagger.summary = 'Add a single completed record.'
      #swagger.description = 'Adds a single completed record using information provided in a JSON body.'
      #swagger.tags = ['Completed']
      #swagger.parameters['record'] = {
        in: 'body',
        description: 'A valid JSON object with required data elements populated.',
        type: 'object',
        format: 'json',
        schema: {
          _id: "0123456789abcdef01234567",
          fname: "Joseph",
          lname: "Smith",
          gender: "Male",
          birthday: "23-Dec-1805",
          baptism: "15-May-1829",
          confirmation: "15-May-1829",
          initiatory: "5-May-1842",
          endowment: "5-May-1842",
          sealing: "28-May-1843",
        }
      }
      #swagger.responses[201] = {
        description: "Created - A single completed record is added with the data given. The return result provides the newly assigned ID number.",
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
  const completed = {
      fname: req.body.fname,
      lname: req.body.lname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      baptism: req.body.baptism,
      confirmation: req.body.confirmation,
      initiatory: req.body.initiatory,
      endowment: req.body.endowment,
      sealing: req.body.sealing
  };
  //db name subject to change after mongodb setup
  const result = await mongoDb.getDb().db('TempleWork').collection('completed').insertOne(completed);
  if(result.acknowledged){
      res.status(201).json(result);
  } else {
      res.status(500).json(response.error || 'An error occurred while creating the person.');
  }
};

//PUT
const updateCompletedPerson = async (req, res) => {
  console.log('completed/PUT: ');
  /*  #swagger.summary = 'Update a single completed record.'
      #swagger.description = 'Updates the completed record identified by `id` using information provided in a JSON body.'
      #swagger.tags = ['Completed']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique 24-digit hexadecimal string that identifies a completed record.',
        type: 'string',
        format: 'hex',
      } 
      #swagger.parameters['record'] = {
        in: 'body',
        description: 'A valid JSON object populated with one or more data fields to be changed.',
        type: 'object',
        format: 'json',
        schema: {
          _id: "0123456789abcdef01234567",
          fname: "Joseph",
          lname: "Smith",
          gender: "Male",
          birthday: "23-Dec-1805",
          baptism: "15-May-1829",
          confirmation: "15-May-1829",
          initiatory: "5-May-1842",
          endowment: "5-May-1842",
          sealing: "28-May-1843",
        }
      }
      #swagger.responses[204] = {
        description: "Success - The completed record identified by `id` is updated with the new data. No data is returned other than this status.",
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
      res.status(400).json('Must use a valid id to update a person.');
  }
  const personId = new ObjectId(req.params.id);
  const updatedPerson = {
      fname: req.body.fname,
      lname: req.body.lname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      baptism: req.body.baptism,
      confirmation: req.body.confirmation,
      initiatory: req.body.initiatory,
      endowment: req.body.endowment,
      sealing: req.body.sealing
  };
  //db name subject to change after mongodb setup
  const result = await mongoDb.getDb().db('TempleWork').collection('completed').replaceOne({ _id: personId }, updatedPerson);
  console.log(result)
  if(result.modifiedCount > 0){
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'An error occurred while updating the person.');
  }
};


/////// DELETE ///////
const deleteData = async (req, res, next) => {
  /*  #swagger.summary = 'Delete a single completed record.'
      #swagger.description = 'Deletes a completed record identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a completed record was actually deleted.'
      #swagger.tags = ['Completed']
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'A valid and unique 24-digit hexadecimal string that identifies a completed record.',
        type: 'string',
        format: 'hex',
      } 
      #swagger.responses[200] = {
        description: "The completed record identified by `id` is deleted from the collection if it exists. The response is an object containing an aknowledgement and the number of matching completed record(s) deleted.",
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
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to delete a person.');
  }
  const personId = new ObjectId(req.params.id);
  const result = await mongoDb.getDb().db('TempleWork').collection('completed').deleteOne({ _id: personId }, true);
  console.log(result)
  if(result.deletedCount > 0){
      res.status(200).send();
  } else {
      res.status(500).json(response.error || 'An error occurred while deleting the person.');
  }  
};


module.exports = {
  getAll,
  getOne,
  deleteData,
  addCompletedPerson, 
  updateCompletedPerson
};
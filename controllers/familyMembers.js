// Family Member Records Controller
// DO NOT DELETE SWAGGER DOCUMENTATION

const mongoDb = require('../database/connection');
const {ObjectId} = require('mongodb');
const collection = 'familyMembers';

/////// GET ///////
const getAll = async (req, res, next) => {
  /*SWAGGER DOCUMENTATION
    #swagger.summary = 'Return the entire list of family member records.'
    #swagger.description = 'Returns all family member records in the collection. No filtering is applied.'
    #swagger.tags = ['Family Members']
    #swagger.responses[200] = {
      description: "All family member records are successfully fetched and returned in an array.",
      schema: [{
          _id: "0123456789abcdef01234567",
          fname: "Joseph",
          lname: "Smith",
          gender: "Male",
          birthday: "23-Dec-1805",
          baptism: "15-May-1829",
          confirmation: "15-May-1829",
          initiatory: "",
          endowment: "",
          sealing: "",
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
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Get a single family member record.'
    #swagger.description = 'Returns the family member record identified by `id` for a single family member record that needs temple work completed.'
    #swagger.tags = ['Family Members']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'A valid and unique 24-digit hexadecimal string that identifies a family member record that needs temple work completed.',
      type: 'string',
      format: 'hex'
    }
    #swagger.responses[200] = {
      description: "A single family member record identified by `id` is successfully returned.",
      schema: {
        _id: "0123456789abcdef01234567",
        fname: "Joseph",
        lname: "Smith",
        gender: "Male",
        birthday: "23-Dec-1805",
        baptism: "15-May-1829",
        confirmation: "15-May-1829",
        initiatory: "",
        endowment: "",
        sealing: "",
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
const addFamilyMember = async (req, res) => {
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Add a single family member record.'
    #swagger.description = 'Adds a single family member record using information provided in a JSON body.'
    #swagger.tags = ['Family Members']
    #swagger.parameters['record'] = {
      in: 'body',
      description: 'A valid JSON object with required data elements populated.',
      type: 'object',
      format: 'json',
      schema: {
        fname: "Joseph",
        lname: "Smith",
        gender: "Male",
        birthday: "23-Dec-1805",
        baptism: "15-May-1829",
        confirmation: "15-May-1829",
        initiatory: "",
        endowment: "",
        sealing: "",
      }
    }
    #swagger.responses[201] = {
      description: "Created - A single family member record is added with the data given. The return result provides the newly assigned ID number.",
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

  console.log(`${collection}/POST: `);
  const familyMember = {
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
  const result = await mongoDb.getDb().db('TempleWork').collection(collection).insertOne(familyMember);
  if(result.acknowledged){
      res.status(201).json(result);
  } else {
      res.status(500).json(response.error || 'An error occurred while creating the person.');
  }
};


/////// PUT ///////
const updateFamilyMember = async (req, res) => {
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Update a single family member record.'
    #swagger.description = 'Updates the family member record identified by `id` using information provided in a JSON body.'
    #swagger.tags = ['Family Members']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'A valid and unique 24-digit hexadecimal string that identifies a family member record.',
      type: 'string',
      format: 'hex',
    } 
    #swagger.parameters['record'] = {
      in: 'body',
      description: 'A valid JSON object populated with one or more data fields to be changed.',
      type: 'object',
      format: 'json',
      schema: {
        fname: "Joseph",
        lname: "Smith",
        gender: "Male",
        birthday: "23-Dec-1805",
        baptism: "15-May-1829",
        confirmation: "15-May-1829",
        initiatory: "",
        endowment: "",
        sealing: "",
      }
    }
    #swagger.responses[204] = {
      description: "Success - The family member record identified by `id` is updated with the new data. No data is returned other than this status.",
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

  console.log(`${collection}/PUT document ${req.params.id}:`);
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to update a person.');
  }
  const personId = new ObjectId(req.params.id);
  const updatedFamilyMember = {
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
  const result = await mongoDb.getDb().db('TempleWork').collection(collection).replaceOne({ _id: personId }, updatedFamilyMember);
  console.log(result)
  if(result.modifiedCount > 0){
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'An error occurred while updating the person.');
  }
};

  
/////// DELETE ///////
const deleteData = async (req, res, next) => {
  // TODO: Need to resolve the difference between the documentation and actual behavior.
  /*SWAGGER DOCUMENTATION  
    #swagger.summary = 'Delete a single completed record.'
    #swagger.description = 'Deletes a completed record identified by `id`. If `id` does not exist, no action is taken and no error occurs. Check the `deletedCount` attribute in the response to determine if a completed record was actually deleted.'
    #swagger.tags = ['Family Members']
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

  console.log(`${collection}/DELETE document ${req.params.id}:`);
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to delete a person.');
  }
  const personId = new ObjectId(req.params.id);
  const result = await mongoDb.getDb().db('TempleWork').collection(collection).deleteOne({ _id: personId }, true);
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
  addFamilyMember,
  updateFamilyMember,
  deleteData
};

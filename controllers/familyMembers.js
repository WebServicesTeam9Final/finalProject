// Family Member Records Controller

// const mongoDb = require('../db/connect'); // Must connect to DB if not already.
// const {ObjectId} = require('mongodb');
// const collection = 'Family Member';

/////// GET ///////
const getAll = async (req, res, next) => {
    /*
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
      res.status(418).json('Not yet implemented.');
  };
  
  const getOne = async (req, res, next) => {
    /*  #swagger.summary = 'Get a single family member record.'
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
      res.status(418).json('Not yet implemented.');
  };
  
//POST
const addFamilyMember = async (req, res) => {
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
    const result = await mongodb.getDb().db('TempleWork').collection('familyMembers').insertOne(familyMember);
    if(result.acknowledged){
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the person.');
    }
};

//PUT
const updateFamilyMember = async (req, res) => {
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
    const result = await mongodb.getDb().db('TempleWork').collection('familyMembers').replaceOne({ _id: personId }, updatedFamilyMember);
    console.log(result)
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the person.');
    }
};

  
/////// DELETE ///////
const deleteData = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to delete a person.');
    }
    const personId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('TempleWork').collection('familyMembers').deleteOne({ _id: personId }, true);
    console.log(result)
    if(result.deletedCount > 0){
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the person.');
    }
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
};
  
  
  module.exports = {
    getAll,
    getOne,
    addFamilyMember,
    updateFamilyMember,
    deleteData
  };

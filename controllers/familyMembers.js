const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

//GET ALL

//GET SINGLE

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
    //db name subject to change after mongodb setup, is ttracker for now
    const result = await mongodb.getDb().db('ttracker').collection('familyMembers').insertOne(familyMember);
    if(result.acknowledged){
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the person.');
    }
};

//PUT
const updateFamilyMember = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a person.');
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
    //db name subject to change after mongodb setup, is ttracker for now
    const result = await mongodb.getDb().db('ttracker').collection('familyMembers').replaceOne({ _id: personId }, updatedFamilyMember);
    console.log(result)
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the person.');
    }
};

//DELETE

module.exports = { addFamilyMember, updateFamilyMember };
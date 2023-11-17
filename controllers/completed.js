const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

//GET ALL

//GET SINGLE

//POST
const addCompletedPerson = async (req, res) => {
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
    const result = await mongodb.getDb().db('TempleWork').collection('completed').insertOne(completed);
    if(result.acknowledged){
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the person.');
    }
};

//PUT
const updateCompletedPerson = async (req, res) => {
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
    const result = await mongodb.getDb().db('TempleWork').collection('completed').replaceOne({ _id: personId }, updatedPerson);
    console.log(result)
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the person.');
    }
};

//DELETE

module.exports = { addCompletedPerson, updateCompletedPerson };
const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

//GET ALL

//GET SINGLE

//POST
const addTemple = async (req, res) => {
    const temple = {
        templeName: req.body.templeName,
        templeAddress: req.body.templeAddress
    };
    //db name subject to change after mongodb setup, is ttracker for now
    const result = await mongodb.getDb().db('ttracker').collection('temples').insertOne(temple);
    if(result.acknowledged){
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the temple.');
    }
};

//PUT
const updateTemple = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a temple.');
    }
    const templeId = new ObjectId(req.params.id);
    const updatedTemple = {
        templeName: req.body.templeName,
        templeAddress: req.body.templeAddress
    };
    //db name subject to change after mongodb setup, is ttracker for now
    const result = await mongodb.getDb().db('ttracker').collection('temples').replaceOne({ _id: templeId }, updatedTemple);
    console.log(result)
    if(result.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the temple.');
    }
};

//DELETE

module.exports = { addTemple, updateTemple };
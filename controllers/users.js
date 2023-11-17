const mongodb = require('../database/connection');
const ObjectId = require('mongodb').ObjectId;

//GET ALL

//GET SINGLE

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

//DELETE

module.exports = { addUser, updateUser };
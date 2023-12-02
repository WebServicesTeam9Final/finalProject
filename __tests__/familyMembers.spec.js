// FAMILY MEMBERS Route Unit Test

const serverApp = require('../server');
const { MongoClient } = require('mongodb');
const superTest = require('supertest');
const { expect } = require('@jest/globals');
const request = superTest(serverApp);

let thisDate = new Date();

const postData = {
    fname: "Testy",
    lname: "McTestperson",
    gender: "Male",
    birthday: "08-Jan-1930",
    baptism: "08-Jan-1938",
    confirmation: "08-Jan-1938",
    initiatory: "21-Feb-1948",
    endowment: "21-Feb-1948",
    sealing: "30-Aug-1955"
}

const putData = {
    fname: "Moddy",
    lname: "McModified",
    gender: "Male",
    birthday: thisDate.toISOString(),
    baptism: thisDate.toISOString(),
    confirmation: thisDate.toISOString(),
    initiatory: thisDate.toISOString(),
    endowment: thisDate.toISOString(),
    sealing: thisDate.toISOString()
}

// This will hold the added test document ID so that it can be updated and later deleted. 
// Net result should be zero documents added to the collection.
// More in-depth testing would test to make sure the data is in the expected format.
let returnId = "[OBJECT_ID]";

describe('Test /FAMILY-MEMBERS Endpoint Routes:', () => {

    let connection;
    let _db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        _db = await connection.db('TempleWork');
    });

    afterAll(async () => {
        await connection.close();
    });

    // GET ALL
    test(' - Responds to GET /family-members', async () => {
        const res = await request.get('/family-members');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
    
    // POST
    // Do POST first so we can get a test record ID number for the remaining tests.
    test(' - Responds to POST /family-members', async () => {
        const res = 
            await request.post('/family-members')
                         .send(postData);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        returnId = res.body.insertedId;
        expect(res.statusCode).toBe(201);
    });

    // GET ONE
    test(` - Responds to GET /family-members/${returnId}`, async () => {
        const res = await request.get(`/family-members/${returnId}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
    
    // PUT
    test(` - Responds to PUT /family-members/${returnId}`, async () => {
        const res = await request.put(`/family-members/${returnId}`)
                                 .send(putData);
        expect(res.statusCode).toBe(204);
    });
    
    // DELETE
    test(` - Responds to DELETE /family-members/${returnId}`, async () => {
        const res = await request.delete(`/family-members/${returnId}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

});



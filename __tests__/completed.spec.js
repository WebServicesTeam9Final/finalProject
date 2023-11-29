
const serverApp = require('../server');
const { MongoClient } = require('mongodb');
const superTest = require('supertest');
const { expect } = require('@jest/globals');
const request = superTest(serverApp);

let thisDate = new Date();

const postData = {
    fname: "Testy",
    lname: "McTestuser",
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

let returnId = "[HEX_OBJ_ID]";

describe('Test COMPLETED endpoint routes', () => {

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
    test(' - Responds to GET /completed', async () => {
        const res = await request.get('/completed');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
    
    // POST
    test(' - Responds to POST /completed', async () => {
        const res = 
            await request.post('/completed')
                         .send(postData);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        returnId = res.body.insertedId;
        expect(res.statusCode).toBe(201);
    });

    // GET ONE
    test(` - Responds to GET /completed/${returnId}`, async () => {
        const res = await request.get(`/completed/${returnId}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
    
    // PUT
    test(` - Responds to PUT /completed/${returnId}`, async () => {
        const res = await request.put(`/completed/${returnId}`)
                                 .send(putData);
        expect(res.statusCode).toBe(204);
    });
    
    // DELETE
    test(` - Responds to DELETE /completed/${returnId}`, async () => {
        const res = await request.delete(`/completed/${returnId}`);
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

});



// Test specification for all usable routes
// This series of tests simply checks to make sure a correct HTTP response is given.
// Only successful responses are tested at this time.

const serverApp = require('../server');
const { MongoClient } = require('mongodb');
const superTest = require('supertest');
const { expect } = require('@jest/globals');
const request = superTest(serverApp);

// This will hold the added test document ID so that it can be updated and later deleted. 
// Net result should be zero documents added to the collection.
// More in-depth testing would test to make sure the data is in the expected format.
let returnId = "[OBJECT_ID]";

const thisDate = new Date();

const postPersonData = {
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
const putPersonData = {
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
const postTempleData = {
  templeName: "Cheyenne Wyoming Temple",
  templeAddress: "7680 Bobcat Road, Cheyenne, WY 82009"
}
const putTempleData = {
  templeName: "Rapid City South Dakota Temple",
  templeAddress: "1274 Kenosha Road, Rapid City, SD 57702"
}
const postUserData = {
  userName: "Malachi",
  userPassword: "Turn<3s2Fathers"
}
const putUserData = {
  userName: "Samuel Lamanite",
  userPassword: "ArrowDodger94"
}


describe('Check HTTP status for the following HTTP requests:', () => {

  let connection;
  let _db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI);
    _db = await connection.db('TempleWork');
  });

  afterAll(async () => {
    await connection.close();
  });


  //// ROOT ROUTES
  describe('Miscelleneous Routes: ', () => {
  
    test(' - Receives HTTP 200 upon GET /', async () => {
      const res = await request.get('/');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
  
    test(' - Receives HTTP 200 upon GET /api-docs/', async () => {
      const res = await request.get('/api-docs/');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
  });


  //// COMPLETED
  describe('/COMPLETED endpoint routes:', () => {

    // GET ALL
    test(' - Receives HTTP 200 upon GET /completed', async () => {
      const res = await request.get('/completed');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    // POST
    // Do POST first so we can get a test record ID number for the remaining tests.
    test(' - Receives HTTP 201 upon POST /completed', async () => {
      const res = 
          await request.post('/completed')
                      .send(postPersonData);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      returnId = res.body.insertedId;
      expect(res.statusCode).toBe(201);
    });

    // GET ONE
    test(` - Receives HTTP 200 upon GET /completed/${returnId}`, async () => {
      const res = await request.get(`/completed/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    // PUT
    test(` - Receives HTTP 204 upon PUT /completed/${returnId}`, async () => {
      const res = await request.put(`/completed/${returnId}`)
                              .send(putPersonData);
      expect(res.statusCode).toBe(204);
    });
    
    // DELETE
    test(` - Receives HTTP 200 upon DELETE /completed/${returnId}`, async () => {
      const res = await request.delete(`/completed/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

  });


  //// FAMILY MEMBERS
  describe('/FAMILY-MEMBERS endpoint routes:', () => {

    // GET ALL
    test(' - Receives HTTP 200 upon GET /family-members', async () => {
      const res = await request.get('/family-members');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    // POST
    // Do POST first so we can get a test record ID number for the remaining tests.
    test(' - Receives HTTP 201 upon POST /family-members', async () => {
      const res = 
          await request.post('/family-members')
                      .send(postPersonData);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      returnId = res.body.insertedId;
      expect(res.statusCode).toBe(201);
    });

    // GET ONE
    test(` - Receives HTTP 200 upon GET /family-members/${returnId}`, async () => {
      const res = await request.get(`/family-members/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    // PUT
    test(` - Receives HTTP 204 upon PUT /family-members/${returnId}`, async () => {
      const res = await request.put(`/family-members/${returnId}`)
                              .send(putPersonData);
      expect(res.statusCode).toBe(204);
    });
    
    // DELETE
    test(` - Receives HTTP 200 upon DELETE /family-members/${returnId}`, async () => {
      const res = await request.delete(`/family-members/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

  });


  //// TEMPLES
  describe('/TEMPLES endpoint routes:', () => {

    // GET ALL
    test(' - Receives HTTP 200 upon GET /temples', async () => {
      const res = await request.get('/temples');
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    // POST
    // Do POST first so we can get a test record ID number for the remaining tests.
    test(' - Receives HTTP 201 upon POST /temples', async () => {
      const res =    
          await request.post('/temples')
                        .send(postTempleData);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      returnId = res.body.insertedId;
      expect(res.statusCode).toBe(201);
    });

    // GET ONE
    test(` - Receives HTTP 200 upon GET /temples/${returnId}`, async () => {
      const res = await request.get(`/temples/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    // PUT
    test(` - Receives HTTP 204 upon PUT /temples/${returnId}`, async () => {
      const res = await request.put(`/temples/${returnId}`)
                                .send(putTempleData);
      expect(res.statusCode).toBe(204);
    });
    
    // DELETE
    test(` - Receives HTTP 200 upon DELETE /temples/${returnId}`, async () => {
      const res = await request.delete(`/temples/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
  });


  //// USERS
  describe('/USERS endpoint routes:', () => {

    // There is no GET ALL for /users

    // POST
    // Do POST first so we can get a test record ID number for the remaining tests.
    test(' - Receives HTTP 201 upon POST /users', async () => {
      const res =    
          await request.post('/users')
                        .send(postUserData);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      returnId = res.body.insertedId;
      expect(res.statusCode).toBe(201);
    });

    // GET ONE
    test(` - Receives HTTP 200 upon GET /users/${returnId}`, async () => {
      const res = await request.get(`/users/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
    
    // PUT
    test(` - Receives HTTP 204 upon PUT /users/${returnId}`, async () => {
      const res = await request.put(`/users/${returnId}`)
                                .send(putUserData);
      expect(res.statusCode).toBe(204);
    });
    
    // DELETE
    test(` - Receives HTTP 200 upon DELETE /users/${returnId}`, async () => {
      const res = await request.delete(`/users/${returnId}`);
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
  });


});
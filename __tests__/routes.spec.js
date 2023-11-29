const serverApp = require('../server');
const superTest = require('supertest');
const { MongoClient } = require('mongodb');
const { expect } = require('@jest/globals');
const request = superTest(serverApp);


describe('** Test Non-REST API Endpoint Routes **', () => {

    let connection;
    let _db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        _db = await connection.db('TempleWork');
    });

    afterAll(async () => {
        await connection.close();
    });

    describe ('- Test ROOT enpoint route', () => {
        test(' - Responds to GET /', async () => {
            const res = await request.get('/');
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
        });
    });

    describe('- Test API-DOCS endpoint route', () => {
        test(' - Responds to GET /api-docs/', async () => {
            const res = await request.get('/api-docs/');
            expect(res.header['content-type']).toBe('text/html; charset=utf-8');
            expect(res.statusCode).toBe(200);
        });
    });

});




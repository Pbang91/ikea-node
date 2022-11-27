const request = require('supertest');
const app = require('./../../index');

describe('Test /users', () => {
    it ('should return all users', (done) => {
        request(app).get('/api/users').then((response) => {
            expect(200);
        });
    });
});
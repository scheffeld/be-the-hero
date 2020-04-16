const app = require('../../src/app');
const request = require('supertest');

describe('Incidents', () => {
    it('should be list all incidents', async () => {
        const resUser = await request(app)
        .get('/ongs')
        const id = resUser.body[0].id
        const response = await request(app)
        .get('/incidents')

        expect(response.body).toBeTruthy();
    })
})
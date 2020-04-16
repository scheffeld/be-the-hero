const app = require('../../src/app');
const request = require('supertest');

describe('Authentication', () => {
    it('should validate ONG credentials.', async () => {
        const resUser = await request(app)
        .get('/ongs')
        const id = resUser.body[0].id
        const response = await request(app)
        .post('/sessions')
        .send({ id })

        expect(response.body).toHaveProperty('name')
    })
})
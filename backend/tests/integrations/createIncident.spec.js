const app = require('../../src/app');
const request = require('supertest');

describe('Incidents', () => {
    it('should create incident.', async () => {
        const resUser = await request(app)
        .get('/ongs')
        const id = resUser.body[0].id
        const response = await request(app)
        .post('/incidents')
        .set('Authorization', id)
        .send({
            title: 'Caso Teste',
            description: 'Teste do BackEnd',
            value: 120
        })

        expect(response.body).toHaveProperty('id');
    })
})
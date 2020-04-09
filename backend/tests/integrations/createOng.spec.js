const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/database/connection');
let id = ''

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG.', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAE",
            email: "contato@apae.com.br",
            whatsapp: "16999999999",
            city: "Franca",
            uf: "SP"
        })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})

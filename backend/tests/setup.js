const connection = require('../src/database/connection');

describe('Configure database.', () => {
    beforeAll(async () => {
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy()
    })
})
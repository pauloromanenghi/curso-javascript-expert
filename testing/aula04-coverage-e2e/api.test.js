const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite test', () => {

    describe('/contact', () => {

        it('Should request the contact page end return HTTP Status 200', async() => {
            const response = await request(app)
                            .get('/contact')
                            .expect(200)
            
            assert.deepStrictEqual(response.text, 'contact us page')
        })

    })

    describe('/hello', () => {

        it('Should request an inexistent route /hi and redirect to /hello', async() => {
            const response = await request(app)
                            .get('/hi')
                            .expect(200)
            
            assert.deepStrictEqual(response.text, 'Hello World!')
        })

    })

    describe('/login', () => {

        it('Should login successfully on the login route and return HTTP Status 200', async() => {
            const response = await request(app)
                            .post('/login')
                            .send({
                                username: 'paulo.romanenghi',
                                password: '123'
                            })
                            .expect(200)
            
            assert.deepStrictEqual(response.text, 'Logging has succeeded!')
        })

        it('Should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async() => {
            const response = await request(app)
                            .post('/login')
                            .send({
                                username: 'paulo',
                                password: '123'
                            })
                            .expect(401)
            
            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Logging failed!')
        })

    })

})
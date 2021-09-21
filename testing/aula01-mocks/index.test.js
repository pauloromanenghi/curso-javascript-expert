const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = File.csvToJson(filePath)
        const expected = [
          {
            "name": "Paulo Romanenghi",
            "id": 123,
            "profession": "Javascript",
            "birthDay": 1995
          },
          {
            "name": "Fernando Souza",
            "id": 321,
            "profession": "Javascript Specialist",
            "birthDay": 1940
          },
          {
            "name": "Joice Silva",
            "id": 231,
            "profession": "Java Developer",
            "birthDay": 1990
          }
        ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()
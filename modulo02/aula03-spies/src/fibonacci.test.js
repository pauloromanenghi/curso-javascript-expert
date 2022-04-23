const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const assert = require('assert')

;
(async () => {

    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)

        for await (const i of fibonacci.execute(3)) {}

        // irá iniciar sempre do zero
        const expectedCallCount = 4
        assert.deepStrictEqual(spy.callCount, expectedCallCount)
    }
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        const [...results ] = fibonacci.execute(5)
        // input 5, Current 0, Next 1
        // input 4, Current 1, Next 1
        // input 3, Current 1, Next 2
        // input 2, Current 2, Next 3
        // input 1, Current 3, Next 5
        // input 0 // PARA


        const call = spy.getCall(2)
        const { args } = spy.getCall(2)
        const expectedResult = [0, 1, 1, 2, 3]
        const expectedParams = Object.values({
             input: 3,
             current: 1,
             next: 2
        })

        assert.deepStrictEqual(args, expectedParams)
        assert.deepStrictEqual(results, expectedResult)
    }
})()

import { expect, describe, test, jest, beforeAll } from '@jest/globals'
import Payment from '../src/events/payment'
import Marketing from '../src/observers/marketing'
import Shipment from '../src/observers/shipment'
import PaymentSubject from '../src/subjects/paymentSubject'

describe('Test Suite for Observer Pattern', () => {

    beforeAll(() => {
        jest.spyOn(console, console.log.name).mockImplementation(() => {})
    })

    test('#PaymentSubject notify observers', () => {

        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'
        const expected = data

        subject.subscriber(observer)
        subject.notify(data)
        
        expect(observer.update).toBeCalledWith(expected)

    })

    test('#PaymentSubject shoud not notify  unsubscribed observers', () => {

        const subject = new PaymentSubject()
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world'

        subject.subscriber(observer)
        subject.unsubscribe(observer)
        subject.notify(data)
        
        expect(observer.update).not.toHaveBeenCalled()

    })

    test('#Payment shoud notify subject after a credit card transaction', () => {

        const subject = new PaymentSubject()
        const payment = new Payment(subject)

        const paymentSubjectNotifiedSpy = jest.spyOn(
            payment.paymentSubject,
            payment.paymentSubject.notify.name
        )

        const data = { userName: 'pauloromanenghi', id: Date.now() }
        payment.creditCard(data)

        expect(paymentSubjectNotifiedSpy).toBeCalledWith(data)
        
    })

    test('#All should notify subscribe after a credit card payment', () => {

        const subject = new PaymentSubject()
        const shipment = new Shipment()
        const marketing = new Marketing()


        const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
        const marketingSpy = jest.spyOn(marketing, marketing.update.name)

        subject.subscriber(shipment)
        subject.subscriber(marketing)

        const payment = new Payment(subject)
        const data = { userName: 'pauloromanenghi', id: Date.now() }

        payment.creditCard(data)

        expect(shipmentSpy).toBeCalledWith(data)
        expect(marketingSpy).toBeCalledWith(data)
    })

})
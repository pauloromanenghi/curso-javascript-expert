
export default class PaymentSubject {

    #observers = new Set()

    notify(data) {
        this.#observers.forEach(objserver => objserver.update(data))
    }

    unsubscribe(observable) {
        this.#observers.delete(observable)
    }

    subscriber(observable) {
        this.#observers.add(observable)
    }

}
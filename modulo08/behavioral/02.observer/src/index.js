import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";


const subject = new PaymentSubject()
const marketing = new Marketing()
subject.subscriber(marketing)

const shipment = new Shipment()
subject.subscriber(shipment)

const payment = new Payment(subject)
payment.creditCard({ userName: 'pauloromanenghi', id: Date.now() })

subject.unsubscribe(marketing)

// só irá disparar para a área de shipment
payment.creditCard({ userName: 'fernanda', id: Date.now()})
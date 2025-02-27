import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@sdawesdevelopment/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@sdawesdevelopment/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

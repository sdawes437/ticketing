import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@sdawesdevelopment/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

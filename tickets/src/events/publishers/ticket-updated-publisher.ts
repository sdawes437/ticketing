import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@sdawesdevelopment/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

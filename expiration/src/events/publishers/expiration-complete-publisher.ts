import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@sdawesdevelopment/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

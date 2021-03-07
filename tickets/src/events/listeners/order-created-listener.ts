import { Message } from "node-nats-streaming";
import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@sdawesdevelopment/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving

    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Mark the ticket as being reserved by setting its order Id property
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();

    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      price: ticket.price,
    });

    // ack the message

    msg.ack();
  }
}

import {
  Listener,
  OrderCreatedEvent,
  Subjects,
  OrderStatus,
} from "@sdawesdevelopment/common";
import { Order } from "../../models/order";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      version: data.version,
      price: data.ticket.price,
      userId: data.userId,
      status: OrderStatus.AwaitingPayment,
    });

    await order.save();

    msg.ack();
  }
}

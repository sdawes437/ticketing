import { OrderCancelledEvent, OrderStatus } from "@sdawesdevelopment/common";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: orderId,
    version: 0,
    price: 20,
    userId: "asf",
    status: OrderStatus.Created,
  });

  await order.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 1,
    ticket: {
      id: "sad",
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, order };
};

it("sets the order status to cancelled", async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

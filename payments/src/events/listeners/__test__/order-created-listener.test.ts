import { OrderCreatedEvent, OrderStatus } from "@sdawesdevelopment/common";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asdf",
    expiresAt: "asdfsd",
    ticket: {
      id: "sad",
      price: 10,
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it("repicates the order info", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

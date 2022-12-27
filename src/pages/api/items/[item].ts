import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../server/prisma";
import { Item } from "../../../types/items";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE":
      const itemQuerySchema = z.object({ item: z.string() });
      const partialItem = itemQuerySchema.safeParse(req.query);

      if (!partialItem.success) {
        return res.status(400).end();
      }

      await prisma.item.delete({ where: { name: partialItem.data.item } });
      break;
    case "PUT":
      const item = Item.safeParse(req.body);

      if (!item.success) {
        return res.status(400).end();
      }

      const { name, price, quantity } = item.data;

      await prisma.item.upsert({
        where: { name: name },
        update: {
          price: price,
          quantity: quantity,
        },
        create: { name: name, price: price, quantity: quantity },
      });
      break;
    default:
      return res.status(405).end();
  }

  res.status(204).end();
}

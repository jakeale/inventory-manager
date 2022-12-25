import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../server/prisma";

export const itemSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const validation = itemSchema.safeParse(req.query);
  if (!validation.success) {
    res.status(400).end();
  }

  const item = req.query.item as string;

  switch (req.method) {
    case "PUT":
      const price = parseFloat(req.body.price);
      const quantity = parseInt(req.body.quantity);

      await prisma.item.upsert({
        where: { name: item },
        update: {
          price: price,
          quantity: quantity,
        },
        create: { name: item, price: price, quantity: quantity },
      });
      break;
    case "DELETE":
      await prisma.item.delete({ where: { name: item } });
      break;
    default:
      res.status(405).end();
      break;
  }

  res.status(204).end();
}

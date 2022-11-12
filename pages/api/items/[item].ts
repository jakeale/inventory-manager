import { Item } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../backend/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const item = req.query.item as string;

  if (req.method === "PUT" || req.method === "POST") {
    const price = parseFloat(req.body.price);
    const quantity = parseInt(req.body.quantity);

    await prisma.item.upsert({
      where: { name: item },
      update: {
        price: price,
        quantity: quantity,
      },
      create: { name: item, price: price, quantity: price },
    });
  } else if (req.method === "DELETE") {
    await prisma.item.delete({ where: { name: item } });
  }
  return res.status(200).end();
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../backend/prisma";
import { Item } from "../../../types/items";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
  return res.status(200).json(
    await prisma.item.findMany({
      select: { name: true, price: true, quantity: true },
    })
  );
}

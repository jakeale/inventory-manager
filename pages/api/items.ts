// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Item } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../backend/prisma";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
  res.status(200).send(await prisma.item.findMany());
}

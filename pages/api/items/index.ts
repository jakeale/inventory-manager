// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Item } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../backend/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[]>
) {
  return res.status(200).json(await prisma.item.findMany());
}

import { z } from "zod";

export const Item = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
});

export type Item = z.infer<typeof Item>;

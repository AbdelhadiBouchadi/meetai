import { db } from '@/database';
import { agents } from '@/database/schema';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import { TRPCError } from '@trpc/server';

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    return data;
  }),
});

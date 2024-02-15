import { publicProcedure } from "../trpc/trpc";

function handler() {
  return {
    now: new Date(),
  };
}

export const thedate = publicProcedure.query(handler);

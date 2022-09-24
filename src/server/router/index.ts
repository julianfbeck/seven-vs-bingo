// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { projectionRouter } from "./projection";
import { rankingRouter } from "./ranking";
import { bingoEntriesRouter } from "./bingo-entries";
import { pointsRouter } from "./points";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("projection.", projectionRouter)
  .merge("auth.ranking.", rankingRouter)
  .merge("auth.bingoEntries", bingoEntriesRouter)
  .merge("auth.points", pointsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { projectionRouter } from "./projection";
import { rankingRouter } from "./ranking";
import { bingoEntriesRouter } from "./bingo-entries";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("projection.", projectionRouter)
  .merge("auth.ranking.", rankingRouter)
  .merge("auth.bingoEntries", bingoEntriesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
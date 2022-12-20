import * as duckdb from "@duckdb/duckdb-wasm";
// @ts-ignore  
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm";
// @ts-ignore  
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm";


export const defaultQuery = `/* Quack */

SELECT
  num
FROM generate_series(1, 100) AS _(num)
;`;

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js",
      import.meta.url
    ).toString(),
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js",
      import.meta.url
    ).toString(),
  },
};

export const initializeDuckDb = async () => {
  // Select a bundle based on browser checks
  const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);

  // Instantiate the asynchronus version of DuckDB-wasm
  const worker = new Worker(bundle.mainWorker!);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

  return db;
}
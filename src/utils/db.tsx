import * as duckdb from "@duckdb/duckdb-wasm";
// @ts-ignore  
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm";
// @ts-ignore  
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm";

import * as arrow from 'apache-arrow'

import { ExecutedQuery } from './types';

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

export const duckDb = async () => {
  // Select a bundle based on browser checks
  const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);

  // Instantiate the asynchronus version of DuckDB-wasm
  const worker = new Worker(bundle.mainWorker!);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

  return db;
}

let nextId = 1;
export async function runQuery(db: Promise<duckdb.AsyncDuckDB> | undefined, query: string) {
  const startTime = Date.now();
  const conn = await db?.then(d => d.connect());

  let result: arrow.Table | undefined;
  let error: Error | undefined;
  let status: string = "UNKNOWN";

  try {
    result = await conn?.query(query);
    status = "SUCCESS"

  } catch (e) {
    if (e instanceof Error) {
      error = e;
      status = "FAILURE"
    }
  }

  const endTime = Date.now();
  await conn?.close();

  return {
    id: nextId++,
    text: query,
    data: result,
    startTime: new Date(startTime).toLocaleString(),
    duration: endTime - startTime,
    status: status,
    error: error
  }
}
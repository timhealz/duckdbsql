import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Editor from "@monaco-editor/react";

import * as duckdb from "@duckdb/duckdb-wasm";
// @ts-ignore  
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm";
// @ts-ignore  
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm";

import TopBar from './TopBar';
import BottomPanel from "./BottomPanel";
import { DrawerHeader } from './styles';


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

const defaultQuery = `/* Quack */

SELECT
  num
FROM generate_series(1, 100) AS _(num)
;`;

export default function QueryEnvironment() {
  const [query, setQuery] = React.useState(defaultQuery);
  function handleEditorChange(value: any, event:any) {
    setQuery(value);
  }

  const editorOptions = {
    "scrollBeyondLastLine": false,
  };

  const [db, setDb] = React.useState<Promise<duckdb.AsyncDuckDB>>()
  React.useEffect(() => {
    const initializeDb = async () => {
      // Select a bundle based on browser checks
      const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
      
      // Instantiate the asynchronus version of DuckDB-wasm
      const worker = new Worker(bundle.mainWorker!);
      const logger = new duckdb.ConsoleLogger();
      const db = new duckdb.AsyncDuckDB(logger, worker);
      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

      return db;
    }

    setDb(initializeDb())
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
        <TopBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Stack
              direction="column"
              justifyContent="space-evenly"
              spacing={1}
          >
            <Box>
                <Editor
                    value={query}
                    onChange={handleEditorChange}
                    language="sql"
                    /*theme="vs-dark"*/
                    height="50vh"
                    options={editorOptions}
                />
            </Box>
            <BottomPanel query={query} db={db} />
          </Stack>
      </Box>
    </Box>
  );
}
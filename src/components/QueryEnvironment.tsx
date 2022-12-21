import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Editor from "@monaco-editor/react";

import * as duckdb from "@duckdb/duckdb-wasm";

import TopBar from './TopBar';
import BottomPanel from "./BottomPanel";
import { DrawerHeader } from '../utils/styles';
import { defaultQuery, initializeDuckDb } from '../utils/db'


export default function QueryEnvironment() {
  const [activeQuery, setActiveQuery] = React.useState(defaultQuery);
  function handleEditorChange(value: any, event:any) {
    setActiveQuery(value);
  }

  const [db, setDb] = React.useState<Promise<duckdb.AsyncDuckDB>>()
  React.useEffect(() => {
    setDb(initializeDuckDb())
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
                    value={activeQuery}
                    onChange={handleEditorChange}
                    language="sql"
                    /*theme="vs-dark"*/
                    height="50vh"
                    options={{
                      "scrollBeyondLastLine": false,
                    }}
                />
            </Box>
            <BottomPanel activeQuery={activeQuery} setActiveQuery={setActiveQuery} db={db} />
          </Stack>
      </Box>
    </Box>
  );
}
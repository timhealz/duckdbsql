import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import Editor from "@monaco-editor/react";

import * as duckdb from "@duckdb/duckdb-wasm";

import TopBar from './TopBar';
import BottomPanel from "./BottomPanel";
import { defaultQuery, duckDb } from '../utils/db'
import { Paper } from '@mui/material';



export default function QueryEnvironment() {
  const theme = useTheme();

  const [activeQuery, setActiveQuery] = React.useState(defaultQuery);
  function handleEditorChange(value: any, event:any) {
    setActiveQuery(value);
  }

  const [db, setDb] = React.useState<Promise<duckdb.AsyncDuckDB>>()
  React.useEffect(() => {
    setDb(duckDb())
  }, [])

  return (
    <Stack               
      direction="column"
      justifyContent="space-evenly"
      spacing={1}
    >
        <TopBar />
          <Paper>
          <Editor
              value={activeQuery}
              onChange={handleEditorChange}
              language="sql"
              theme={theme.palette.mode === 'dark' ? "vs-dark" : "light"}
              height="50vh"
              options={{
                "scrollBeyondLastLine": false,
              }}
          />
          </Paper>
          <BottomPanel activeQuery={activeQuery} setActiveQuery={setActiveQuery} db={db} />
    </Stack>
  );
}
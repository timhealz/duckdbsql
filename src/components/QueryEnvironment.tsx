import * as React from 'react';

import { useTheme } from '@mui/material/styles';

import Editor from "@monaco-editor/react";

import * as duckdb from "@duckdb/duckdb-wasm";

import TopBar from './TopBar';
import BottomPanel from "./BottomPanel";
import { defaultQuery, duckDb } from '../lib/db'
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
    <Paper>
        <TopBar />
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
        <BottomPanel activeQuery={activeQuery} setActiveQuery={setActiveQuery} db={db} />
    </Paper>
  );
}
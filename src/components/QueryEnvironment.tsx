import * as React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Editor from "@monaco-editor/react";

import TopBar from './TopBar';
import BottomPanel from "./BottomPanel";
import { DuckDBProvider } from '../lib/DuckDBProvider';
import { DrawerHeader } from './styles';


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

  const dbProvider = new DuckDBProvider();

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
            <BottomPanel query={query} dbProvider={dbProvider} />
          </Stack>
      </Box>
    </Box>
  );
}
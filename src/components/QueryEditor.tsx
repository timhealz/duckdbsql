import * as React from 'react';
import Box from '@mui/material/Box';

import Editor from "@monaco-editor/react";


interface QueryEditorProps {
    query: string,
    handleChange: any
}

export default function QueryEditor({ query, handleChange }: QueryEditorProps): JSX.Element {
    const options = {
        "scrollBeyondLastLine": false,
    };

    return (
        <Box>
            <Editor
                value={query}
                onChange={handleChange}
                language="sql"
                /*theme="vs-dark"*/
                height="50vh"
                options={options}
            />
        </Box>
    );
};


import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

import { ExecutedQuery } from './types';


interface QueryLogProps {
    queryHistory: ExecutedQuery[],
    setActiveQuery: React.Dispatch<React.SetStateAction<string>>
}
export default function QueryLog({ queryHistory, setActiveQuery }: QueryLogProps) {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
        >
        {queryHistory.map(executedQuery => (
            <Card sx={{ width: "100%" }}>
                <CardContent>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Typography gutterBottom variant="h6" component="div">
                    Query {executedQuery.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Start Time: {executedQuery.startTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Duration: {executedQuery.duration} ms
                    </Typography>
                    <Editor
                        value={executedQuery.text}
                        language="sql"
                        height="15vh"
                        options={{
                          "readOnly": true,
                          "scrollBeyondLastLine": false,
                          "minimap": {"enabled": false}
                        }}
                    />
                </Stack>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => {
                            setActiveQuery(executedQuery.text)
                        }
                    }>
                        Revert
                    </Button>
                </CardActions>
            </Card>
        ))}
        </Stack>
    );
}
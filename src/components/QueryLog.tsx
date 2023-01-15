import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Editor from "@monaco-editor/react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';

import { ExecutedQuery } from '../types/ExecutedQuery';


interface QueryLogProps {
    queryHistory: ExecutedQuery[],
    setActiveQuery: React.Dispatch<React.SetStateAction<string>>
}
export default function QueryLog({ queryHistory, setActiveQuery }: QueryLogProps) {
    const theme = useTheme();
    
    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
        >
        {queryHistory.map(executedQuery => (
            <Card sx={{ width: "100%" }}>
                <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                > 
                    <Typography gutterBottom variant="h6" component="div">
                        Query {executedQuery.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {executedQuery.startTime}
                    </Typography>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                > 
                <Editor
                    value={executedQuery.text}
                    language="sql"
                    theme={theme.palette.mode === 'dark' ? "vs-dark" : "light"}
                    height="15vh"
                    options={{
                        "readOnly": true,
                        "scrollBeyondLastLine": false,
                        "minimap": {"enabled": false}
                    }}
                />
                {executedQuery.status === "ERROR" &&
                   <Typography variant="body2" color="error">
                    {executedQuery.error?.message}
                   </Typography>
                }
                </Stack>
                </CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ "paddingRight": "10px"}}
                >
                    <CardActions>
                        <Button
                            size="small"
                            color="inherit"
                            onClick={() => {setActiveQuery(executedQuery.text)}}
                        >
                            Revert
                        </Button>
                    </CardActions>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                    <Chip
                        icon={<TimerOutlinedIcon />}
                        label={executedQuery.duration + " ms"}
                        color={executedQuery.status === "SUCCESS" ? "success" : "error"}
                    />
                    <Chip
                        icon={<DatasetOutlinedIcon />}
                        label={executedQuery.data?.numRows?.toLocaleString('en-US') + " rows"}
                        color={executedQuery.status === "SUCCESS" ? "success" : "error"}
                    />
                    </Stack>
                </Stack>
            </Card>
        ))}
        </Stack>
    );
}
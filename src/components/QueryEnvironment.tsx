import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import QueryEditor from './QueryEditor';
import BottomPanel from "./BottomPanel";

import { defaultQuery, DrawerHeader } from '../constants'


export default function QueryEnvironment() {
    const [query, setQuery] = React.useState(defaultQuery);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Stack
                direction="column"
                justifyContent="space-evenly"
                spacing={1}
            >
                <QueryEditor query={query} handleChange={handleChange} />
                <BottomPanel query={query} />
            </Stack>
        </Box>
    );
}
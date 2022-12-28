import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function DataSourceConfigJSON() {
    return (
        <Stack
            component="form"
            noValidate
            autoComplete="off"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0.5}
        >
            <TextField
                id="filled-basic"
                label="Schema"
                variant="filled"
                sx={{ "width": "20ch" }}
            />
            <TextField
                id="filled-basic"
                label="Shape"
                variant="filled"
                sx={{ "width": "20ch" }}
            />
        </Stack>
    );
}


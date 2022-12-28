import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function DataSourceDialog() {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <TextField
            id="table-name"
            label="Table name"
            variant="filled"
            fullWidth={true}
            />
            <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0.5}
            >
            <TextField
                id="filled-basic"
                label="Delimiter"
                variant="filled"
                sx={{ "width": "20ch" }}
            />
            <TextField
                id="filled-basic"
                label="Quote Character"
                variant="filled"
                sx={{ "width": "20ch" }}
            />
            <FormControlLabel
                label="Header row"
                color="secondary"
                control={<Switch defaultChecked />}
            />
            </Stack>
        </Box>
    );
}


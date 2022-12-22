import * as React from 'react';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';


function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

interface DataSourceConfigProps {
    open: boolean,
    handleClose: any
}
export default function DataSourceConfig({ open, handleClose }: DataSourceConfigProps) {
    const [dataSourceType, setDataSourceType] = React.useState('');

    const handleDataSourceTypeChange = (event: SelectChangeEvent) => {
        setDataSourceType(event.target.value as string);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
            <DialogTitle>Data Sources</DialogTitle>
            <DialogContent>
            <Stack 
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
            >
            <FormControl fullWidth={true} sx={{ "paddingTop": "10px" }}>
                <InputLabel id="data-source-type-selector">Data Source Types</InputLabel>
                <Select
                labelId="data-source-type-selector"
                id="data-source-type"
                value={dataSourceType}
                label="Data Source type"
                onChange={handleDataSourceTypeChange}
                >
                <MenuItem value={10}>Parquet</MenuItem>
                <MenuItem value={20}>CSV</MenuItem>
                <MenuItem value={30}>JSON</MenuItem>
                </Select>
            </FormControl>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6">
                My Data Source Configs
            </Typography>
            <List>
            {generate(
                <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                    </IconButton>
                }
                >
                <ListItemAvatar>
                    <Avatar>
                    <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Single-line item"
                />
                </ListItem>,
            )}
            </List>
            </Stack>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
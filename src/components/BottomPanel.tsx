import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import OutputTable from './QueryOutput';
import QueryRunButton from './QueryRunButton';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BottomPanelProps {
  query: string,
}

export default function BottomPanel({ query }: BottomPanelProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Output" {...a11yProps(0)} />
          <Tab label="Logs" {...a11yProps(1)} />
        </Tabs>
        <QueryRunButton query={query}/>
      </Grid>
      <TabPanel value={value} index={0}>
        <OutputTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Query Logs
      </TabPanel>
    </Box>
  );
}


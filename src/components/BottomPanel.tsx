import * as React from 'react';

import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import * as arrow from 'apache-arrow';

import OutputTable from './QueryOutput';
import { DuckDBProvider } from '../lib/DuckDBProvider';


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
  dbProvider: DuckDBProvider,
}

export default function BottomPanel({ query, dbProvider }: BottomPanelProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [queryResult, setQueryResult] = React.useState<(arrow.Table)>();
  const runQuery = async () => {
    await dbProvider.initialize();
    const result: arrow.Table = await dbProvider.runQuery(query);

    setQueryResult(result);
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
        <Button
            variant="contained"
            color="secondary"
            onClick={runQuery}
        >
            Run
        </Button>
      </Grid>
      <TabPanel value={value} index={0}>
        <OutputTable queryResult={queryResult}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Query Logs
      </TabPanel>
    </Box>
  );
}


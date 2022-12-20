import * as React from 'react';

import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import * as duckdb from "@duckdb/duckdb-wasm";

import * as arrow from "apache-arrow";

import OutputTable from './QueryOutput';
import { makeTable } from 'apache-arrow';


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
  db: Promise<duckdb.AsyncDuckDB> | undefined,
}

export default function BottomPanel({ query, db }: BottomPanelProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [queryResult, setQueryResult] = React.useState<arrow.Table<any> | undefined>(
    makeTable({
      key: new Int8Array([1, 2, 3]),
      val: new Int8Array([1, 2, 3]),
    })
  );
  const runQuery = async () => {
    const conn = await db?.then(d => d.connect());
    const result: arrow.Table | undefined = await conn?.query(query);
    await conn?.close();
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


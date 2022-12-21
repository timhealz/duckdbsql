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
import QueryLog from './QueryLog';
import { ExecutedQuery } from './types';


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

let nextId = 1;

interface BottomPanelProps {
  activeQuery: string,
  setActiveQuery: React.Dispatch<React.SetStateAction<string>>,
  db: Promise<duckdb.AsyncDuckDB> | undefined,
}

export default function BottomPanel({ activeQuery, setActiveQuery, db }: BottomPanelProps) {
  const [tabIndex, settabIndex] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newtabIndex: number) => {
    settabIndex(newtabIndex);
  };

  const [queryResult, setQueryResult] = React.useState<arrow.Table<any> | undefined>(
    makeTable({
      key: new Int8Array([1, 2, 3]),
      val: new Int8Array([1, 2, 3]),
    })
  );
  const [queryHistory, setQueryHistory] = React.useState<ExecutedQuery[]>([]);

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
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Output" {...a11yProps(0)} />
          <Tab label="Logs" {...a11yProps(1)} />
        </Tabs>
        <Button
            variant="contained"
            color="secondary"
            onClick={
              async () => {
                const conn = await db?.then(d => d.connect());
                const startTime = Date.now();
                const result: arrow.Table | undefined = await conn?.query(activeQuery);
                const endTime = Date.now();
                await conn?.close();

                setQueryResult(result);
                settabIndex(0);
                setQueryHistory([
                  {
                    id: nextId++,
                    text: activeQuery,
                    startTime: new Date(startTime).toLocaleString(),
                    duration: endTime - startTime
                  },
                  ...queryHistory,
                ]);
              }
            }>
            Run
        </Button>
      </Grid>
      <TabPanel value={tabIndex} index={0}>
        <OutputTable queryResult={queryResult}/>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <QueryLog queryHistory={queryHistory} setActiveQuery={setActiveQuery} />
      </TabPanel>
    </Box>
  );
}


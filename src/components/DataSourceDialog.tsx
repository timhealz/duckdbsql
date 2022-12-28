import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import DataSourceConfigCSV from './DataSourceConfigCSV';


interface DataSourceConfigProps {
    open: boolean,
    handleClose: any
}
export default function DataSourceDialog({ open, handleClose }: DataSourceConfigProps) {
    const [dataSourceType, setDataSourceType] = React.useState('');

    const handleDataSourceTypeChange = (event: SelectChangeEvent) => {
        setDataSourceType(event.target.value as string);
    };

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true}>
          <DialogTitle>Add a Data Source</DialogTitle>
          <Box sx={{ "margin": "10px"}}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key="Choose a data source type">
                <StepLabel>
                  Choose a data source type
                </StepLabel>
                <StepContent>
                    <FormControl fullWidth={true} sx={{ "marginTop": "10px" }}>
                    <InputLabel id="data-source-type-selector-label">Data Sources</InputLabel>
                      <Select
                          labelId="data-source-type-selector"
                          id="data-source-type"
                          value={dataSourceType}
                          label="Data Source type"
                          onChange={handleDataSourceTypeChange}
                      >
                        <MenuItem value={10}>CSV</MenuItem>
                        <MenuItem value={20}>JSON</MenuItem>
                        <MenuItem value={30}>Arrow</MenuItem>
                      </Select>
                    </FormControl>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          disabled={dataSourceType === ''}
                          variant="contained"
                          color="secondary"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                        <Button
                          disabled={true}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
              </Step>
              <Step key="Configure your data source">
                <StepLabel>
                  Configure your data source
                </StepLabel>
                <StepContent>
                  {
                    {
                      '10': <DataSourceConfigCSV />,
                    }[dataSourceType]
                  }
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              <Step key="Upload your data">
                <StepLabel>
                  Upload your data
                </StepLabel>
                <StepContent>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              <Step key="Choose a table name">
                <StepLabel>
                  Choose a table name
                </StepLabel>
                <StepContent>
                  <TextField
                    id="table-name"
                    label="Table name"
                    variant="filled"
                    fullWidth={true}
                  />
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                      <Button
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
            {activeStep === 4 && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button
                  color="inherit"
                  onClick={handleReset}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
          </DialogActions>
        </Dialog>
    );
}


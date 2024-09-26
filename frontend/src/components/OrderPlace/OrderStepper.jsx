import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = [
    'Shipping Details',
    'Confirm Order',
    'Payment',
  ];
function OrderStepper({index}) {

    return (
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={index} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      );
}

export default OrderStepper
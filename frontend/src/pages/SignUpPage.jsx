import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Box,
  Container,
  Button,
  Typography,
} from '@mui/material';
import { theme } from '../lib/utils/Theme';

export default function SignUpPage() {
  const initialFValues = {
    Email: '',
    Password: '',
  };

  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with values:', values);
    // Add additional logic for handling form data, such as making an API request
  };

  return (
    <Container
      sx={{
        bgcolor: theme.palette.third.bg,
        color: theme.palette.secondary.contrastText,
      }}
    >
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h3"
          color={'primary.main'}
          sx={{
            textAlign: 'center',
            mb: 3,
          }}
        >
          Sign Up
        </Typography>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-around' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <Grid item margin={5} spacing={3}>
            <TextField
              variant="filled"
              label="Email"
              value={values.Email}
              fullWidth
              onChange={handleInputChange('Email')}
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.third.main,
                },
                mb: 5,
              }}
            />
            <TextField
              variant="filled"
              label="Password"
              value={values.Password}
              fullWidth
              onChange={handleInputChange('Password')}
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.third.main,
                },
                mb: 5,
              }}
            />

            <Box textAlign="center">
              <Button
                variant="contained"
                
                color="primary"
                type="submit"
                sx={{ width: '200px', height: '50px', borderRadius: '50px' }}
              >
                Sign Up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

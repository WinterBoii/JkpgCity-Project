import React, { useState } from 'react';
import { Grid, TextField, Box, Container, Select, MenuItem, InputLabel, FormControl, Button, Typography } from '@mui/material';
import { theme } from '../lib/utils/Theme';

export default function CreateStorePage() {
  const initialFValues = {
    Name: '',
    Url: '',
    District: '',
    Category: '',
  };

  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log('Form submitted:', values);
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
        sx={{}}
      >
        <Typography 
        variant="h3" 
        color={'primary.main'}
        sx={{ 
            textAlign: 'center',
             mb: 3 }}>
          Add a Store
        </Typography>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-around' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <Grid item margin={5} spacing={3}>
            <TextField
              variant="filled"
              label="Name"
              value={values.Name}
              fullWidth
              onChange={handleInputChange('Name')}
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
              label="Url"
              value={values.Url}
              fullWidth
              onChange={handleInputChange('Url')}
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.third.main,
                },
                mb: 5,
              }}
            />
            <FormControl fullWidth variant="filled" sx={{ mb: 5 }}>
              <InputLabel id="district-label">District</InputLabel>
              <Select
                labelId="district-label"
                value={values.District}
                onChange={handleInputChange('District')}
                label="District"
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.secondary.main,
                    backgroundColor: theme.palette.third.main,
                  },
                  
                }}
              >
                <MenuItem value="district1">District 1</MenuItem>
                <MenuItem value="district2">District 2</MenuItem>
                <MenuItem value="district3">District 3</MenuItem>
                
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled" sx={{ mb: 5 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={values.Category}
                onChange={handleInputChange('Category')}
                label="Category"
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.secondary.main,
                    backgroundColor: theme.palette.third.main,
                  },
                  mb: 5,
                }}
              >
                <MenuItem value="category1">Kläder och Accessoarer</MenuItem>
                <MenuItem value="category2">Elektronik</MenuItem>
                <MenuItem value="category3">Mat och Livsmedel</MenuItem>
                <MenuItem value="category4">Heminredning</MenuItem>
                <MenuItem value="category5">Konst och Hantverk</MenuItem>
                <MenuItem value="category6">Sport och Fritid</MenuItem>
                <MenuItem value="category7">Hälsa och Skönhet</MenuItem>
                <MenuItem value="category8">Övrigt</MenuItem>
              </Select>
            </FormControl>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '200px', height: '50px' }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

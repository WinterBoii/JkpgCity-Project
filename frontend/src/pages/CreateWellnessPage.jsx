import React, { useState } from 'react';
import { Grid, TextField, Box, Container, Select, MenuItem, InputLabel, FormControl, Button, Typography } from '@mui/material';
import { theme } from '../lib/utils/Theme';

export default function CreateWellnessPage() {
  const initialFValues = {
    Name: '',
    Url: '',
    Rating: '',
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
          Add a Wellness
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
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                value={values.Rating}
                onChange={handleInputChange('Rating')}
                label="Rating"
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.secondary.main,
                    backgroundColor: theme.palette.third.main,
                  },
                  
                }}
              >
                <MenuItem value="rating1">1</MenuItem>
                <MenuItem value="rating2">2</MenuItem>
                <MenuItem value="rating3">3</MenuItem>
                <MenuItem value="rating3">4</MenuItem>
                <MenuItem value="rating3">5</MenuItem>
                
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
                <MenuItem value="category1">Skönhetssalonger och Hudvårdskliniker</MenuItem>
                <MenuItem value="category2">Frisörsalonger och Barberare</MenuItem>
                <MenuItem value="category3">Fittnesscenter och Träningsstudior</MenuItem>
                <MenuItem value="category4">Massage och Spa</MenuItem>
                <MenuItem value="category5">Yoga och Meditation</MenuItem>
                <MenuItem value="category6">Tatueringssalonger</MenuItem>
                <MenuItem value="category7">Nagelsalonger</MenuItem>
                <MenuItem value="category8">Hälsokliner</MenuItem>
              </Select>
            </FormControl>
            <Box textAlign="center">
              <Button
                size='large'
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    width: '200px', 
                    height: '50px',
                    marginLeft: '1rem',
					borderRadius: '24px',
					paddingX: '2rem',
					textTransform: 'none',
                }}
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

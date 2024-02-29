import { useState, useContext, useEffect } from 'react';
import { Grid, TextField, Box, Container, Select, MenuItem, InputLabel, FormControl, Button, Typography } from '@mui/material';
import { theme } from '../lib/utils/Theme';
import AuthContext from '../lib/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:3001';

export default function CreateStorePage() {
  const [errMsg, setErrMsg] = useState('');
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const initialFValues = {
    name: '',
    url: '',
    district: '',
    category: '',
  };

  const [values, setValues] = useState(initialFValues);

    useEffect(() => {
			if (!auth.user) {
				navigate('/login');
			}
		}, [auth.user, navigate]);

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

	const handleSubmit = async (event) => {
		event.preventDefault();

    if (!auth.user) {
			setErrMsg('You must be logged in to create a store');
			return;
		}
		// Check if district is "övrigt" and null it before submission
		const formValues = { ...values };
		if (formValues.district === 'övrigt') {
			formValues.district = null;
		}

		try {
			const response = await axios.post(baseUrl + '/create', formValues);

			if (response.status === 200) {
				// Redirect to success page
				navigate('/stores');
			} else {
				throw new Error('Failed to create store');
			}
		} catch (error) {
			console.error('Creation error:', error);
			setErrMsg('Unknown error occurred. Please try again later.');
		}
	};

  return (
		<Container
			maxWidth='lg'
			sx={{
				bgcolor: theme.palette.third.bg,
				mt: '5rem',
				borderRadius: 13,
			}}
		>
			<Box
				component='form'
				noValidate
				onSubmit={handleSubmit}
				sx={{
					m: '5rem',
					color: theme.palette.third.text,
				}}
			>
				<Typography
					variant='h3'
					sx={{
						textAlign: 'center',
						mb: 3,
						pt: 5,
					}}
				>
					Add a Store
				</Typography>
				<Grid
					justifyContent={{ xs: 'center', md: 'space-around' }}
					alignItems={{ xs: 'center', md: 'flex-start' }}
				>
					{errMsg ? (
						<Typography sx={{ textAlign: 'center', color: 'red', mb: 2 }}>
							{errMsg}
						</Typography>
					) : null}
					<TextField
						variant='filled'
						label='Name'
						value={values.name}
						fullWidth
						onChange={handleInputChange('name')}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
							mb: 5,
						}}
					/>
					<TextField
						variant='filled'
						label='Url'
						value={values.url}
						fullWidth
						onChange={handleInputChange('url')}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
							mb: 5,
						}}
					/>
					<FormControl
						fullWidth
						variant='filled'
						sx={{ mb: 5 }}
					>
						<InputLabel id='district-label'>District</InputLabel>
						<Select
							labelId='district-label'
							value={values.district}
							onChange={handleInputChange('district')}
							label='District'
							sx={{
								'& .MuiInputBase-input': {
									color: theme.palette.third.text,
									backgroundColor: theme.palette.third.main,
								},
								width: '100%',
							}}
						>
							<MenuItem value='district1'>Atollen</MenuItem>
							<MenuItem value='district2'>Resecentrum</MenuItem>
							<MenuItem value='district3'>Tändsticksområdet</MenuItem>
							<MenuItem value='district3'>Väster</MenuItem>
							<MenuItem value='district3'>Öster</MenuItem>
							<MenuItem value='district3'>Övrigt</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						fullWidth
						variant='filled'
						sx={{ mb: 5 }}
					>
						<InputLabel id='category-label'>Category</InputLabel>
						<Select
							labelId='category-label'
							value={values.category}
							onChange={handleInputChange('category')}
							label='Category'
							sx={{
								'& .MuiInputBase-input': {
									color: theme.palette.third.text,
									backgroundColor: theme.palette.third.main,
								},
								mb: 5,
							}}
						>
							<MenuItem value='category1'>Kläder och Accessoarer</MenuItem>
							<MenuItem value='category2'>Elektronik</MenuItem>
							<MenuItem value='category3'>Mat och Livsmedel</MenuItem>
							<MenuItem value='category4'>Heminredning</MenuItem>
							<MenuItem value='category5'>Konst och Hantverk</MenuItem>
							<MenuItem value='category6'>Sport och Fritid</MenuItem>
							<MenuItem value='category7'>Hälsa och Skönhet</MenuItem>
							<MenuItem value='category8'>Övrigt</MenuItem>
						</Select>
					</FormControl>
					<Box textAlign='center'>
						<Button
							variant='contained'
							type='submit'
							sx={{
								borderRadius: '24px',
								paddingX: '2rem',
								mb: 5,
								textTransform: 'none',
							}}
						>
							<Typography variant='h5'>Add</Typography>
						</Button>
					</Box>
				</Grid>
			</Box>
		</Container>
	);
}

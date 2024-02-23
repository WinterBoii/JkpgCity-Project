// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import bgImg from '../assets/background.jpg';
import { theme } from '../lib/utils/Theme';
import axios from 'axios'

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='white'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link
				color='inherit'
				href='#'
			>
				JkpgCity
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function SignInSide() {
	const [checked, setChecked] = React.useState(false);
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleCheck = (event) => {
		setChecked(event.target.checked);
	};
	const login = async (email, password) => {
		try {
			const response = await axios.post('api/login', {
				email,
				password,
			});
			//const { token } = response.data;
			//localStorage.setItem('token', token);
			console.log(response.data);
			return true;
		} catch (error) {
			return false;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		try {
			const response = await axios.post('api/login', {
				email: data.get('email'),
				password: data.get('password'),
			});
			console.log(response);
			if (!response.data.success) throw new Error('Failed to sign in');
			window.location.reload();
			// handle response
		} catch (error) {
			// handle error
		}
	};

	return (
		<Grid
			container
			component='main'
			sx={{ height: '100vh', width: '100vw' }}
		>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(${bgImg})`,
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			></Grid>

			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
				container
				justifyContent={'center'}
				alignItems={'center'}
				sx={{
					backgroundColor: 'secondary.main',
				}}
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography
						component='h1'
						variant='h3'
						color={'third.main'}
					>
						Jönköping City
					</Typography>

					<Divider variant='inset' />

					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							sx={{
								'& .MuiInputBase-input': {
									color: theme.palette.secondary.main,
									backgroundColor: theme.palette.third.main,
								},
							}}
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							sx={{
								'& .MuiInputBase-input': {
									color: theme.palette.secondary.main,
									backgroundColor: theme.palette.third.main,
								},
							}}
						/>
						<Grid
							container
							justifyContent={'space-between'}
						>
							<FormControlLabel
								control={
									<Checkbox
										value='remember'
										checked={checked}
										onChange={handleCheck}
										color='third'
									/>
								}
								label='Remember me'
								style={{ color: theme.palette.secondary.contrastText }}
							/>

							<Button
								onClick={() => login(email, password)}
								type='submit'
								variant='contained'
								color='secondary'
								sx={{
									mt: 2,
									mb: 2,
									'&: hover': {
										backgroundColor: theme.palette.primary.main,
										color: theme.palette.third.main,
									},
								}}
							>
								Sign In
							</Button>
						</Grid>
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

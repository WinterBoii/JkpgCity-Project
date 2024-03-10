// eslint-disable-next-line no-unused-vars
import { useRef, useState, useEffect, useContext } from 'react';
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
import bgImg from '../assets/background.jpg';
import { theme } from '../lib/utils/Theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../lib/AuthProvider';

const baseUrl = 'http://localhost:3001';

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
	/* 	const errRef = useRef();
	const userRef = useRef(); */
	axios.defaults.withCredentials = true;
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [checked, setChecked] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleCheck = (event) => {
		setChecked(event.target.checked);
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post(baseUrl + '/authentication/login', {
				email,
				password,
			});

			if (response.status === 200) {
				const { user, tokenExpiration } = response.data;
				login(user, tokenExpiration);
				console.log(response.data);
				// Redirect to homepage using useNavigate hook
				navigate('/');
			} else {
				// Handle other response statuses if needed
				setErrMsg('Invalid email or password');
			}
		} catch (error) {
			// Handle errors during login request
			console.error('Login error:', error);
			setErrMsg('Invalid email or password');
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
						sx={{
							pb: '1rem',
							borderBottom: '1px solid white',
						}}
					>
						Jönköping City
					</Typography>

					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						{errMsg && <Typography>{errMsg + '*'}</Typography>}

						<TextField
							variant='filled'
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
							variant='filled'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type={showPassword ? 'text' : 'password'}
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
								label='Show password'
								style={{ color: theme.palette.secondary.contrastText }}
							/>

							<Button
								type='submit'
								variant='contained'
								color='secondary'
								sx={{
									mt: 2,
									mb: 2,
									px: 3,
									borderRadius: 24,
									'&: hover': {
										backgroundColor: theme.palette.primary.main,
										color: theme.palette.third.main,
									},
								}}
							>
								Login
							</Button>
						</Grid>
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

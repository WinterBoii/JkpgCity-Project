/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react';
import {
	InputLabel,
	Grid,
	TextField,
	Container,
	Select,
	MenuItem,
	FormControl,
	Button,
	Typography,
	CircularProgress,
	Box,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AuthContext from '../lib/AuthProvider';
import { theme } from '../lib/utils/Theme';
import ErrorPage from './ErrorPage';
import { WellnessCategory } from '../lib/constants';

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	url: Yup.string().required('URL is required'),
	rating: Yup.string().required('Rating is required'),
	categories: Yup.array().of(Yup.string()).required('Category is required'),
});

const baseUrl = 'http://localhost:3001';

export default function CreateWellnessPage() {
	const location = useLocation();
	const wellnessData = location.state ? location.state.data : null;
	const { auth } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const navigate = useNavigate();

	const [initialValues, setInitialValues] = useState({
		_id: '',
		name: '',
		url: '',
		rating: '',
		categories: [],
	});

	useEffect(() => {
		if (!auth.user) {
			navigate('/login');
		}
		if (wellnessData) {
			setInitialValues(wellnessData);
		}
	}, [auth.user, navigate, wellnessData]);

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			console.log(values);
			if (!auth.user) {
				setSubmitError('You must be logged in to create a store');
				return;
			}

			try {
				setIsSubmitting(true);
				setSubmitError(null);

				if (wellnessData) {
					// Update
					const response = await axios.post(
						baseUrl + `/wellness/${wellnessData._id}/edit`,
						values
					);

					setIsSubmitting(false);

					if (response.status === 200) {
						navigate(`/wellness`);
					} else {
						throw new Error('Failed to Update');
					}
				} else {
					// Create
					const response = await axios.post(
						baseUrl + '/wellness/create',
						values
					);

					setIsSubmitting(false);

					if (response.status === 200) {
						navigate('/wellness');
					} else {
						throw new Error('Failed to Create');
					}
				}
			} catch (error) {
				setIsSubmitting(false);
				setSubmitError(error.message);
			}
		},
	});

	if (isSubmitting) {
		return <CircularProgress />;
	}

	if (submitError) {
		return <ErrorPage error={submitError} />;
	}
	console.log('Formik State:', formik);

	return (
		<Container
			maxWidth='lg'
			sx={{
				bgcolor: theme.palette.third.bg,
				mt: '5rem',
				borderRadius: 13,
			}}
		>
			{wellnessData ? (
				<UpdateWellness formik={formik} />
			) : (
				<CreateWellness formik={formik} />
			)}
		</Container>
	);
}

const CreateWellness = ({ formik }) => {
	return (
		<Box
			component='form'
			noValidate
			onSubmit={formik.handleSubmit}
			sx={{
				m: '5rem',
				color: theme.palette.third.text,
			}}
		>
			<Grid
				justifyContent={{ xs: 'center', md: 'space-around' }}
				alignItems={{ xs: 'center', md: 'flex-start' }}
			>
				<Typography
					variant='h3'
					sx={{
						textAlign: 'center',
						mb: 3,
						pt: 5,
					}}
				>
					Lägg Till
				</Typography>

				<TextField
					variant='filled'
					fullWidth
					id='name'
					name='name'
					label='Name'
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
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
					fullWidth
					id='url'
					name='url'
					label='Website URL'
					value={formik.values.url}
					onChange={formik.handleChange}
					error={formik.touched.url && Boolean(formik.errors.url)}
					helperText={formik.touched.url && formik.errors.url}
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
					error={formik.touched.rating && Boolean(formik.errors.rating)}
				>
					<InputLabel id='rating-label'>Rating</InputLabel>
					<Select
						labelId='rating-label'
						label='rating'
						id='rating'
						name='rating'
						value={formik.values.rating}
						onChange={formik.handleChange}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						{[...Array(5)].map((_, i) => (
							<MenuItem
								key={i}
								value={i + 1}
							>
								{i + 1}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl
					fullWidth
					variant='filled'
					sx={{ mb: 5 }}
					error={formik.touched.categories && Boolean(formik.errors.categories)}
				>
					<InputLabel id='category-label'>Category</InputLabel>
					<Select
						multiple
						labelId='category-label'
						id='categories'
						name='categories'
						value={formik.values.categories}
						onChange={(e) => {
							const values = e.target.value;
							formik.setFieldValue('categories', [...values]);
						}}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						{Object.values(WellnessCategory).map((category) => (
							<MenuItem
								key={category}
								value={category}
							>
								{category}
							</MenuItem>
						))}
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
						<Typography variant='h5'>Skapa</Typography>
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

const UpdateWellness = ({ formik }) => {
	return (
		<Box
			component='form'
			noValidate
			onSubmit={formik.handleSubmit}
			sx={{
				m: '5rem',
				color: theme.palette.third.text,
			}}
		>
			<Grid
				justifyContent={{ xs: 'center', md: 'space-around' }}
				alignItems={{ xs: 'center', md: 'flex-start' }}
			>
				<Typography
					variant='h3'
					sx={{
						textAlign: 'center',
						mb: 3,
						pt: 5,
					}}
				>
					Redigera
				</Typography>

				<TextField
					variant='filled'
					fullWidth
					id='name'
					name='name'
					label='Name'
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
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
					fullWidth
					id='url'
					name='url'
					label='Website URL'
					value={formik.values.url}
					onChange={formik.handleChange}
					error={formik.touched.url && Boolean(formik.errors.url)}
					helperText={formik.touched.url && formik.errors.url}
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
					error={formik.touched.rating && Boolean(formik.errors.rating)}
				>
					<InputLabel id='rating-label'>Rating</InputLabel>
					<Select
						labelId='rating-label'
						label='rating'
						id='rating'
						name='rating'
						value={formik.values.rating}
						onChange={formik.handleChange}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						{[...Array(5)].map((_, i) => (
							<MenuItem
								key={i}
								value={i + 1}
							>
								{i + 1}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl
					fullWidth
					variant='filled'
					sx={{ mb: 5 }}
					error={formik.touched.categories && Boolean(formik.errors.categories)}
				>
					<InputLabel id='category-label'>Category</InputLabel>
					<Select
						multiple
						labelId='category-label'
						id='category'
						name='category'
						value={formik.values.categories}
						onChange={(e) => {
							const values = e.target.value;
							formik.setFieldValue('categories', [...values]);
						}}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						{Object.values(WellnessCategory).map((category) => (
							<MenuItem
								key={category}
								value={category}
							>
								{category}
							</MenuItem>
						))}
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
						<Typography variant='h5'>Uppdatera</Typography>
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

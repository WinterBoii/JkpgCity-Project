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
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AuthContext from '../lib/AuthProvider';
import { theme } from '../lib/utils/Theme';
import ErrorPage from './ErrorPage';
import { Districts, StoreCategories } from '../lib/constants';

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	url: Yup.string().url('Must be a valid URL').required('URL is required'),
	district: Yup.string().required('District is required'),
	categories: Yup.array().of(Yup.string()).required('Category is required'),
});

const baseUrl = 'http://localhost:3001';

export default function CreateStorePage({ storeData }) {
	const { auth } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const navigate = useNavigate();

	const [initialValues, setInitialValues] = useState({
		name: '',
		url: '',
		district: '',
		categories: [],
	});

	useEffect(() => {
		if (!auth.user) {
			navigate('/login');
		}
		if (storeData) {
			setInitialValues(storeData);
		}
	}, [auth.user, navigate, storeData]);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			if (!auth.user) {
				setSubmitError('You must be logged in to create a store');
				return;
			}

			console.log(values);

			try {
				setIsSubmitting(true);
				setSubmitError(null);

				if (storeData) {
					// Update
					const response = await axios.put(
						baseUrl + `/stores/${storeData.id}/edit`,
						values
					);

					setIsSubmitting(false);

					if (response.status === 200) {
						navigate(`/stores`);
					} else {
						throw new Error('Failed to Update');
					}
				} else {
					// Create
					const response = await axios.post(baseUrl + '/stores/create', values);

					setIsSubmitting(false);

					if (response.status === 200) {
						navigate('/stores');
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

	return (
		<Container
			maxWidth='lg'
			sx={{
				bgcolor: theme.palette.third.bg,
				mt: '5rem',
				borderRadius: 13,
			}}
		>
			{storeData ? (
				<UpdateStoreForm formik={formik} />
			) : (
				<CreateStoreForm formik={formik} />
			)}
		</Container>
	);
}

const CreateStoreForm = ({ formik }) => {
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
					Add a Store
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
					error={formik.touched.district && Boolean(formik.errors.district)}
				>
					<InputLabel id='district-label'>District</InputLabel>
					<Select
						labelId='district-label'
						label='district'
						id='district'
						name='district'
						value={formik.values.district}
						onChange={formik.handleChange}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						{Object.values(Districts).map((district) => (
							<MenuItem
								key={district}
								value={district}
							>
								{district}
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
						{Object.values(StoreCategories).map((category) => (
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
						<Typography variant='h5'>Add</Typography>
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

const UpdateStoreForm = ({ formik }) => {
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
					Edit Store
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
					error={formik.touched.district && Boolean(formik.errors.district)}
				>
					<InputLabel id='district-label'>District</InputLabel>
					<Select
						labelId='district-label'
						label='district'
						id='district'
						name='district'
						value={formik.values.district}
						onChange={formik.handleChange}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						{Object.values(Districts).map((district) => (
							<MenuItem
								key={district}
								value={district}
							>
								{district}
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
						{Object.values(StoreCategories).map((category) => (
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
						<Typography variant='h5'>Add</Typography>
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

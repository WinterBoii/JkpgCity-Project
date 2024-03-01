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

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	url: Yup.string().url('Must be a valid URL').required('URL is required'),
	district: Yup.string().required('District is required'),
	category: Yup.string().required('Category is required'),
});

export default function CreateStorePage({ storeData }) {
	const { auth } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const navigate = useNavigate();

	const [initialValues, setInitialValues] = useState({
		name: '',
		url: '',
		district: '',
		category: '',
	});

	useEffect(() => {
		/* if (!auth.user) {
			navigate('/login');
		} */
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

			try {
				setIsSubmitting(true);
				setSubmitError(null);

				if (storeData) {
					// Update
					const response = await axios.put(
						`/api/stores/${storeData.id}/edit`,
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
					const response = await axios.post('/api/stores/create', values);

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
					error={formik.touched.category && Boolean(formik.errors.category)}
				>
					<InputLabel id='category-label'>Category</InputLabel>
					<Select
						labelId='category-label'
						id='category'
						name='category'
						value={formik.values.category}
						onChange={formik.handleChange}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						<MenuItem value='category1'>
							Fittnesscenter och Träningsstudior
						</MenuItem>
						<MenuItem value='category2'>Frisörsalonger och Barberare</MenuItem>
						<MenuItem value='category3'>Hälsokliner</MenuItem>
						<MenuItem value='category4'>Massage och Spa</MenuItem>
						<MenuItem value='category5'>Nagelsalonger</MenuItem>
						<MenuItem value='category6'>
							Skönhetssalonger och Hudvårdskliniker
						</MenuItem>
						<MenuItem value='category7'>Tatueringssalonger</MenuItem>
						<MenuItem value='category8'>Yoga och Meditation</MenuItem>
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
					error={formik.touched.category && Boolean(formik.errors.category)}
				>
					<InputLabel id='category-label'>Category</InputLabel>
					<Select
						labelId='category-label'
						id='category'
						name='category'
						value={formik.values.category}
						onChange={formik.handleChange}
						sx={{
							'& .MuiInputBase-input': {
								color: theme.palette.third.text,
								backgroundColor: theme.palette.third.main,
							},
						}}
					>
						<MenuItem value='category1'>
							Fittnesscenter och Träningsstudior
						</MenuItem>
						<MenuItem value='category2'>Frisörsalonger och Barberare</MenuItem>
						<MenuItem value='category3'>Hälsokliner</MenuItem>
						<MenuItem value='category4'>Massage och Spa</MenuItem>
						<MenuItem value='category5'>Nagelsalonger</MenuItem>
						<MenuItem value='category6'>
							Skönhetssalonger och Hudvårdskliniker
						</MenuItem>
						<MenuItem value='category7'>Tatueringssalonger</MenuItem>
						<MenuItem value='category8'>Yoga och Meditation</MenuItem>
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

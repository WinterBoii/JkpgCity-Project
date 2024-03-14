/* eslint-disable react/prop-types */
import {
	Box,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
	Rating,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '../lib/utils/Theme';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from 'react-router-dom';

export function ItemCard({ data, auth, onDelete }) {
	console.log(auth);
	const navigate = useNavigate();

	const handleDelete = (id) => {
		onDelete(id);
	};
	const updateItem = (data) => {
		console.log(data);
		navigate(`edit`, { state: { data } });
	};

	return (
		<Box sx={{ height: '100%' }}>
			<Accordion
				sx={{
					bgcolor: theme.palette.third.bg,
					color: theme.palette.third.text,
					borderRadius: '12px',
					textTransform: 'none',
				}}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={data.name}
					id={data.id}
				>
					<Box>
						<Typography
							variant='h5'
							component='div'
							sx={{
								mb: 1,
							}}
						>
							{data.name}
						</Typography>
						{data.rating && (
							<>
								<Rating
									name='read-only'
									defaultValue={2}
									size='small'
									value={data.rating}
									readOnly
								/>
							</>
						)}
						{data.district === null ? (
							<Typography variant='body2'>
								<PlaceIcon fontSize='1' />
								N/A
							</Typography>
						) : null}
						{data.district && (
							<Typography variant='body2'>
								<PlaceIcon fontSize='1' /> {data.district}
							</Typography>
						)}
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					{data.categories.length > 1 ? (
						data.categories.map((category) => (
							<Box key={category}>
								<Typography variant='body2'>{category}</Typography>
							</Box>
						))
					) : (
						<Box>
							<Typography variant='body2'>{data.categories}</Typography>
						</Box>
					)}
					<Typography variant='body2'>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								height: '100%',
							}}
						>
							{data.url && (
								<Box>
									<a
										href={'https//' + data.url}
										target='_blank'
										rel='noopener noreferrer'
										style={{
											textDecoration: 'none',
											color: theme.palette.third.text,
											visited: {
												color: theme.palette.third.text,
											},
											textAlign: 'center',
											alignSelf: 'center',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<LanguageIcon sx={{ mr: 1, mb: 0.5 }} />
										<Typography
											variant='body'
											sx={{
												textDecoration: 'underline',
												'&:hover': {
													color: theme.palette.alternative.main,
												},
											}}
										>
											Visit Website
										</Typography>
									</a>
								</Box>
							)}
							{auth.loggedIn && (
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'flex-end',
										alignItems: 'end',
									}}
								>
									<Button
										onClick={() => updateItem(data)}
										sx={{
											'&:hover': {
												color: theme.palette.alternative.main,
											},
										}}
									>
										Redigera
									</Button>

									<Button
										onClick={() => handleDelete(data._id)}
										sx={{
											'&:hover': {
												color: theme.palette.alternative.main,
											},
										}}
									>
										Ta bort
									</Button>
								</Box>
							)}
						</Box>
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
}

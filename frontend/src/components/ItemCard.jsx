/* eslint-disable react/prop-types */
import {
	Box,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '../lib/utils/Theme';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceIcon from '@mui/icons-material/Place';

export function ItemCard({ data }) {
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
							<Typography variant='body2'>Rating: {data.rating}</Typography>
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
						{data.url && (
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
									sx={{ textDecoration: 'underline' }}
								>
									Visit Website
								</Typography>
							</a>
						)}
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
}

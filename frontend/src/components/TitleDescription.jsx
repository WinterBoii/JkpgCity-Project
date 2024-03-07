import { Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function TitleDescription({ title, description }) {
	return (
		<Container maxWidth='xl'>
			<Typography
				variant='h3'
				component='h2'
				fontWeight={500}
				mb={10}
			>
				{title}
			</Typography>
			<Typography
				variant='h5'
				component={'h5'}
				fontWeight={400}
				maxWidth={'55%'}
			>
				{description}
			</Typography>
		</Container>
	);
}

TitleDescription.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

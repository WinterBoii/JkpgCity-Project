import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function CategoryBox({ icon, text }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					width: 75,
					height: 75,
					borderRadius: '50%',
					boxShadow: 7,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center',
					mr: 5,
				}}
			>
				{icon}
			</Box>
			<Typography
				variant='h4'
				component='p'
			>
				{text}
			</Typography>
		</Box>
	);
}

CategoryBox.propTypes = {
	icon: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
};



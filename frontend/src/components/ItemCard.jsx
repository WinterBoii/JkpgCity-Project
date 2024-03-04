/* eslint-disable react/prop-types */
import { Box, Typography, CardContent, Card } from '@mui/material';
import { theme } from '../lib/utils/Theme';

export function ItemCard({ data }) {
	return (
		<Card
			sx={{
				color: theme.palette.third.text,
				borderRadius: '12px',
				textTransform: 'none',
				minHeight: '100%',
			}}
		>
			<CardContent>
				<Typography
					variant='h5'
					component='div'
				>
					{data.name}
				</Typography>
				{data.rating ? (
					<Typography variant='body2'>Rating: {data.rating}</Typography>
				) : (
					<Typography variant='body2'>District: {data.district}</Typography>
				)}

				<Typography variant='body2'>
					{data.url && (
						<a
							href={data.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							Visit Website
						</a>
					)}
				</Typography>
				{data.categories.length > 1 ? (
					data.categories.map((category) => (
						<Box key={category}>
							<Typography variant='body2'>{category}</Typography>
						</Box>
					))
				) : (
					<Box sx={{ flexShrink: 0 }}>
						<Typography variant='body2'>{data.categories}</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
}

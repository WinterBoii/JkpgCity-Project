import * as React from 'react';
import { Typography, IconButton, Avatar, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import profileImg from '../assets/background.jpg';

export default function Testimonial() {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const testimonials = [
		{ id: 1, image: profileImg, text: 'Great service! Highly recommended.' },
		{
			id: 2,
			image: '/path_to_your_image2.jpg',
			text: 'Awesome experience! Will definitely come back.',
		},
	];

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
	};

	const handlePrevious = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
		);
	};

	return (
		<Box
			sx={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '50px' }}
		>
			<Typography
				variant='h2'
				gutterBottom
				sx={{ fontWeight: 400 }}
			>
				Testimonial
			</Typography>
			<Box
				sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
			>
				<Box
					sx={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}
				>
					<IconButton
						aria-label='previous'
						onClick={handlePrevious}
						sx={{ marginRight: '60px' }}
					>
						<ArrowBackIosNewIcon />
					</IconButton>
					<Avatar
						alt='Testimonial Image'
						src={testimonials[currentIndex].image}
						sx={{ width: 100, height: 100 }}
					/>
					<IconButton
						aria-label='next'
						onClick={handleNext}
						sx={{ marginLeft: '60px' }}
					>
						<ArrowForwardIosIcon />
					</IconButton>
				</Box>
				<Typography
					variant='body1'
					gutterBottom
					sx={{ marginTop: '50px' }}
				>
					{testimonials[currentIndex].text}
				</Typography>
			</Box>
		</Box>
	);
}

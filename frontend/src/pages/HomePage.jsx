import { Box, Button, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import shop1 from '../assets/shop1.jpg';
import shop2 from '../assets/shop2.jpg';
import TitleDescription from '../components/TitleDescription';
import Testimonial from '../components/Testemonial';

function HomePage() {
	return (
		<Box
			color={'third.text'}
			mt='5rem'
			textTransform='none'
		>
			<TitleDescription
				title='Välkommen Till Ditt Jönköping'
				description='Jönköping City är fyllt av butiker, kulter, upplevelser, caféer
					och restauranger som ramas in av fantastiska grönområden och vackra sjöar.'
			/>
			<Box
				my={10}
				py={2}
			>
				<Container maxWidth='lg'>
					<Box
						height='404px'
						my={5}
						display={{ xs: 'block', md: 'flex' }}
						flexDirection={{ xs: 'column', md: 'row' }}
						justifyContent={{ xs: 'center', md: 'space-around' }}
					>
						<Container
							sx={{
								mx: 4,
								my: 5,
							}}
						>
							<img
								src={shop1}
								style={{
									width: '100%',
									borderRadius: 12,
									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
							/>
						</Container>

						<Box sx={{ mx: 3 }}>
							<Typography
								mt={7}
								mb={4}
								variant='h3'
								fontWeight={500}
							>
								Shoppa
							</Typography>
							<Typography
								mb={4}
								variant='h5'
								component={'h5'}
								fontWeight={300}
							>
								I Jkpg City hittar du både butiker och affärer som erbjuder allt
								från loppis och second hand, till blommor, skor, kläder och
								inredning.
							</Typography>
							<Button
								component={NavLink}
								to={'/stores'}
								variant='contained'
								color='primary'
								sx={{
									borderRadius: 24,
									px: 3,
									textTransform: 'none',
									boxShadow: 0,
								}}
							>
								<Typography
									variant='h5'
									component={'btn'}
								>
									Shoppa
								</Typography>
							</Button>
						</Box>
					</Box>
				</Container>
				<Container maxWidth='md'>
					<img
						src={shop2}
						style={{
							width: '100%',
							borderRadius: 12,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					/>
				</Container>
			</Box>
			<Testimonial />
		</Box>
	);
}

export default HomePage;

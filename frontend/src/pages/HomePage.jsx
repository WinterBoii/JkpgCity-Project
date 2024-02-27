import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import shop1 from '../assets/shop1.jpg';
import shop2 from '../assets/shop2.jpg';

function HomePage() {
	return (
		<Box color={'third.text'}>
			<Container maxWidth='xl'>
				<Grid
					container
					sx={{ marginTop: '5rem', textTransform: 'none' }}
				>
					<Grid sx={{ width: '100%' }}>
						<Typography
							variant='h2'
							component={'h1'}
							fontWeight={500}
							mb={10}
						>
							Välkommen Till Ditt Jönköping
						</Typography>
						<Typography
							variant='h4'
							component={'h4'}
							fontWeight={400}
						>
							Jönköping City är fyllt av butiker, kulter, upplevelser, caféer
							och <br />
							restauranger som ramas in av fantastiska grönområden och vackra
							sjöar.
						</Typography>
					</Grid>
				</Grid>
			</Container>
			<Box
				bgcolor={'third.bg'}
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
								backgroundImage: `url(${shop1})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								borderRadius: 7,
								mx: 4,
							}}
						/>
						<Box sx={{ mx: 3 }}>
							<Typography
								mt={7}
								mb={7}
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
				<Container
					sx={{
						width: '20%',
						backgroundImage: `url(${shop2})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						borderRadius: 7,
					}}
				/>
			</Box>
		</Box>
	);
}

export default HomePage;

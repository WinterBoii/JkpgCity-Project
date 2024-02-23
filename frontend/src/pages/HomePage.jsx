import { Box, Button, Container, Grid, Typography } from '@mui/material';
import shop1 from '../assets/shop1.jpg'
import { NavLink } from 'react-router-dom';

function HomePage() {
	return (
		<Box color={'third.text'}>
			<Container maxWidth='xl'>
				<Grid
					container
					sx={{ marginTop: '5rem' }}
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
			<Grid
				container
				bgcolor={'third.bg'}
				my={10}
				py={2}
				sx={{ borderRadius: '10px' }}
			>
				<Container
					maxWidth='lg'
					justifyContent={{ xs: 'center', md: 'space-around' }}
					flexDirection={{ xs: 'column', md: 'row' }}
				>
					<Box
						p={5}
						display='flex'
						flexDirection={{ xs: 'column', md: 'row' }}
						justifyContent={{ xs: 'center', md: 'space-around' }}
					>
						<Container
							sx={{
								width: '1200px',
								backgroundImage: `url(${shop1})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'contain',
								backgroundPosition: 'center',
								borderRadius: 7,
								mx: 5
							}}
						/>
						<Container sx={{ mx: 5 }}>
							<Typography
								mt={2}
								mb={3}
								variant='h3'
								fontWeight={500}
							>
								Shoppa
							</Typography>
							<Typography
								mb={3}
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
						</Container>
					</Box>
				</Container>
			</Grid>
		</Box>
	);
}

export default HomePage;

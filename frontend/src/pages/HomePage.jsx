import { Box, Container, Typography } from '@mui/material';
import shop1 from '../assets/shop1.jpg'

function HomePage() {
	return (
		<Box color={'third.text'}>
			<Container
				maxWidth='xl'
				sx={{ marginTop: '5rem' }}
			>
				<Box sx={{ width: '100%' }}>
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
						Jönköping City är fyllt av butiker, kulter, upplevelser, caféer och{' '}
						<br />
						restauranger som ramas in av fantastiska grönområden och vackra
						sjöar.
					</Typography>
				</Box>
			</Container>
			<Box
				bgcolor={'third.bg'}
				my={10}
				py={2}
				sx={{ borderRadius: '10px' }}
			>
				<Container
					maxWidth='lg'
					justifyContent={{ xs: 'center', md: 'space-around' }}
					flexDirection={{ xs: 'column', md: 'row' }}
					alignItems={{ xs: 'center', md: 'flex-start' }}
				>
					<Box
						p={5}
						display='flex'
						flexDirection={'row'}
						justifyContent='center'
					>
						<img
							src={`${shop1}`}
							alt='shop img'
							width={600}
							style={{
								borderRadius: '10px',
							}}
						/>
						<Container>
							<Typography
								mt={10}
								mb={3}
								mx={5}
								variant='h3'
								fontWeight={500}
							>
								Shoppa
							</Typography>
							<Typography
								ml={5}
								variant='h5'
								component={'h5'}
								fontWeight={300}
							>
								I JkpgCity hittar du både butiker och affärer som erbjuder allt
								från loppis och second hand, till blommor, skor, kläder och
								inredning.
							</Typography>
						</Container>
					</Box>
				</Container>
			</Box>
		</Box>
	);
}

export default HomePage;

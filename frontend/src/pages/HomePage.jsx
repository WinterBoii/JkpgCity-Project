import { Box, Container, CssBaseline, Typography } from '@mui/material';

function HomePage() {
	return (
		<Container
			maxWidth='xl'
			sx={{ marginTop: '5rem', color: 'third.text' }}
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
					restauranger som ramas in av fantastiska grönområden och vackra sjöar.
				</Typography>
			</Box>
			<Box
				bgcolor={'third.bg'}
				my={10}
				py={2}
				sx={{ borderRadius: '10px', width: '100%' }}
			>
				<CssBaseline>h1</CssBaseline>
			</Box>
		</Container>
	);
}

export default HomePage;

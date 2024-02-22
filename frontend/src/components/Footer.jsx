import { Box, Grid, IconButton, Typography } from '@mui/material';
import { theme } from '../lib/utils/Theme';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
	return (
		<Box
			width={'100vw'}
			sx={{
				bgcolor: theme.palette.primary.main,
				color: theme.palette.secondary.contrastText,
			}}
		>
			<Grid
				container
				component='footer'
				padding={9}
				justifyContent={{ xs: 'center', md: 'space-around' }}
				flexDirection={{ xs: 'column', md: 'row' }}
				alignItems={{ xs: 'center', md: 'flex-start' }}
				textAlign={{ xs: 'center', md: 'left' }}
			>
				<Grid item>
					<Typography variant='h3'>Jönköping City</Typography>
				</Grid>
				<Grid item>
					<Typography
						mt={{ xs: 3, md: 0 }}
						mb={{ xs: 1, md: 3 }}
						variant='h5'
						fontWeight='bold'
					>
						Location
					</Typography>
					<Typography variant='h6'>
						Jönköping City AB <br />
						c/o Jönköping kommun <br />
						Rådhusparken 1 <br />
						551 89 Jönköping <br />
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						mt={{ xs: 3, md: 0 }}
						mb={{ xs: 1, md: 3 }}
						variant='h5'
						fontWeight='bold'
					>
						Email
					</Typography>
					<Typography variant='h6'>info@jkpgcity.se</Typography>
				</Grid>
				<Grid item>
					<Typography
						mt={{ xs: 3, md: 0 }}
						mb={{ xs: 1, md: 3 }}
						variant='h5'
						fontWeight='bold'
					>
						Phone
					</Typography>
					<Typography variant='h6'>036-16-40 74</Typography>
				</Grid>
				<Grid item>
					<IconButton
						color='third'
						component='a'
						href='https://sv-se.facebook.com/jonkopingcity/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<FacebookIcon />
					</IconButton>
					<IconButton
						color='third'
						component='a'
						href='https://www.instagram.com/jkpgcity/?hl=en'
						target='_blank'
						rel='noopener noreferrer'
					>
						<InstagramIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Grid
				justifyContent='space-around'
				alignItems='center'
				container
				component='footer'
				width={'100vw'}
				padding={4}
				sx={{ bgcolor: theme.palette.alternative.main }}
			>
				<Grid item>
					<Typography variant='6'>
						© Copyright 2024 Välkommen till ditt Jönköping, där du är centrum -
						Jkpg City
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}

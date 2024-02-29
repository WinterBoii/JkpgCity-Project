import { Container, Box, Typography } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ImagesearchRollerOutlinedIcon from '@mui/icons-material/ImagesearchRollerOutlined';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import CategoryBox from '../components/CategoryBox';
import TitleDescription from '../components/TitleDescription';


const shopCategory = [
	{ icon: <CheckroomIcon />, text: 'Kläder och Accessoarer' },
	{ icon: <LightbulbOutlinedIcon />, text: 'Elektronik' },
	{ icon: <RestaurantOutlinedIcon  />, text: 'Mat och Livsmedel' },
	{ icon: <ChairOutlinedIcon />, text: 'Heminredning' },
	{ icon: <ImagesearchRollerOutlinedIcon />, text: 'Konst och Hantverk' },
	{ icon: <SportsTennisOutlinedIcon />, text: 'Sport och Fritid' },
	{ icon: <SpaOutlinedIcon />, text: 'Hälsa och Skönhet' },
	{ icon: <ShuffleOutlinedIcon />, text: 'Övrigt' },
]

export default function StoresPage() {
	return (
		<Box
			color={'third.text'}
			mt='5rem'
		>
			<TitleDescription
				title='Shoppa'
				description='I JkpCity hittar du både butiker och affärer som erbjuder allt från loppis 
					och second hand, till blommor, skor, kläder och inredning.'
			/>

			<Box
				bgcolor={'third.bg'}
				my={10}
				py={2}
			>
				<Container
					maxWidth='xl'
					sx={{
						direction: 'flex',
						flexDirection: 'row',
						my: 3,
					}}
				>
					<CategoryBox
						icon={
							<CheckroomIcon
								sx={{
									fontSize: '3rem',
								}}
							/>
						}
						text='Kläder och Accessoarer'
					/>
				</Container>
			</Box>
		</Box>
	);
}

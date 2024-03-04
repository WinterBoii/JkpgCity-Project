/* eslint-disable react/prop-types */
import { Container, Box, Grid } from '@mui/material';
import TitleDescription from '../components/TitleDescription';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ItemCard } from '../components/ItemCard';
/* import CheckroomIcon from '@mui/icons-material/Checkroom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ImagesearchRollerOutlinedIcon from '@mui/icons-material/ImagesearchRollerOutlined';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import CategoryBox from '../components/CategoryBox'; */

const baseUrl = 'http://localhost:3001';

/* const shopCategory = [
	{ icon: <CheckroomIcon />, text: 'Kläder och Accessoarer' },
	{ icon: <LightbulbOutlinedIcon />, text: 'Elektronik' },
	{ icon: <RestaurantOutlinedIcon />, text: 'Mat och Livsmedel' },
	{ icon: <ChairOutlinedIcon />, text: 'Heminredning' },
	{ icon: <ImagesearchRollerOutlinedIcon />, text: 'Konst och Hantverk' },
	{ icon: <SportsTennisOutlinedIcon />, text: 'Sport och Fritid' },
	{ icon: <SpaOutlinedIcon />, text: 'Hälsa och Skönhet' },
	{ icon: <ShuffleOutlinedIcon />, text: 'Övrigt' },
]; */

export default function WellnessPage() {
	const [wellness, setWellness] = useState([]);

	useEffect(() => {
		const fetchWellness = async () => {
			try {
				const res = await axios.get(baseUrl + '/wellness');
				console.log(res.data);
				if (Array.isArray(res.data.wellness)) {
					setWellness(res.data.wellness);
				} else {
					console.error('Data received is not an array:', res.data.wellness);
				}
			} catch (error) {
				console.error('Error fetching wellness:', error);
			}
		};

		fetchWellness();
	}, [setWellness]);

	return (
		<Box
			color={'third.text'}
			mt='5rem'
		>
			<TitleDescription
				title='Wellness'
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
					{/* <CategoryBox
            icon={
              <CheckroomIcon
                sx={{
                  fontSize: '3rem',
                }}
              />
            }
            text='Kläder och Accessoarer'
          /> */}
					<Grid
						container
						spacing={3}
						justifyContent={'center'}
					>
						{wellness.map((data) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={data.id}
							>
								<ItemCard data={data} />
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</Box>
	);
}

import {
	Container,
	Box,
	Grid,
	FormControlLabel,
	Checkbox,
	Skeleton,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ItemCard } from '../components/ItemCard';
import TitleDescription from '../components/TitleDescription';
import AuthContext from '../lib/AuthProvider';
import axios from 'axios';
import { WellnessCategory } from '../lib/constants';

const baseUrl = 'http://localhost:3001';

export default function WellnessPage() {
	const { auth } = useContext(AuthContext);
	const [wellness, setWellness] = useState([]);
	const [checked, setChecked] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchWellness = async () => {
		setLoading(true);
		try {
			const res = await axios.get(baseUrl + '/wellness');
			console.log(res.data);
			setLoading(false);
			if (Array.isArray(res.data.wellness)) {
				setWellness(res.data.wellness);
				localStorage.setItem('stores', JSON.stringify(res.data.stores));
			} else {
				console.error('Data received is not an array:', res.data.wellness);
				setLoading(false);
			}
		} catch (error) {
			console.error('Error fetching wellness:', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWellness();
	}, [setWellness]);

	const handleToggle = (category) => {
		const currentIndex = checked.indexOf(category);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(category);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const filteredWellness =
		checked.length > 0
			? wellness.filter(
					(well) => checked.some((c) => well.categories.includes(c))
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  )
			: wellness;

	const handleDelete = async (id) => {
		// delete item
		try {
			const response = await axios.post(`${baseUrl}/wellness/${id}/delete`);
			console.log(response);
			if (response.status === 200) {
				const updatedWellness = await fetchWellness();
				if (Array.isArray(updatedWellness)) {
					setWellness(updatedWellness);
				} else {
					console.error('Data received is not an array:', updatedWellness);
				}
			} else {
				throw new Error('Failed to Delete');
			}
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return (
		<Box
			color={'third.text'}
			mt='5rem'
		>
			<TitleDescription
				title='Må Bra'
				description='I JkpCity hittar du både butiker och affärer som erbjuder allt från loppis
          och second hand, till blommor, skor, kläder och inredning.'
			/>

			<Box
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
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'space-around',
							alignItems: 'center',
							mb: 5,
						}}
					>
						{Object.values(WellnessCategory).map((category) => (
							<FormControlLabel
								control={<Checkbox onChange={() => handleToggle(category)} />}
								label={category}
								key={category}
							/>
						))}
					</Box>
					<Box>
						{loading ? (
							<Grid
								justifyContent={'center'}
								container
								spacing={3}
							>
								{filteredWellness.map((_, i) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										key={i}
									>
										<Skeleton
											variant='rectangular'
											width='100%'
											height={118}
										/>
									</Grid>
								))}
							</Grid>
						) : (
							<Grid
								justifyContent={'center'}
								container
								spacing={3}
							>
								{filteredWellness.map((store) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										key={store.id}
									>
										<ItemCard
											data={store}
											auth={auth}
											onDelete={handleDelete}
										/>
									</Grid>
								))}
							</Grid>
						)}
					</Box>
				</Container>
			</Box>
		</Box>
	);
}

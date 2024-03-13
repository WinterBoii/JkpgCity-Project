import {
	Container,
	Box,
	Grid,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ItemCard } from '../components/ItemCard';
import { StoreCategories } from '../lib/constants';
import TitleDescription from '../components/TitleDescription';
import AuthContext from '../lib/AuthProvider';
import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export default function StoresPage() {
	const { auth } = useContext(AuthContext);
	const [stores, setStores] = useState([]);
	const [checked, setChecked] = useState([]);

	const fetchStores = async () => {
		try {
			const res = await axios.get(baseUrl + '/stores');
			console.log(res.data);
			if (Array.isArray(res.data.stores)) {
				setStores(res.data.stores);
			} else {
				console.error('Data received is not an array:', res.data.stores);
			}
		} catch (error) {
			console.error('Error fetching stores:', error);
		}
	};

	useEffect(() => {
		fetchStores();
	}, [setStores]);

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

	const filteredStores =
		checked.length > 0
			? stores.filter(
					(store) => checked.some((c) => store.categories.includes(c))
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  )
			: stores;

	const handleDelete = async (id) => {
		// delete item
		try {
			const response = await axios.post(`${baseUrl}/stores/${id}/delete`);
			console.log(response);
			if (response.status === 200) {
				const updatedStores = await fetchStores();
				if (Array.isArray(updatedStores)) {
					setStores(updatedStores);
				} else {
					console.error('Data received is not an array:', updatedStores);
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
				title='Shoppa'
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
						{Object.values(StoreCategories).map((category) => (
							<FormControlLabel
								control={<Checkbox onChange={() => handleToggle(category)} />}
								label={category}
								key={category}
							/>
						))}
					</Box>
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
						{filteredStores.map((store) => (
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
				</Container>
			</Box>
		</Box>
	);
}

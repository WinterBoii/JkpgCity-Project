import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Drawer,
	useMediaQuery,
	useTheme,
	Container,
	MenuItem,
	Menu,
	Avatar,
	Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from '../lib/utils/Theme';
import AuthContext from '../lib/AuthProvider';

function NavBar() {
	const { auth, logout } = useContext(AuthContext);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const itheme = useTheme();
	const isMobile = useMediaQuery(itheme.breakpoints.down('sm'));

	// Add state for the avatar menu
	const [anchorEl, setAnchorEl] = useState(null);

	const handleAvatarClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleAvatarClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		// Check if the user is logged in
		if (auth.loggedIn) {
			const isTokenExpired = auth.tokenExpiration < Date.now();

			if (isTokenExpired) {
				// Redirect to the login page
				logout();
				navigate('/login');
			} else {
				// User is logged in and the token is not expired
				// You can perform additional actions if needed
			}
		} else {
			// User is not logged in, handle accordingly
		}
	}, [auth.loggedIn, auth.tokenExpiration, logout, navigate]);

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const menuItems = [
		{ link: '/', text: 'Hem' },
		{ link: '/stores', text: 'Shoppa' },
		{ link: '/wellness', text: 'Må bra' },
	];

	return (
		<AppBar
			color='primary'
			elevation={7}
		>
			<Container
				maxWidth='xl'
				sx={{ marginY: 2 }}
			>
				<Toolbar>
					{isMobile ? (
						<>
							<Typography
								flexGrow={1}
								variant='h6'
							>
								Jönköping City
							</Typography>
							<IconButton
								sx={{ flexGrow: 0, justifyContent: 'flex-end' }}
								edge='start'
								color='inherit'
								aria-label='menu'
								onClick={() => setDrawerOpen(true)}
							>
								<MenuIcon />
							</IconButton>
							<Drawer
								anchor='right'
								open={drawerOpen}
								onClose={() => setDrawerOpen(false)}
							>
								{menuItems.map((item, index) => (
									<Button
										color='inherit'
										key={index}
										component={NavLink}
										to={item.link}
										exact
										sx={{
											bgcolor:
												location.pathname === item.link
													? theme.palette.secondary.main
													: 'transparent',
											textDecorationLine: 'none',
											borderRadius: '0px',
											textTransform: 'none',
										}}
									>
										<Typography>{item.text}</Typography>
									</Button>
								))}
								{auth.loggedIn ? (
									<>
										<IconButton>
											<Avatar
												onClick={handleAvatarClick}
												sx={{ width: 48, height: 48 }}
											/>
											<Menu
												anchorEl={anchorEl}
												open={Boolean(anchorEl)}
												onClose={handleAvatarClose}
											>
												<MenuItem onClick={() => navigate('/stores/create')}>
													Create Store
												</MenuItem>
												<MenuItem onClick={() => navigate('/wellness/create')}>
													Create Wellness
												</MenuItem>
												<Divider sx={{ my: 0.5 }} />
												<MenuItem onClick={handleLogout}>Logout</MenuItem>
											</Menu>
										</IconButton>
									</>
								) : (
									<Button
										variant='contained'
										onClick={() => navigate('/login')}
										size='large'
										sx={{
											marginLeft: '1rem',
											bgcolor: theme.palette.third.main,
											color: theme.palette.primary.main,
											borderRadius: '24px',
											paddingX: '2rem',
											textTransform: 'none',
											'&:hover': {
												color: theme.palette.third.main,
											},
										}}
									>
										<Typography variant='h6'>Logga in</Typography>
									</Button>
								)}
							</Drawer>
						</>
					) : (
						<>
							<Typography
								variant='h3'
								component='div'
								sx={{ flexGrow: 1 }}
							>
								Jönköping City
							</Typography>
							{menuItems.map((item, index) => (
								<Button
									color='inherit'
									key={index}
									component={NavLink}
									to={item.link}
									exact
									variant='text'
									sx={{
										bgcolor:
											location.pathname === item.link
												? theme.palette.secondary.main
												: 'transparent',
										borderRadius: '24px',
										px: 3,
										textDecoration: 'none',
										marginX: '0.3rem',
										textTransform: 'none',
										'& .MuiTypography-root': {
											textDecoration: 'none', // Remove underline
										},
									}}
								>
									<Typography variant='h5'>{item.text}</Typography>
								</Button>
							))}
							{auth.loggedIn ? (
								<>
									<IconButton>
										<Avatar
											onClick={handleAvatarClick}
											sx={{ width: 48, height: 48 }}
										/>
										<Menu
											anchorEl={anchorEl}
											open={Boolean(anchorEl)}
											onClose={handleAvatarClose}
										>
											<MenuItem onClick={() => navigate('/stores/create')}>
												Create Store
											</MenuItem>
											<MenuItem onClick={() => navigate('/wellness/create')}>
												Create Wellness
											</MenuItem>
											<Divider sx={{ my: 0.5 }} />
											<MenuItem onClick={handleLogout}>Logout</MenuItem>
										</Menu>
									</IconButton>
								</>
							) : (
								<Button
									variant='contained'
									onClick={() => navigate('/login')}
									size='large'
									sx={{
										marginLeft: '1rem',
										bgcolor: theme.palette.third.main,
										color: theme.palette.primary.main,
										borderRadius: '24px',
										paddingX: '2rem',
										textTransform: 'none',
										'&:hover': {
											color: theme.palette.third.main,
										},
									}}
								>
									<Typography variant='h6'>Logga in</Typography>
								</Button>
							)}
						</>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default NavBar;

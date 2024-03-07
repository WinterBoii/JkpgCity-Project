import { Container, Typography } from "@mui/material";

export default function ErrorPage({ error }) {
  return (
		<Container
			maxWidth='md'
      sx={{
        mt: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70vw',
        height: '44vh',
      }}
		>
			<Typography
				variant='h3'
				color='error'
			>
				{error ? error : 'Something went wrong'}
			</Typography>
		</Container>
	);
}

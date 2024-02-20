import { Container, Grid, IconButton, Typography } from "@mui/material";
import { theme } from "../lib/utils/Theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {


  return (
    <>
      <Grid
      justifyContent="space-around"
       container component="footer" 
       width={"100vw"} 
       padding={4}
       sx={{bgcolor: theme.palette.primary.main}}>
        <Grid item>
          <Typography variant="h3" color={theme.palette.third.main}>
            Jönköping City
          </Typography>
          </Grid>
          <Grid item>
            <box>
            <Typography variant="h5" color={theme.palette.third.main}>
              Location
            </Typography>
            <Typography variant="h6" color={theme.palette.third.main}>
              Jönköping City AB <br />
              c/o Jönköping kommun <br />
              Rådhusparken 1 <br />
              551 89 Jönköping <br />
            </Typography>
            </box>
          </Grid>
          <Grid item>
            <box>
              <Typography variant="h5" color={theme.palette.third.main}>
                Email
              </Typography>
              <Typography variant="h6" color={theme.palette.third.main}>
                info@jkpgcity.se
              </Typography>
            </box>
          </Grid>
          <Grid item>
            <box>
              <Typography variant="h5" color={theme.palette.third.main}>
                Phone
              </Typography>
              <Typography variant="h6" color={theme.palette.third.main}>
                036-16-40 74
              </Typography>
            </box>
          </Grid>
          <Grid item>
            <IconButton 
              component="a" 
              href="https://sv-se.facebook.com/jonkopingcity/" 
              target="_blank" 
              rel="noopener noreferrer">
              <FacebookIcon/>
            </IconButton>
            <IconButton 
              component="a" 
              href="https://www.instagram.com/jkpgcity/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer">
              <InstagramIcon />
            </IconButton>
          </Grid>
      </Grid>
      <Grid
        justifyContent="space-around"
        alignItems='center'
        container 
        component="footer" 
        width={"100vw"}
        padding={4}
        sx={{bgcolor: theme.palette.alternative.main}}>
       <Grid item >
        <Typography variant="6" color={theme.palette.third.main}>
          © Copyright 2024 Välkommen till ditt Jönköping, där du är centrum - Jkpg City
        </Typography>
       </Grid>
      </Grid>
      </>


  );
}

import { Container, Grid, Typography } from "@mui/material";
import { theme } from "../lib/utils/Theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {


  return (
      <Grid container component="footer" width={"100vw"} sx={{bgcolor: theme.palette.primary.main}}>
        <Grid item>
          <Typography variant="h3">
            Jönköping City
          </Typography>
          </Grid>
          <Grid item>
            <box>
            <Typography variant="h5">
              Location
            </Typography>
            <Typography variant="h6">
              Jönköping City AB <br />
              c/o Jönköping kommun <br />
              Rådhusparken 1 <br />
              551 89 Jönköping <br />
            </Typography>
            </box>
          </Grid>
          <grid item>
            <box>
              <Typography variant="h5">
                Email
              </Typography>
              <Typography variant="h6">
                info@jkpgcity.se
              </Typography>
            </box>
          </grid>
          <grid item>
            <box>
              <Typography variant="h5">
                Phone
              </Typography>
              <Typography variant="h6">
                036-16-40 74
              </Typography>
            </box>
          </grid>
          <grid item>
            <FacebookIcon>
            xmlns="https://sv-se.facebook.com/jonkopingcity/"
            </FacebookIcon>
            <InstagramIcon>
              xmlns="https://www.instagram.com/jkpgcity/?hl=en"
            </InstagramIcon>
          </grid>
      </Grid>
  );
}

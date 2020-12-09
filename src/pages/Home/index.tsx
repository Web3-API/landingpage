import { Carousel } from "../../components/Carousel";
import { launchPartners } from "../../constants/testimonials";
import { filters } from "../../theme";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Grid,
  Modal,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import ReactGA from "react-ga";

const Root = styled(Box)({
  maxWidth: '1400px',
  margin: 'auto'
})

const Hero = styled(Grid)(({ theme }) => ({
  minHeight: 310,
  padding: 50,
  margin: 'auto',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    maxWidth: '100%'
  },

  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px'
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 20,
  marginTop: 20,
  fontSize: 45,

  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    fontSize: 32
  },
}));

const HeroBody = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  marginBottom: 20,

  [theme.breakpoints.down('md')]: {
    lineHeight: 1.5
  },

  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    fontSize: 16
  },
}));

const VideoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  marginLeft: 'auto',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 40,
  backgroundImage: `url('${process.env.PUBLIC_URL}/Web3API_Icon.svg');`,
  backgroundPosition: "50% 50%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  boxShadow: "2px 2px 14px 3px rgba(0, 0, 0, 0.28)",
  height: 420,
  width: '45vw',
  maxWidth: '80%',

  [theme.breakpoints.down('sm')]: {
    margin: 'auto',
    width: '80vw',
    height: '50vw',
    marginBottom: 10
  }
}));

const HeroTextContainer = styled(Grid)(({ theme }) => ({
  height: '100%',
  margin: 'auto',

  [theme.breakpoints.down('sm')]: {
    width: '80%'
  }
}))

const StyledTextField = styled(TextField)({
  width: '100%'
});

const JoinButton = styled(Button)({
  height: '100%'
});

const ErrorText = styled(Box)({
  color: '#f44336'
});

const SubmitSuccess = styled(Typography)({
  background: '#529dad',
  color: 'white',
  width: '100%',
  height: 'auto',
  padding: '10px',
  textAlign: 'center',
  fontWeight: 700,
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.28) 2px 2px 14px 3px'
});

const VideoBoxGridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1
  }
}))

const LaunchPartnersText = styled(Typography)(({ theme }) => ({
  display: 'block',
  margin: 'auto',
  marginBottom: 20,
  textAlign: 'center',
  fontWeight: 700,

  [theme.breakpoints.down('xs')]: {
    fontSize: 30
  }
}))

const Logo = styled("img")({
  height: "auto",
  width: "100%",
  filter: filters.textSecondary,

  '&:hover': {
    filter: filters.secondary,
  }
});

const LogoContainer = styled("a")({
  display: "flex",
  padding: 10,
  maxHeight: 150,
  flexDirection: "column",
  justifyContent: "center",
});

const InnerLogoContainer = styled(Box)(({ theme }) => ({
  maxWidth: 150,
  width: "15vw",
  height: "15vw",
  maxHeight: 150,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  [theme.breakpoints.down('xs')]: {
    width: "20vw",
  }
}));

const LaunchPartnersContainer = styled(Grid)({
  paddingRight: '20px',
  paddingLeft: '20px',
  maxWidth: '1200px',
  margin: 'auto'
})

const PlayIcon = styled(FontAwesomeIcon)(({ theme })=> ({
  cursor: 'pointer',
  opacity: 0.53,
  color: '#FFFFFF',
  padding: '0 0 8px 8px',
  fontSize: 70,

  [theme.breakpoints.down('xs')]: {
    fontSize: 35,
  }
}))

const ModalBody = styled(Box)(({ theme })=> ({
  height: 528,
  maxHeight: '90%',
  width: 940,
  maxWidth: '90%',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none',

  [theme.breakpoints.down('xs')]: {
    height: 300
  }
}))

export const Home = () => {

  ReactGA.pageview('home');

  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const onSubmit = async () => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      setEmailError("Invalid email address...");
      return;
    } else {
      setEmailError("");
    }

    let uri = "https://tech.us17.list-manage.com/subscribe/post-json?u=7515d8292da68c0a33f4c7e7e&amp;id=48ff512e96&c=jQuery34108557665382199082_1607465109249&b_7515d8292da68c0a33f4c7e7e_48ff512e96=&_=1607465109250";
    uri = uri + `&Email=${email}&EMAIL=${email}`;
    uri = encodeURI(uri);

    console.log(uri);

    try {
      await fetch(uri, {
        mode: 'no-cors'
      });

      ReactGA.event({
        category: 'Button-hero',
        action: 'sign up',
        label: 'Early Access'
      });

      setSignupSuccess(true);
    } catch (e) {
      setEmailError('Sign-up failed... please use the "contract" form above.');
    }
  }

  return (
    <>
    <Root>
      <Hero container justify="center" direction={matches? 'row-reverse': 'row'}>
        <Grid item sm={12} md={5}>
          <HeroTextContainer container direction='column' justify='space-between'>
            <Grid item>
              <HeroTitle color="textPrimary" variant="h1">
                The Universal Web3 Integration Standard
              </HeroTitle>
              <HeroBody color="textSecondary" variant="subtitle1">
                Web3API is a WASM standard for integrating Web3 protocols into
                applications. This eliminates the need for client-side SDKs,
                making dApps lightweight and cross-platform.
              </HeroBody>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {!signupSuccess ? (
                  <>
                  <Grid item xs={12} sm={8}>
                    <StyledTextField
                      placeholder="Stay informed!"
                      inputProps={{ style: { textAlign: "center" } }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <JoinButton color="secondary" variant="outlined" fullWidth onClick={onSubmit}>
                      Join
                    </JoinButton>
                  </Grid>
                  </>
                ) : (
                  <SubmitSuccess>
                    Thank you for signing up {email}! More details coming soon.
                  </SubmitSuccess>
                )}
              </Grid>
              {emailError && (
                <ErrorText>
                {emailError}
                </ErrorText>
              )}
            </Grid>
          </HeroTextContainer>
        </Grid>
        <VideoBoxGridContainer item sm={12} md={7} onClick={() => {
          ReactGA.event({
            category: 'Demo Video',
            action: 'click',
            label: 'Early Access'
          });

          setIsVideoOpen(true)
        }}>
          <Box display='flex' flexDirection='column' justifyContent='center' width='100%' height='100%'>
            <VideoBox>
              <PlayIcon icon={faPlay} />
            </VideoBox>
          </Box>
        </VideoBoxGridContainer>
      </Hero>
      <LaunchPartnersText variant='h3' color='textPrimary'>
        Launch Partners
      </LaunchPartnersText>
      <LaunchPartnersContainer container justify='center'>
        {
          launchPartners.map(({logo, url}) => (
            <Grid item key={url}>
              <LogoContainer href={url} target="_blank" onClick={() => {
                ReactGA.event({
                  category: 'Launch Partners',
                  action: `goto ${url}`,
                  label: 'Early Access'
                });
              }}>
                <InnerLogoContainer>
                  <Logo src={logo} />
                </InnerLogoContainer>
              </LogoContainer>
            </Grid>
          ))
        }
      </LaunchPartnersContainer>
      <Carousel/>
    </Root>
    <Modal
      open={isVideoOpen}
      onClose={() => setIsVideoOpen(false)}
      aria-labelledby="video-modal-title"
      aria-describedby="video-modal-description"
    >
      <ModalBody>
        <iframe title='youtubeplayer' id="ytplayer" width="100%" height="100%" frameBorder='0'
          src="http://www.youtube.com/embed/ojbMBN9pga4?autoplay=1"
        />
      </ModalBody>
    </Modal>
    </>
  );
};

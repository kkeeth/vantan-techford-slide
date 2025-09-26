import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              mb: 3,
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Creative Developer
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            モダンな技術でユーザーに愛されるWebアプリケーションを作ります
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={scrollToAbout}
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
              }}
            >
              About Me
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              sx={{
                px: 4,
                py: 1.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Get In Touch
            </Button>
          </Stack>
        </Box>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
        }}
        onClick={scrollToAbout}
      >
        <ArrowDownIcon sx={{ fontSize: 40, opacity: 0.7 }} />
      </Box>
    </Box>
  );
};

export default HeroSection;

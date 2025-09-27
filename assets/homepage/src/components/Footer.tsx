import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 6,
      }}
    >
      <Container maxWidth={false}>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          © 2025 Portfolio. Built with React + Material-UI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

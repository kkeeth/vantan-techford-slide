import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between', minHeight: 64 }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Portfolio
          </Typography>
          {/* Desktop menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => scrollToSection('about')}
              sx={{ color: 'text.primary' }}
            >
              About
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection('services')}
              sx={{ color: 'text.primary' }}
            >
              Services
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection('projects')}
              sx={{ color: 'text.primary' }}
            >
              Projects
            </Button>
            <Button
              color="inherit"
              onClick={() => scrollToSection('contact')}
              sx={{ color: 'text.primary' }}
            >
              Contact
            </Button>
          </Box>
          {/* Mobile menu button */}
          <IconButton
            edge="end"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <List>
            {[
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => scrollToSection(item.id)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;

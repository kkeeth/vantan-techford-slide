import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Icon,
  CardMedia,
} from '@mui/material';
import type { Service } from '../types';

type ServicesSectionProps = {
  services: Service[];
};

const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <Box id="services" sx={{ py: 10, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 9fr' },
            columnGap: 6,
            rowGap: 4,
            alignItems: 'start',
          }}
        >
          <Box>
            <Box sx={{ position: 'sticky', top: 96 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{ fontSize: { xs: '2rem', md: '2.25rem' }, mb: 2 }}
              >
                Services
              </Typography>
              <Typography variant="body2" color="text.secondary">
                お客様のニーズに合わせて最適なソリューションを提供します
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: 'repeat(3, 1fr)',
                },
                gap: 4,
              }}
            >
              {services.map((service, index) => (
                <Box key={service.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    {/* image-only card area */}
                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                          index === 0
                            ? 'linear-gradient(135deg, #5E35B1 0%, #9575CD 100%)'
                            : index === 1
                              ? 'linear-gradient(135deg, #FF7043 0%, #FFA270 100%)'
                              : 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(1px)',
                        }}
                      />
                      <Icon
                        sx={{
                          color: 'white',
                          fontSize: 64,
                          zIndex: 1,
                          position: 'relative',
                        }}
                      >
                        {service.icon}
                      </Icon>
                    </CardMedia>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;

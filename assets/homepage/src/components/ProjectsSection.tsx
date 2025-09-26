import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  CardActions,
} from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';
import type { Project } from '../types';

type ProjectsSectionProps = {
  projects: Project[];
};

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <Box id="projects" sx={{ py: 10, backgroundColor: 'background.paper' }}>
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
                Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                これまでに手がけたプロジェクトの一部をご紹介します
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
              {projects.map((project) => (
                <Box key={project.id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
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
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                      sx={{
                        objectFit: 'cover',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            'linear-gradient(135deg, rgba(94, 53, 177, 0.8) 0%, rgba(149, 117, 205, 0.6) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover::after': {
                          opacity: 1,
                        },
                      }}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1.5 }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    {project.url && (
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          size="small"
                          startIcon={<LaunchIcon />}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: 'primary.main' }}
                        >
                          View Project
                        </Button>
                      </CardActions>
                    )}
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

export default ProjectsSection;

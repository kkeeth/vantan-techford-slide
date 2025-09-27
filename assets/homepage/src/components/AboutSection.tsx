import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Chip,
} from '@mui/material';
import type { Skill } from '../types';

type AboutSectionProps = {
  skills: Skill[];
};

const AboutSection = ({ skills }: AboutSectionProps) => {
  return (
    <Box id="about" sx={{ py: 10, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        {/* About Me Profile Section */}
        <Box sx={{ mb: 10 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  mx: 'auto',
                  mb: 3,
                  fontSize: '4rem',
                  backgroundColor: 'primary.main',
                }}
              >
                👨‍💻
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                田中 太郎
              </Typography>
              <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                Frontend Developer
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: 'center',
                }}
              >
                <Chip
                  label="React"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="TypeScript"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="Material-UI"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                About Me
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.7, fontSize: '1.1rem' }}
              >
                フロントエンド開発を中心に，ユーザーエクスペリエンスを重視したWebアプリケーションの開発を行っています．React,
                TypeScript,
                Material-UIなどのモダンな技術スタックを使用して，パフォーマンスとユーザビリティを兼ね備えたプロダクトを作ることを心がけています．
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.7, fontSize: '1.1rem' }}
              >
                5年以上の開発経験を持ち，スタートアップから大企業まで様々な規模のプロジェクトに携わってきました．常に最新の技術動向をキャッチアップし，チーム開発でのコミュニケーションを大切にしています．
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: 'primary.main' }}
                  >
                    50+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    プロジェクト
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: 'primary.main' }}
                  >
                    5+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    年の経験
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: 'primary.main' }}
                  >
                    100%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    満足度
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Tech Stack section with 3:9 layout and image-only cards */}
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
                component="h3"
                sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2 }}
              >
                Tech Stack
              </Typography>
              <Typography variant="body2" color="text.secondary">
                よく使う技術やツールの一覧です。
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
              {skills.map((skill) => (
                <Box key={skill.id}>
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
                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background:
                          skill.category === 'frontend'
                            ? 'linear-gradient(135deg, #5E35B1 0%, #9575CD 100%)'
                            : skill.category === 'backend'
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
                      <Typography
                        variant="h3"
                        sx={{
                          color: 'white',
                          fontWeight: 800,
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          zIndex: 1,
                          position: 'relative',
                        }}
                      >
                        {skill.name}
                      </Typography>
                    </CardMedia>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.category === 'frontend'
                          ? 'フロントエンド'
                          : skill.category === 'backend'
                            ? 'バックエンド'
                            : 'その他'}
                        ・レベル {skill.level}/5
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

export default AboutSection;

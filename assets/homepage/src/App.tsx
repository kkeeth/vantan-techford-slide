import { useState } from 'react';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import type { Service, Skill, Project, ContactForm } from './types';

// MUIテーマの作成（MUI公式サイト風）
const theme = createTheme({
  palette: {
    primary: {
      main: '#5E35B1', // deep purple tone similar to Otis Kit vibes
      light: '#9575CD',
      dark: '#4527A0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF7043', // warm accent
      light: '#FFA270',
      dark: '#D84315',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
    divider: 'rgba(31, 41, 55, 0.1)',
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(31, 41, 55, 0.08)',
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999 },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },
  },
});

// サンプルデータ
const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'モダンな技術を使用したWebアプリケーション開発',
    icon: 'code',
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'ユーザー中心のインターフェースデザイン',
    icon: 'design_services',
  },
  {
    id: '3',
    title: 'Consulting',
    description: 'プロジェクトの技術選定・アーキテクチャ設計',
    icon: 'psychology',
  },
];

const skills: Skill[] = [
  { id: '1', name: 'React', level: 5, category: 'frontend' },
  { id: '2', name: 'TypeScript', level: 4, category: 'frontend' },
  { id: '3', name: 'Material-UI', level: 4, category: 'frontend' },
  { id: '4', name: 'Node.js', level: 3, category: 'backend' },
  { id: '5', name: 'Figma', level: 4, category: 'other' },
];

const projects: Project[] = [
  {
    id: '1',
    title: 'ECサイト',
    description: 'React と TypeScript で構築された eコマースサイト',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&h=300',
    tags: ['React', 'TypeScript', 'MUI'],
    url: 'https://example.com',
  },
  {
    id: '2',
    title: 'ポートフォリオサイト',
    description: 'デザイナー向けのポートフォリオサイト',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&h=300',
    tags: ['React', 'MUI', 'Animation'],
  },
  {
    id: '3',
    title: 'タスク管理アプリ',
    description: 'チーム向けのシンプルなタスク管理ツール',
    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=400&h=300',
    tags: ['React', 'TypeScript', 'Firebase'],
  },
];

const App = () => {
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });

  const handleContactSubmit = (formData: ContactForm) => {
    // お問い合わせ送信処理（実際の実装では API 送信など）
    console.log('お問い合わせを受け付けました:', formData);
    alert('お問い合わせを受け付けました。');

    // フォームリセット
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Header />
        <main style={{ paddingTop: 64 }}>
          <HeroSection />
          <AboutSection skills={skills} />
          <ServicesSection services={services} />
          <ProjectsSection projects={projects} />
          <ContactSection
            contactForm={contactForm}
            onFormChange={setContactForm}
            onSubmit={handleContactSubmit}
          />
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;

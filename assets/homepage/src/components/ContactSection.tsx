import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import type { ContactForm } from '../types'

type ContactSectionProps = {
  contactForm: ContactForm
  onFormChange: (form: ContactForm) => void
  onSubmit: (form: ContactForm) => void
}

const ContactSection = ({ contactForm, onFormChange, onSubmit }: ContactSectionProps) => {
  const handleInputChange = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onFormChange({
      ...contactForm,
      [field]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('すべての項目を入力してください')
      return
    }
    
    onSubmit(contactForm)
  }

  return (
    <Box id="contact" sx={{ py: 10, backgroundColor: 'white' }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
        >
          Contact
        </Typography>
        
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, fontSize: '1.1rem' }}
        >
          プロジェクトのご相談やお問い合わせはこちらから
        </Typography>

        <Card elevation={3} sx={{ maxWidth: 600, mx: 'auto' }}>
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="お名前"
                  value={contactForm.name}
                  onChange={handleInputChange('name')}
                  required
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="メールアドレス"
                  type="email"
                  value={contactForm.email}
                  onChange={handleInputChange('email')}
                  required
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="メッセージ"
                  multiline
                  rows={6}
                  value={contactForm.message}
                  onChange={handleInputChange('message')}
                  required
                  variant="outlined"
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SendIcon />}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }}
                >
                  送信する
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default ContactSection
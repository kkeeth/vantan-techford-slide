import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import type { Message, Colors } from '../types';

type MessageItemProps = {
  message: Message;
  colors: Colors;
  onDelete: (id: string) => void;
};

export const MessageItem = ({
  message,
  colors,
  onDelete,
}: MessageItemProps) => {
  // 相対時間表示
  const formatRelativeTime = (date: string): string => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMinutes = Math.floor(
      (now.getTime() - messageDate.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return 'たった今';
    if (diffInMinutes < 60) return `${diffInMinutes}分前`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}時間前`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}日前`;

    return messageDate.toLocaleDateString();
  };

  return (
    <Card
      key={message.id}
      elevation={3}
      sx={{
        borderRadius: { xs: 2, sm: 3 },
        overflow: 'hidden',
        background: colors.surface,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(59, 130, 246, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(59, 130, 246, 0.15)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={formatRelativeTime(message.date)}
            size="small"
            variant="outlined"
            sx={{
              height: 24,
              fontSize: '0.75rem',
              borderColor: colors.primary,
              color: colors.primary,
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
            }}
          />
        </Box>

        <Typography
          variant="body1"
          component="p"
          sx={{
            lineHeight: 1.7,
            color: '#1f2937',
            mb: message.image ? 2 : 0,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            fontWeight: 400,
          }}
        >
          {message.text}
        </Typography>

        {message.image && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Box
              component="img"
              src={message.image}
              alt={message.imageName}
              sx={{
                maxWidth: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.1)' }} />

      <CardActions sx={{ justifyContent: 'flex-end', p: { xs: 1.5, sm: 2 } }}>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(message.id)}
          sx={{
            borderRadius: 2,
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.08)',
            },
          }}
        >
          削除
        </Button>
      </CardActions>
    </Card>
  );
};

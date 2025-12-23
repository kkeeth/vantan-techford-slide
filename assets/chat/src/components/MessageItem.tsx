import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import type { Message, Colors } from '../types';
import { formatRelativeTime } from '../utils/dateFormatter';
import { HighlightText } from './HighlightText';

type MessageItemProps = {
  message: Message;
  colors: Colors;
  isEditing: boolean;
  editText: string;
  searchTerm: string;
  onEditTextChange: (text: string) => void;
  onStartEdit: (id: string, text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteMessage: (id: string) => void;
};

export const MessageItem = ({
  message,
  colors,
  isEditing,
  editText,
  searchTerm,
  onEditTextChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteMessage,
}: MessageItemProps) => {
  return (
    <Card
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

        {isEditing && (
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <IconButton onClick={onSaveEdit} size="small" color="primary">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={onCancelEdit} size="small">
              <CancelIcon />
            </IconButton>
          </Box>
        )}

        {isEditing ? (
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            autoFocus
          />
        ) : (
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
            <HighlightText text={message.text} searchTerm={searchTerm} />
            <Typography variant="caption" sx={{ color: 'gray' }}>
              {message.updatedAt && '（編集済み）'}
            </Typography>
          </Typography>
        )}

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
              }}
            />
          </Box>
        )}
      </CardContent>

      <Divider sx={{ borderColor: 'rgba(59, 130, 246, 0.1)' }} />

      <CardActions sx={{ justifyContent: 'flex-end', p: { xs: 1.5, sm: 2 } }}>
        {!isEditing && (
          <Button
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => onStartEdit(message.id, message.text)}
            sx={{
              borderRadius: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            編集
          </Button>
        )}
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDeleteMessage(message.id)}
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

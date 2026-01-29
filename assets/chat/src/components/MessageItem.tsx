import { useState } from 'react';
import {
  Typography,
  IconButton,
  TextField,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { formatRelativeTime } from '../utils/dateFormatter';
import { HighlightText } from './HighlightText';
import type { Message, Colors } from '../types';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onStartEdit(message.id, message.text);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (message.id) {
      onDeleteMessage(message.id);
    }
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        py: 2,
        px: { xs: 2, sm: 3 },
        borderBottom: `1px solid ${colors.border}`,
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      {/* ヘッダー: 日時と⋮メニュー */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: colors.textSecondary,
            fontSize: '0.75rem',
          }}
        >
          {formatRelativeTime(message.date)}
        </Typography>

        {/* ⋮メニュー */}
        {!isEditing && (
          <>
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                color: colors.textMuted,
                padding: 0.5,
                '&:hover': {
                  color: colors.textSecondary,
                  backgroundColor: 'transparent',
                },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 2,
                sx: {
                  minWidth: 120,
                  borderRadius: 1,
                  border: `1px solid ${colors.border}`,
                  mt: 0.5,
                },
              }}
            >
              <MenuItem
                onClick={handleEdit}
                sx={{ gap: 1.5, fontSize: '0.875rem' }}
              >
                <EditIcon fontSize="small" sx={{ color: colors.primary }} />
                編集
              </MenuItem>
              <MenuItem
                onClick={handleDelete}
                sx={{
                  gap: 1.5,
                  fontSize: '0.875rem',
                  color: colors.error,
                }}
              >
                <DeleteIcon fontSize="small" />
                削除
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>

      {/* 編集中のアクションボタン */}
      {isEditing && (
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          <IconButton
            onClick={onSaveEdit}
            size="small"
            sx={{ color: colors.primary }}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={onCancelEdit}
            size="small"
            sx={{ color: colors.textSecondary }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      )}

      {/* テキスト表示 or 編集フィールド */}
      {isEditing ? (
        <TextField
          fullWidth
          multiline
          minRows={2}
          value={editText}
          onChange={(e) => onEditTextChange(e.target.value)}
          autoFocus
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              backgroundColor: colors.paper,
              '& fieldset': {
                borderColor: colors.border,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primary,
                borderWidth: 1,
              },
            },
          }}
        />
      ) : (
        <Typography
          variant="body1"
          component="p"
          sx={{
            lineHeight: 1.6,
            color: colors.textPrimary,
            fontSize: '0.9375rem',
            mb: message.image ? 2 : 0,
          }}
        >
          <HighlightText text={message.text} searchTerm={searchTerm} />
          {message.updatedAt && message.updatedAt !== message.createdAt && (
            <Typography
              component="span"
              variant="caption"
              sx={{ color: colors.textMuted, ml: 1 }}
            >
              （編集済み）
            </Typography>
          )}
        </Typography>
      )}

      {/* 画像表示 */}
      {message.image && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 2,
          }}
        >
          <Box
            component="img"
            src={message.image}
            alt={message.imageName}
            sx={{
              maxWidth: '100%',
              maxHeight: 300,
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

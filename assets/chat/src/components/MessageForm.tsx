import type { ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  Fab,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Image as ImageIcon, Send as SendIcon } from '@mui/icons-material';
import { Colors } from '../types';

type MessageFormProps = {
  text: string;
  isPosting: boolean;
  image: File | null;
  colors: Colors;
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onImageSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
};

export const MessageForm = ({
  text,
  isPosting,
  image,
  colors,
  onTextChange,
  onSubmit,
  onImageSelect,
  onImageRemove,
}: MessageFormProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: { xs: 2, sm: 3 },
        p: { xs: 2, sm: 3 },
        mb: { xs: 2, sm: 3 },
        background: colors.surface,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(59, 130, 246, 0.1)',
      }}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={{ xs: 2, sm: 3 }}>
          <TextField
            label="今の気分はいかがでしょうか？"
            multiline
            fullWidth
            rows={4}
            value={text}
            onChange={onTextChange}
            variant="outlined"
            error={text.length > MAX_MESSAGE_LENGTH * 0.9}
            helperText={`${text.length}/${MAX_MESSAGE_LENGTH}`}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover fieldset': {
                  borderColor: colors.primary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.primary,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: colors.primary,
              },
            }}
          />

          {image && (
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                📸 画像プレビュー
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Box
                  component="img"
                  alt="Preview"
                  src={URL.createObjectURL(image)}
                  sx={{
                    maxWidth: '80%',
                    maxHeight: 200,
                    objectFit: 'contain',
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {image.name} ({Math.round(image.size / 1024)}KB)
                </Typography>
                <Button size="small" color="error" onClick={onImageRemove}>
                  削除
                </Button>
              </Box>
            </Paper>
          )}

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button
              variant="outlined"
              component="label"
              startIcon={<ImageIcon />}
              sx={{
                flex: 1,
                width: { xs: '100%', sm: 'auto' },
                height: 48,
                borderRadius: 2,
              }}
            >
              画像を追加
              <input
                type="file"
                hidden
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={handleSelectImage}
              />
            </Button>

            <Fab
              color="primary"
              type="submit"
              disabled={!text.trim() || isPosting}
              size="large"
              sx={{
                background:
                  text.trim() && !isPosting ? colors.gradient : undefined,
                '&:hover': {
                  background:
                    text.trim() && !isPosting
                      ? colors.gradientHover
                      : undefined,
                },
                transition: 'all 0.3s ease',
                transform: text.trim() ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <SendIcon />
            </Fab>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

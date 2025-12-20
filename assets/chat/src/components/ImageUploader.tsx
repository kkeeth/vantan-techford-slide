import type { ChangeEvent } from 'react';
import { Box, Button, Fab, Paper, Typography } from '@mui/material';
import { Image as ImageIcon, Send as SendIcon } from '@mui/icons-material';
import { Colors } from '../types';

type ImageUploaderProps = {
  text: string;
  isPosting: boolean;
  image: File | null;
  colors: Colors;
  onSelectImage: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
};

export const ImageUploader = ({
  text,
  isPosting,
  image,
  colors,
  onSelectImage,
  onDeleteImage,
}: ImageUploaderProps) => {
  return (
    <>
      {/* 画像プレビュー */}
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
            <Button size="small" color="error" onClick={onDeleteImage}>
              削除
            </Button>
          </Box>
        </Paper>
      )}

      {/* 画像を追加ボタン */}
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
            onChange={onSelectImage}
          />
        </Button>

        <Fab
          color="primary"
          type="submit"
          disabled={!text.trim() || isPosting}
          size="large"
          sx={{
            background: text.trim() && !isPosting ? colors.gradient : undefined,
            '&:hover': {
              background:
                text.trim() && !isPosting ? colors.gradientHover : undefined,
            },
            transition: 'all 0.3s ease',
            transform: text.trim() ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          <SendIcon />
        </Fab>
      </Box>
    </>
  );
};

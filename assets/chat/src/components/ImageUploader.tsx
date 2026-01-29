import type { ChangeEvent } from 'react';
import { Box, Button, Typography, Paper, IconButton } from '@mui/material';
import {
  Image as ImageIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import type { Colors } from '../types';

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
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 1,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            画像プレビュー
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Box
                component="img"
                alt="Preview"
                src={URL.createObjectURL(image)}
                sx={{
                  maxWidth: '80%',
                  maxHeight: 200,
                  objectFit: 'contain',
                  border: `1px solid ${colors.border}`,
                  borderRadius: 2,
                }}
              />
              <IconButton
                size="small"
                onClick={onDeleteImage}
                sx={{
                  position: 'absolute',
                  top: -12,
                  right: 52,
                  backgroundColor: colors.paper,
                  border: `1px solid ${colors.border}`,
                  color: colors.textMuted,
                  width: 24,
                  height: 24,
                  '&:hover': {
                    color: colors.textSecondary,
                    borderColor: colors.primary,
                    backgroundColor: colors.border,
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: 'block', textAlign: 'center' }}
          >
            {image.name} ({Math.round(image.size / 1024)}KB)
          </Typography>
        </Paper>
      )}

      {/* ボタンエリア */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="outlined"
          component="label"
          startIcon={<ImageIcon />}
          sx={{
            height: 44,
            borderRadius: 6,
            borderColor: colors.border,
            color: colors.textSecondary,
            '&:hover': {
              borderColor: colors.primary,
              backgroundColor: 'rgba(59, 130, 246, 0.04)',
            },
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
        <Button
          type="submit"
          variant="contained"
          disabled={!text.trim() || isPosting}
          endIcon={<SendIcon />}
          sx={{
            height: 44,
            px: 3,
            borderRadius: 6,
            backgroundColor: colors.primary,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: colors.primaryDark,
              boxShadow: 'none',
            },
            '&:disabled': {
              backgroundColor: colors.border,
              color: colors.textMuted,
            },
          }}
        >
          投稿する
        </Button>
      </Box>
    </>
  );
};

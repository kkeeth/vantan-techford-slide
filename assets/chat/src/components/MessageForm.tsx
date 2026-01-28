import type { FormEvent, ChangeEvent } from 'react';
import { Paper, Stack, TextField } from '@mui/material';
import { ImageUploader } from './ImageUploader';
import type { Colors } from '../types';

type MessageFormProps = {
  text: string;
  isPosting: boolean;
  image: File | null;
  colors: Colors;
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSelectImage: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
};

export const MessageForm = ({
  text,
  isPosting,
  image,
  colors,
  onTextChange,
  onSubmit,
  onSelectImage,
  onDeleteImage,
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
            variant="outlined"
            value={text}
            onChange={onTextChange}
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

          <ImageUploader
            text={text}
            isPosting={isPosting}
            image={image}
            colors={colors}
            onSelectImage={onSelectImage}
            onDeleteImage={onDeleteImage}
          />
        </Stack>
      </form>
    </Paper>
  );
};

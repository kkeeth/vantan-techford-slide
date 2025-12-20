import type { ChangeEvent, FormEvent } from 'react';
import { Paper, Stack, TextField } from '@mui/material';
import { ImageUploader } from './ImageUploader';
import { Colors } from '../types';

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
            value={text}
            onChange={onTextChange}
            variant="outlined"
            error={text.length > 140}
            helperText={`${text.length}/140文字`}
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
        </Stack>
        <ImageUploader
          text={text}
          isPosting={isPosting}
          image={image}
          colors={colors}
          onSelectImage={onSelectImage}
          onDeleteImage={onDeleteImage}
        />
      </form>
    </Paper>
  );
};

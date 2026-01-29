import type { FormEvent, ChangeEvent } from 'react';
import { Box, Stack, TextField } from '@mui/material';
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
    <Box>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            placeholder="今の気分はいかがでしょうか？"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            value={text}
            onChange={onTextChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: colors.paper,
                '& fieldset': {
                  borderColor: colors.border,
                },
                '&:hover fieldset': {
                  borderColor: colors.borderLight,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.primary,
                  borderWidth: 1,
                },
              },
              '& .MuiOutlinedInput-input': {
                '&::placeholder': {
                  color: colors.textMuted,
                  opacity: 1,
                },
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
    </Box>
  );
};

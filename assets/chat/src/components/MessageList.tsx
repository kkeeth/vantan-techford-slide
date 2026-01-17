import { Children, type ReactNode } from 'react';
import { Stack, Paper, Typography } from '@mui/material';

type MessageListProps = {
  children: ReactNode;
  showCount?: boolean;
};

export const MessageList = ({
  children,
  showCount = false,
}: MessageListProps) => {
  const count = Children.count(children);

  if (count === 0) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 4,
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          📝 まだメッセージがありません
        </Typography>
        <Typography variant="body2" color="text.secondary">
          上のフォームから最初のメッセージを投稿してみましょう！
        </Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      {showCount && (
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {count} 件のメッセージ
        </Typography>
      )}
      {children}
    </Stack>
  );
};

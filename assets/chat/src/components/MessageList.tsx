import { Stack, Paper, Typography } from '@mui/material';
import { MessageItem } from './MessageItem';
import type { Message, Colors } from '../types';

type MessageListProps = {
  messages: Message[];
  colors: Colors;
  onDelete: (id: string) => void;
};

export const MessageList = ({
  messages,
  colors,
  onDelete,
}: MessageListProps) => {
  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      {messages.length === 0 ? (
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
      ) : (
        <>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 2, textAlign: 'center' }}
          >
            {messages.length} 件のメッセージ
          </Typography>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              colors={colors}
              onDelete={onDelete}
            />
          ))}
        </>
      )}
    </Stack>
  );
};

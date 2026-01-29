import { Children, type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import type { Colors } from '../types';

type MessageListProps = {
  children: ReactNode;
  colors: Colors;
  showCount?: boolean;
  isSearching?: boolean;
};

export const MessageList = ({
  children,
  colors,
  showCount = false,
  isSearching = false,
}: MessageListProps) => {
  const count = Children.count(children);

  if (count === 0) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
        }}
      >
        {isSearching ? (
          <>
            <Typography
              variant="body1"
              sx={{ color: colors.textSecondary, mb: 0.5 }}
            >
              検索結果がありません
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>
              別のキーワードで検索してみてください
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{ color: colors.textSecondary, mb: 0.5 }}
            >
              まだメッセージがありません
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>
              上のフォームから最初のメッセージを投稿してみましょう
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box>
      {showCount && (
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 1.5,
            backgroundColor: colors.surface,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.textSecondary,
              fontSize: '0.875rem',
            }}
          >
            {count} 件のメッセージ
          </Typography>
        </Box>
      )}
      {showCount && (
        <Box sx={{ borderBottom: `1px solid ${colors.border}` }} />
      )}
      <Box>{children}</Box>
    </Box>
  );
};

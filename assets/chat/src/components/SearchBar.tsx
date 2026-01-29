import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import type { Colors } from '../types';

type SearchBarProps = {
  searchTerm: string;
  colors: Colors;
  onSearchChange: (term: string) => void;
};

export const SearchBar = ({
  searchTerm,
  colors,
  onSearchChange,
}: SearchBarProps) => {
  return (
    <Box>
      <TextField
        fullWidth
        placeholder="メッセージを検索..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.paper,
            borderRadius: 1,
            '& fieldset': {
              borderColor: colors.borderLight,
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: colors.textMuted,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
              borderWidth: 2,
            },
          },
          '& .MuiOutlinedInput-input': {
            '&::placeholder': {
              color: colors.textSecondary,
              opacity: 1,
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.textSecondary }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onSearchChange('')}
                  size="small"
                  sx={{
                    color: colors.textSecondary,
                    '&:hover': {
                      color: colors.textPrimary,
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

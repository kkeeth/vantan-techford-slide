import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import type { Colors } from '../types';

type SearchBarProps = {
  searchTerm: string;
  colors: Colors;
  onSearchChange: (term: string) => void;
};

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
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
            backgroundColor: '#fff',
            borderRadius: 1,
            '& fieldset': {
              borderColor: '#cbd5e1',
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
              borderWidth: 2,
            },
          },
          '& .MuiOutlinedInput-input': {
            '&::placeholder': {
              color: '#64748b',
              opacity: 1,
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#64748b' }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onSearchChange('')}
                  size="small"
                  sx={{
                    color: '#64748b',
                    '&:hover': {
                      color: '#1e293b',
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

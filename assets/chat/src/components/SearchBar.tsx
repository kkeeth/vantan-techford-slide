import { Paper, TextField, InputAdornment, IconButton } from '@mui/material';
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
    <Paper
      elevation={2}
      sx={{ p: 2, mb: 3, background: colors.gradient, borderRadius: 2 }}
    >
      <TextField
        fullWidth
        placeholder="メッセージを検索..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.surface,
            borderRadius: 2,
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onSearchChange('')}
                  size="small"
                  sx={{
                    '&:hover': {
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
    </Paper>
  );
};

import { Box } from '@mui/material';

type HighlightTextProps = {
  text: string;
  searchTerm: string;
};

export const HighlightText = ({ text, searchTerm }: HighlightTextProps) => {
  if (!searchTerm.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <Box
            key={index}
            component="span"
            sx={{
              backgroundColor: '#fff59d',
              color: '#000',
              fontWeight: 'bold',
              padding: '2px 6px',
              borderRadius: '4px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {part}
          </Box>
        ) : (
          part
        ),
      )}
    </>
  );
};

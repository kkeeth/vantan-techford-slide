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
              backgroundColor: 'yellow',
              fontWeight: 'bold',
              padding: '2px 4px',
              borderRadius: '4px',
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

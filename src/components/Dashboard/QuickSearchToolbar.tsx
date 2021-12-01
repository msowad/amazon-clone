import { Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React from 'react';

interface Props {
  onChange: () => void;
  onSearch: () => void;
  value: string;
}

const QuickSearchToolbar: React.FC<Props> = ({ value, onChange, onSearch }) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      padding={1}
    >
      <div>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Search…'
        value={value}
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={onSearch}
              title='Clear'
              aria-label='Clear'
              size='small'
            >
              <Search fontSize='small' />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default QuickSearchToolbar;

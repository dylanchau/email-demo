import React from 'react';
import { Box, InputBase, IconButton, Badge } from '@mui/material';
import { Search, Info, Notifications, Settings } from '@mui/icons-material';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <Box className="search-bar" sx={{ display: 'flex', alignItems: 'center', padding: '5px 10px', bgcolor: '#657487' }}>
      <InputBase
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        sx={{ ml: 1, flex: 1, color: 'white' }}
      />
      <IconButton type="submit" aria-label="search">
        <Search style={{ color: 'white' }} />
      </IconButton>
      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
        <IconButton aria-label="info" sx={{ color: 'white' }}>
          <Info />
        </IconButton>
        <IconButton aria-label="notifications" sx={{ color: 'white' }}>
          <Badge badgeContent={5} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton aria-label="settings" sx={{ color: 'white' }}>
          <Settings />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;

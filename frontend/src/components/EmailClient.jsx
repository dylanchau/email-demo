import React from 'react';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import SearchBar from './SearchBar';
import EmailContent from './EmailContent';
import './EmailClient.css';
import { Box, Typography, Button } from '@mui/material';

const EmailClient = () => {
  return (
    <Box className="email-client" sx={{ display: "flex", flexDirection: "row", }}>
      <Sidebar />
      <Box className="main-content" >
        <SearchBar />
        <Box sx={{ display: "flex", flexDirection: "row"}}>
            <EmailList />
            <EmailContent />
        </Box>
      </Box>
    </Box>
  );
};

export default EmailClient;

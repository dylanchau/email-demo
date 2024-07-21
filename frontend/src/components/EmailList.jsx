import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Badge, IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import './EmailList.css';

const emails = [
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  {
    id: 1,
    sender: 'Kira Crouch',
    subject: 'Next week meeting',
    time: '11.20',
    preview: 'Greetings, fellow colleagues...',
    avatar: '/user-profile.jpg',
    tag: 'Work',
  },
  
  // Add more email data here
];

const EmailList = () => {
  return (
    <Box className="email-list" sx={{ width: 500, bgcolor: 'background.paper', borderRight: '1px solid #ddd',  overflowY: 'scroll', height: '90vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
        <Typography variant="h6">Recent</Typography>
        <IconButton>
          <Refresh />
        </IconButton>
      </Box>
      <List>
        {emails.map((email) => (
          <ListItem key={email.id} button>
            <ListItemAvatar>
              <Badge color="primary" variant="dot">
                <Avatar alt={email.sender} src={email.avatar} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={email.sender}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {email.subject}
                  </Typography>
                  {" — " + email.preview}
                </>
              }
            />
            <Typography variant="body2" color="textSecondary">
              {email.time}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmailList;

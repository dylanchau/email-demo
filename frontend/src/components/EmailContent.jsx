import React from 'react';
import { Box, Typography, Avatar, IconButton, Divider, TextField, Button } from '@mui/material';
import { Reply, Forward, Delete } from '@mui/icons-material';
import './EmailContent.css';
import emailImage from '/email-image.jpg';

const email = {
  sender: 'Kira Crouch',
  subject: 'Next week meeting',
  time: '01.07.2021, 11:20 AM',
  body: 'Greetings, fellow colleagues. I would like to share my insights on this task. I reckon we should deal with at least half of the points in the plan without further delays. I suggest proceeding from one point to the next and notifying the rest of us with at least short notices. This way is best to keep track of who is doing what.',
  recipients: ['elina.rollins@gmail.com', 'barnett@gmail.com', 'r.harwood@gmail.com', 'ch.kennedy@gmail.com'],
  avatar: '/user-profile.jpg'
};

const EmailContent = () => {
  return (
    <Box className="email-content" sx={{ flex: 1, padding: 2, overflowY: 'scroll', height: '90vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={email.sender} src={email.avatar} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">{email.sender}</Typography>
          <Typography variant="body2" color="textSecondary">{email.recipients.join(', ')}</Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="body2" color="textSecondary">{email.time}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton>
              <Reply />
            </IconButton>
            <IconButton>
              <Forward />
            </IconButton>
            <IconButton>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ mt: 2 }}>{email.subject}</Typography>
      <Divider sx={{ my: 2 }} />
      <img src={emailImage} alt="Email content" className="email-image" />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {email.body}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt="Elena Rollins" src="../assets/elena-rollins.jpg" />
        <TextField
          placeholder="Type here"
          variant="outlined"
          size="small"
          sx={{ flex: 1, ml: 2 }}
        />
        <Button variant="contained" color="primary" sx={{ ml: 2 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default EmailContent;

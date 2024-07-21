import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Button, Typography, Badge } from '@mui/material';
import { Inbox, Drafts, Send, Report, Delete, Work, TravelExplore, Group, Label } from '@mui/icons-material';
import './Sidebar.css';
import profileImage from '/elena-rollins.jpg';

const Sidebar = () => {
    return (
        <Box className="sidebar" sx={{ width: "350px" }}>
            <Box sx={{ margin: "10px 20px" }}>
                <Box className="profile" sx={{ textAlign: 'center', p: 2, backgroundColor: "#00BFFF", borderRadius: "31px" }}>
                    <Avatar src={profileImage} sx={{ width: 70, height: 70, mx: 'auto' }} />
                    <Typography variant="h6" sx={{ mt: 1 }}>Elena Rollins</Typography>
                    <Typography variant="body1" color="textSecondary">Administrator</Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth sx={{ my: 2 }}>
                    + Compose
                </Button>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <Inbox sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        <Badge badgeContent={3} sx={{ color: "white" }} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Drafts sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Send sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary="Sent" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Report  sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary="Spam" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Delete  sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary="Deleted" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Work color='info' />
                        </ListItemIcon>
                        <ListItemText primary="Work" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <TravelExplore sx={{ color: "yellow" }} />
                        </ListItemIcon>
                        <ListItemText primary="Travelling" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Group sx={{ color: "#00FFFF" }} />
                        </ListItemIcon>
                        <ListItemText primary="Friends" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Label sx={{ color: "#00FA9A" }}/>
                        </ListItemIcon>
                        <ListItemText primary="New tag" />
                    </ListItem>
                </List> 
            </Box>
        </Box>
    );
};

export default Sidebar;

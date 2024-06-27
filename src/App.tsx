import React, { useState } from 'react';
import { Button, Dialog, DialogContent, Grid, IconButton, Tabs, Tab, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PushPinIcon from '@mui/icons-material/PushPin';
import PersonIcon from '@mui/icons-material/Person';

import { styled } from '@mui/system';
import Matters from './components/Matters';
import Documents from './components/Documents';
import logo from './assets/logo.webp';

import "./App.css"

const CompanyLogo = styled('img')({
  width: 50,
  height: 50,
  marginRight: 10,
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid lightgray',
  paddingBottom: 0,
});

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (__:React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="flex-start" style={{ height: '100vh', padding: 20 }}>
      <Button
        sx={{ position: 'absolute', marginTop: 30, marginRight: 10, textTransform: 'none' }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Open Outlook
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        PaperProps={{
          sx: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '400px',
            maxWidth: '400px',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            margin: 0,
            padding: 0,
            borderRadius: 0,
          },
        }}
      >
        <DialogContent sx={{ padding: 2 }}>
          <Header>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <CompanyLogo src={logo} alt="Company Logo" />
              <Typography variant="h6" color="black">
                TeamConnect
              </Typography>
              <PushPinIcon  sx={{ marginLeft: 'auto' ,color:'grey'}} />
            </div>
            <IconButton onClick={handleClose}>
              <CloseIcon color="primary" />
            </IconButton>
          </Header>

          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" sx={{ marginTop: 2 }}>
            <Tab label="Matters" sx={{ textTransform: 'none' }} />
            <Tab label="Documents" sx={{ textTransform: 'none' }} />
            <PersonIcon style={{ color:"0052CC", marginLeft: 'auto', marginRight: 8, marginTop: 8 }} />
          </Tabs>

          {tabValue === 0 && <Matters />}
          {tabValue === 1 && <Documents />}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default App;

































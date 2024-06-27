
import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { BusinessCenter as BusinessCenterIcon, MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import MoreOptionsMenu from './MoreOptionsMenu';
import styles from './MattersCard.module.css'; 

interface CardComponentProps {
  id: string;
  title: string;
  modifiedBy: string;
  time: string; 
  query: string;
  fileName?: string;
  fileIcon?: React.ReactNode;
  version?: string;
  showDetails?: boolean;
  className?: string; 
  titleClassName?: string;
  type?: 'matter' | 'document'; 
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
    ) : (
      part
    )
  );
};

const formatDateToAMPM = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // AM/PM format
  };
  return date.toLocaleString('en-US', options);
};

const CardComponent: React.FC<CardComponentProps> = ({
  id,
  title,
  modifiedBy,
  time,
  query,
  fileName,
  fileIcon,
  version,
  showDetails = true,
  className = '', 
  titleClassName = '',
  type = 'documents' 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default right-click menu
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formattedTime = formatDateToAMPM(time); 

  const containerClass = type === 'matter' ? styles.matterContainer : styles.documentContainer;

  return (
    <Card className={`${className} ${containerClass}`} sx={{ mb: 1 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {fileIcon ? fileIcon : <BusinessCenterIcon sx={{ mr: 1, color:'#0052CC' }} />}
            </div>
          </Grid>

          <Grid item xs>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography className={styles.titleHover} variant="body1" style={{ color: '#0052CC' }}>
                  {highlightMatch(fileName ?? '', query)}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onContextMenu={handleMenuOpen} // Change to onContextMenu
                  sx={{
                    color: '#0052CC',
                    '&:hover': {
                      backgroundColor: '#bbdefb',
                      borderRadius: "2%",
                    },
                    height: 8,
                    width: 16,
                  }}
                >
                  <MoreHorizIcon sx={{color:'0052CC'}}/>
                </IconButton>
                <MoreOptionsMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
              </Grid>
            </Grid>

            <Grid container spacing={-2} className={`${styles.container} ${containerClass}`}>
              <Grid item xs={12}>
                <Typography className={`${styles.titleHover} ${titleClassName}`} variant="body2" style={{ color: '#0052CC' }}>
                  {highlightMatch(id, query)} - {highlightMatch(title, query)}
                </Typography>
              </Grid>
              {showDetails && (
                <Grid item xs={12}>
                  <Typography color="grey" variant="body2">
                    Modified by {highlightMatch(modifiedBy, query)} - {formattedTime}
                  </Typography>
                  {version && (
                    <Typography color="grey" variant="body2">
                      {highlightMatch(version, query)}
                    </Typography>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardComponent;

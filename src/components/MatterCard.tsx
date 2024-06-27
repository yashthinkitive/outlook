
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { Matter } from '../types'; 


interface MatterCardProps {
  matter: Matter;
}

const MatterCard: React.FC<MatterCardProps> = ({ matter }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <WorkIcon color="primary" />
          </Grid>
          <Grid item >
            <Typography  variant="body1">{matter.id}</Typography>
            <Typography variant="body2" color="textSecondary">{matter.title}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MatterCard;

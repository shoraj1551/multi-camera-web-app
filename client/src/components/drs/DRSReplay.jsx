import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loadRecordings, 
  selectRecording 
} from '../../store/drsSlice';

const DRSReplay = () => {
  const dispatch = useDispatch();
  const { recordings } = useSelector((state) => state.drs);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Simulated loading of recordings
    const mockRecordings = [
      { 
        id: 1, 
        name: 'Camera 1 - Match 1', 
        date: '2024-03-26', 
        duration: '00:45:30' 
      },
      { 
        id: 2, 
        name: 'Camera 2 - Practice Session', 
        date: '2024-03-25', 
        duration: '01:20:15' 
      }
    ];

    dispatch(loadRecordings(mockRecordings));
  }, [dispatch]);

  const handleOpenRecordings = () => {
    setOpen(true);
  };

  const handleCloseRecordings = () => {
    setOpen(false);
  };

  const handleSelectRecording = (recording) => {
    dispatch(selectRecording(recording));
    handleCloseRecordings();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={handleOpenRecordings}
          >
            Browse Recordings
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth
          >
            Export Recording
          </Button>
        </Grid>
      </Grid>

      {/* Recordings Dialog */}
      <Dialog 
        open={open} 
        onClose={handleCloseRecordings}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Recorded Sessions</DialogTitle>
        <DialogContent dividers>
          {recordings.length === 0 ? (
            <Typography variant="body1" align="center">
              No recordings available
            </Typography>
          ) : (
            <List>
              {recordings.map((recording) => (
                <ListItem 
                  key={recording.id}
                  button
                  onClick={() => handleSelectRecording(recording)}
                >
                  <ListItemText
                    primary={recording.name}
                    secondary={`Date: ${recording.date} | Duration: ${recording.duration}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRecordings} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DRSReplay;
// Additional functionality and improved UI
import React, { useState } from 'react';

const Dashboard = () => {
  const [activeCamera, setActiveCamera] = useState(0);
  const [drsMode, setDrsMode] = useState(false);
  const [recordedVideosOpen, setRecordedVideosOpen] = useState(false);

  const cameras = [
    { id: 0, name: 'Camera 1', src: '/placeholder-camera-1.jpg' },
    { id: 1, name: 'Camera 2', src: '/placeholder-camera-2.jpg' },
    { id: 2, name: 'Camera 3', src: '/placeholder-camera-3.jpg' },
    { id: 3, name: 'Camera 4', src: '/placeholder-camera-4.jpg' }
  ];

  const handleCameraSwitch = (cameraId) => {
    setActiveCamera(cameraId);
  };

  const toggleDrsMode = () => {
    setDrsMode((prev) => !prev);
  };

  const openRecordedVideos = () => {
    setRecordedVideosOpen(true);
  };

  const closeRecordedVideos = () => {
    setRecordedVideosOpen(false);
  };

  return (
    <div style={{ padding: '20px', height: '100vh', backgroundColor: '#eaeff1' }}>
      <Grid container spacing={2} style={{ height: '100%' }}>
        {/* Main Camera Feed */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            style={{ 
              height: '70vh', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '10px'
            }}
          >
            <img 
              src={cameras[activeCamera].src} 
              alt={`Active ${cameras[activeCamera].name}`}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain', 
                borderRadius: '10px' 
              }}
            />
          </Paper>
          <Typography variant="h6" style={{ marginTop: '10px', textAlign: 'center' }}>
            {cameras[activeCamera].name}
          </Typography>
        </Grid>

        {/* Camera Thumbnails */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {cameras.map((camera) => (
              <Grid item xs={6} key={camera.id}>
                <Button
                  variant={activeCamera === camera.id ? 'contained' : 'outlined'}
                  onClick={() => handleCameraSwitch(camera.id)}
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    padding: 0,
                    border: activeCamera === camera.id ? 'none' : '2px solid #ccc',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={camera.src} 
                    alt={camera.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* DRS Mode and Recorded Video Buttons */}
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item xs={6}>
              <Button 
                variant="contained" 
                color={drsMode ? 'success' : 'primary'} 
                fullWidth
                onClick={toggleDrsMode}
              >
                {drsMode ? 'DRS Mode On' : 'DRS Mode'}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="contained" 
                color="secondary" 
                fullWidth
                onClick={openRecordedVideos}
              >
                Recorded Videos
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Recorded Videos Dialog */}
      <Dialog open={recordedVideosOpen} onClose={closeRecordedVideos}>
        <DialogTitle>Recorded Videos</DialogTitle>
        <DialogContent>
          <Typography variant="body1">No recorded videos available at the moment.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRecordedVideos} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
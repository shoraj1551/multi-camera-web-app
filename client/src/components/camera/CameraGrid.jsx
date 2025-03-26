import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { switchCamera } from '../../store/cameraSlice';
import CameraThumbnail from './CameraThumbnail';
import VideoPlayer from './VideoPlayer';

const CameraGrid = () => {
  const dispatch = useDispatch();
  const { cameras, activeCameraId } = useSelector((state) => state.camera);

  const handleCameraSwitch = (cameraId) => {
    dispatch(switchCamera(cameraId));
  };

  const activeCamera = cameras.find(camera => camera.id === activeCameraId);

  return (
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
            backgroundColor: '#f0f0f0'
          }}
        >
          <VideoPlayer 
            src={activeCamera.src} 
            alt={`Active ${activeCamera.name}`} 
          />
        </Paper>
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          {activeCamera.name}
        </Typography>
      </Grid>

      {/* Camera Thumbnails */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={2}>
          {cameras.map((camera) => (
            <Grid item xs={6} key={camera.id}>
              <CameraThumbnail 
                camera={camera}
                isActive={camera.id === activeCameraId}
                onClick={() => handleCameraSwitch(camera.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CameraGrid;
import React from 'react';
import { Button } from '@mui/material';

const CameraThumbnail = ({ camera, isActive, onClick }) => {
  return (
    <Button
      variant={isActive ? 'contained' : 'outlined'}
      onClick={onClick}
      style={{ 
        width: '100%', 
        height: '150px', 
        padding: 0,
        border: isActive ? 'none' : '2px solid #ccc',
        backgroundColor: isActive ? 'primary.main' : 'transparent'
      }}
    >
      <img 
        src={camera.src} 
        alt={camera.name}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          opacity: isActive ? 0.7 : 1
        }}
      />
    </Button>
  );
};

export default CameraThumbnail;
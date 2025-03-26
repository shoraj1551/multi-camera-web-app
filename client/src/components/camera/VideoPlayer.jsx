import React, { useState, useRef, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause, Fullscreen } from '@mui/icons-material';

const VideoPlayer = ({ src, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  // Handle media loading
  useEffect(() => {
    const currentMedia = videoRef.current || imageRef.current;
    
    if (currentMedia) {
      const handleLoad = () => {
        setIsLoaded(true);
      };

      const handleError = (error) => {
        console.error('Media loading error:', error);
        setIsLoaded(false);
      };

      currentMedia.addEventListener('load', handleLoad);
      currentMedia.addEventListener('error', handleError);

      // Cleanup event listeners
      return () => {
        currentMedia.removeEventListener('load', handleLoad);
        currentMedia.removeEventListener('error', handleError);
      };
    }
  }, [src]);

  // Toggle play/pause
  const togglePlay = () => {
    const currentMedia = videoRef.current || imageRef.current;
    
    if (currentMedia) {
      if (isPlaying) {
        currentMedia.pause();
      } else {
        // Attempt to play, handle potential errors
        currentMedia.play().catch(error => {
          console.error('Playback error:', error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Fullscreen handler
  const handleFullscreen = () => {
    const currentMedia = videoRef.current || imageRef.current;
    
    if (currentMedia) {
      if (currentMedia.requestFullscreen) {
        currentMedia.requestFullscreen();
      } else if (currentMedia.mozRequestFullScreen) {
        currentMedia.mozRequestFullScreen();
      } else if (currentMedia.webkitRequestFullscreen) {
        currentMedia.webkitRequestFullscreen();
      } else if (currentMedia.msRequestFullscreen) {
        currentMedia.msRequestFullscreen();
      }
    }
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isLoaded ? 'transparent' : '#f0f0f0'
      }}
    >
      {/* Fallback to image if video not supported */}
      <img 
        ref={imageRef}
        src={src} 
        alt={alt}
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%', 
          objectFit: 'contain',
          display: isLoaded ? 'block' : 'none'
        }}
        onClick={togglePlay}
      />

      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          Loading...
        </div>
      )}

      {isLoaded && (
        <div style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <Tooltip title={isPlaying ? "Pause" : "Play"}>
            <IconButton 
              color="primary" 
              onClick={togglePlay}
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: '50%'
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Fullscreen">
            <IconButton 
              color="primary"
              onClick={handleFullscreen}
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: '50%'
              }}
            >
              <Fullscreen />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
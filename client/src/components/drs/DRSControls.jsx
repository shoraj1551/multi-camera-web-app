import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Slider, 
  Typography, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  FastRewind, 
  FastForward, 
  Replay 
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  startReplay, 
  stopReplay, 
  setReplaySpeed, 
  seekReplay 
} from '../../store/drsSlice';

const DRSControls = () => {
  const dispatch = useDispatch();
  const { 
    isReplayMode, 
    currentRecording, 
    replaySpeed,
    currentTime,
    totalDuration
  } = useSelector((state) => state.drs);

  const [localSpeed, setLocalSpeed] = useState(replaySpeed);

  const handlePlayPause = () => {
    if (isReplayMode) {
      dispatch(stopReplay());
    } else {
      dispatch(startReplay());
    }
  };

  const handleSpeedChange = (event, newSpeed) => {
    setLocalSpeed(newSpeed);
    dispatch(setReplaySpeed(newSpeed));
  };

  const handleSeek = (event, newTime) => {
    dispatch(seekReplay(newTime));
  };

  const handleRestart = () => {
    dispatch(seekReplay(0));
    dispatch(startReplay());
  };

  if (!currentRecording) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: 2 
      }}>
        <Typography variant="h6">
          No Recording Selected
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ mt: 2 }}
        >
          Select Recording
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      p: 2 
    }}>
      <Typography variant="h6">
        {currentRecording.name}
      </Typography>

      {/* Playback Timeline */}
      <Box sx={{ width: '100%', mt: 2 }}>
        <Slider
          value={currentTime}
          max={totalDuration}
          onChange={handleSeek}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => {
            const minutes = Math.floor(value / 60);
            const seconds = Math.floor(value % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          }}
        />
      </Box>

      {/* Playback Controls */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        mt: 2 
      }}>
        <Tooltip title="Rewind">
          <IconButton 
            color="primary" 
            onClick={() => dispatch(seekReplay(currentTime - 10))}
          >
            <FastRewind />
          </IconButton>
        </Tooltip>

        <Tooltip title={isReplayMode ? "Pause" : "Play"}>
          <IconButton 
            color="primary" 
            onClick={handlePlayPause}
            size="large"
          >
            {isReplayMode ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Fast Forward">
          <IconButton 
            color="primary" 
            onClick={() => dispatch(seekReplay(currentTime + 10))}
          >
            <FastForward />
          </IconButton>
        </Tooltip>

        <Tooltip title="Restart">
          <IconButton 
            color="secondary" 
            onClick={handleRestart}
          >
            <Replay />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Replay Speed Control */}
      <Box sx={{ width: '100%', mt: 2 }}>
        <Typography gutterBottom>
          Replay Speed: {localSpeed}x
        </Typography>
        <Slider
          value={localSpeed}
          min={0.5}
          max={2}
          step={0.25}
          onChange={handleSpeedChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};

export default DRSControls;
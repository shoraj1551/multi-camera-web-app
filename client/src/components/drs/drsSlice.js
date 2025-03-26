import { createSlice } from '@reduxjs/toolkit';

const drsSlice = createSlice({
  name: 'drs',
  initialState: {
    isReplayMode: false,
    recordings: [],
    currentRecording: null,
    replaySpeed: 1,
    currentTime: 0,
    totalDuration: 0
  },
  reducers: {
    loadRecordings: (state, action) => {
      state.recordings = action.payload;
    },
    selectRecording: (state, action) => {
      state.currentRecording = action.payload;
      state.totalDuration = state.currentRecording 
        ? _convertTimeToDuration(state.currentRecording.duration) 
        : 0;
      state.currentTime = 0;
    },
    startReplay: (state) => {
      state.isReplayMode = true;
    },
    stopReplay: (state) => {
      state.isReplayMode = false;
    },
    setReplaySpeed: (state, action) => {
      state.replaySpeed = action.payload;
    },
    seekReplay: (state, action) => {
      const newTime = Math.max(0, Math.min(action.payload, state.totalDuration));
      state.currentTime = newTime;
    }
  }
});

// Helper function to convert time string to seconds
function _convertTimeToDuration(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export const { 
  loadRecordings, 
  selectRecording, 
  startReplay, 
  stopReplay, 
  setReplaySpeed, 
  seekReplay 
} = drsSlice.actions;

export default drsSlice.reducer;
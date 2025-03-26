```
multi-camera-web-app/
│
├── client/
│   ├── public/
│   │   ├── placeholder-camera-1.jpg
│   │   ├── placeholder-camera-2.jpg
│   │   ├── placeholder-camera-3.jpg
│   │   └── placeholder-camera-4.jpg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── camera/
│   │   │   │   ├── CameraGrid.jsx
│   │   │   │   ├── CameraThumbnail.jsx
│   │   │   │   └── VideoPlayer.jsx
│   │   │   │
│   │   │   ├── drs/
│   │   │   │   ├── DRSControls.jsx
│   │   │   │   └── DRSReplay.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Header.jsx
│   │   │       └── Sidebar.jsx
│   │   │
│   │   ├── contexts/
│   │   │   ├── CameraContext.jsx
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useCameraStream.js
│   │   │   └── useWebSocket.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RecordedVideos.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── apiService.js
│   │   │   └── socketService.js
│   │   │
│   │   ├── store/
│   │   │   ├── index.js
│   │   │   ├── cameraSlice.js
│   │   │   └── drsSlice.js
│   │   │
│   │   ├── utils/
│   │   │   ├── videoProcessing.js
│   │   │   └── streamHelpers.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   │   ├── cameraController.js
│   │   ├── drsController.js
│   │   └── videoController.js
│   │
│   ├── models/
│   │   ├── Camera.js
│   │   ├── Recording.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── cameraRoutes.js
│   │   ├── drsRoutes.js
│   │   └── videoRoutes.js
│   │
│   ├── services/
│   │   ├── streamService.js
│   │   └── recordingService.js
│   │
│   ├── sockets/
│   │   └── cameraSocket.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── socketConfig.js
│   │
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

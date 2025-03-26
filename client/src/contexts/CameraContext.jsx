import React, { createContext, useState } from 'react';

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
    const [activeCameras, setActiveCameras] = useState([]);

    const addCamera = (camera) => {
        setActiveCameras((prevCameras) => [...prevCameras, camera]);
    };

    const removeCamera = (cameraId) => {
        setActiveCameras((prevCameras) =>
            prevCameras.filter((camera) => camera.id !== cameraId)
        );
    };

    const clearCameras = () => {
        setActiveCameras([]);
    };

    return (
        <CameraContext.Provider
            value={{ activeCameras, addCamera, removeCamera, clearCameras }}
        >
            {children}
        </CameraContext.Provider>
    );
};
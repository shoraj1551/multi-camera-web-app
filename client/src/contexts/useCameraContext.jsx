import { useContext } from 'react';
import { CameraContext } from './CameraContext';

const useCameraContext = () => {
    const context = useContext(CameraContext);
    if (!context) {
        throw new Error('useCameraContext must be used within a CameraProvider');
    }
    return context;
};

export default useCameraContext;
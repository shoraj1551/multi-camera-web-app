import { useState, useEffect } from 'react';

const useCameraStream = (videoRef, constraints = { video: true }) => {
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const startStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(mediaStream);
                if (videoRef?.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                setError(err);
            }
        };

        startStream();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [videoRef, constraints, stream]);

    return { stream, error };
};

export default useCameraStream;
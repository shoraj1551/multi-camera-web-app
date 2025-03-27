import React, { useEffect, useState, useRef } from "react";
import { initWebRTC } from "../utils/webrtc";

const CameraStream = () => {
    const videoRefs = useRef([]);
    const [streams, setStreams] = useState([]);

    useEffect(() => {
        const startStreaming = async () => {
            const cameras = await fetch("/api/cameras").then(res => res.json()); 
            setStreams(cameras);

            cameras.forEach((camera, index) => {
                initWebRTC(camera.id, (stream) => {
                    if (videoRefs.current[index]) {
                        videoRefs.current[index].srcObject = stream;
                    }
                });
            });
        };

        startStreaming();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {streams.map((camera, index) => (
                <video key={camera.id} ref={el => videoRefs.current[index] = el} autoPlay playsInline className="border rounded shadow-lg"/>
            ))}
        </div>
    );
};

export default CameraStream;

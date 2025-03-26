// streamHelper.js

/**
 * Utility functions to handle media streams for a multi-camera web application.
 */

/**
 * Requests access to the user's media devices (camera and/or microphone).
 * @param {Object} constraints - Media constraints for video and audio.
 * @returns {Promise<MediaStream>} - A promise that resolves to the media stream.
 */
export async function getUserMedia(constraints = { video: true, audio: false }) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
    } catch (error) {
        console.error('Error accessing user media:', error);
        throw error;
    }
}

/**
 * Stops all tracks of a given media stream.
 * @param {MediaStream} stream - The media stream to stop.
 */
export function stopMediaStream(stream) {
    if (stream && stream.getTracks) {
        stream.getTracks().forEach((track) => track.stop());
    }
}

/**
 * Switches the active camera by stopping the current stream and requesting a new one.
 * @param {string} deviceId - The device ID of the camera to switch to.
 * @returns {Promise<MediaStream>} - A promise that resolves to the new media stream.
 */
export async function switchCamera(deviceId) {
    const constraints = {
        video: {
            deviceId: { exact: deviceId },
        },
        audio: false,
    };

    try {
        const stream = await getUserMedia(constraints);
        return stream;
    } catch (error) {
        console.error('Error switching camera:', error);
        throw error;
    }
}

/**
 * Lists all available video input devices (cameras).
 * @returns {Promise<MediaDeviceInfo[]>} - A promise that resolves to an array of video input devices.
 */
export async function listVideoInputDevices() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter((device) => device.kind === 'videoinput');
    } catch (error) {
        console.error('Error listing video input devices:', error);
        throw error;
    }
}

/**
 * Attaches a media stream to a video element.
 * @param {HTMLVideoElement} videoElement - The video element to attach the stream to.
 * @param {MediaStream} stream - The media stream to attach.
 */
export function attachStreamToVideoElement(videoElement, stream) {
    if (videoElement && stream) {
        videoElement.srcObject = stream;
        videoElement.play().catch((error) => {
            console.error('Error playing video:', error);
        });
    }
}
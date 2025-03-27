export const initWebRTC = (cameraId, onStreamReceived) => {
    const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.ontrack = (event) => {
        onStreamReceived(event.streams[0]);
    };

    fetch(`/api/camera/${cameraId}/offer`)
        .then(res => res.json())
        .then(async ({ offer, cameraSocketId }) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            fetch(`/api/camera/${cameraId}/answer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer, cameraSocketId }),
            });
        });
};

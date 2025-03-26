import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecordedVideos.css'; // Optional: Add custom styles for the page

const RecordedVideos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch recorded videos from the server or API
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/recorded-videos'); // Replace with your API endpoint
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="recorded-videos-page">
            <h1>Recorded Videos</h1>
            {videos.length === 0 ? (
                <p>No recorded videos available.</p>
            ) : (
                <div className="videos-grid">
                    {videos.map((video) => (
                        <div key={video.id} className="video-card">
                            <video
                                controls
                                src={video.url}
                                alt={video.title}
                                className="video-player"
                            />
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/" className="back-link">
                Back to Home
            </Link>
        </div>
    );
};

export default RecordedVideos;
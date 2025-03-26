// Removed unused TensorFlow.js import
import Jimp from 'jimp'; // For image manipulation
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'; // FFmpeg for video encoding/decoding

// videoProcessing.js

/**
 * Utility functions for video processing.
 * This module provides helper functions to handle video processing tasks
 * such as extracting frames, resizing videos, and applying filters.
 */

// Import necessary libraries

const ffmpeg = createFFmpeg({ log: true });

/**
 * Initialize FFmpeg library.
 * This function ensures FFmpeg is loaded before performing any operations.
 */
export async function initializeFFmpeg() {
    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }
}

/**
 * Extract frames from a video file.
 * @param {File} videoFile - The video file to extract frames from.
 * @param {number} fps - The number of frames per second to extract.
 * @returns {Promise<Array>} - A promise that resolves to an array of image buffers.
 */
export async function extractFrames(videoFile, fps = 1) {
    await initializeFFmpeg();

    const videoData = await fetchFile(videoFile);
    ffmpeg.FS('writeFile', 'input.mp4', videoData);

    const outputPattern = 'frame_%03d.png';
    await ffmpeg.run('-i', 'input.mp4', '-vf', `fps=${fps}`, outputPattern);

    const frames = [];
    let frameIndex = 1;

    while (true) {
        const frameName = `frame_${String(frameIndex).padStart(3, '0')}.png`;
        try {
            const frameData = ffmpeg.FS('readFile', frameName);
            frames.push(new Blob([frameData.buffer], { type: 'image/png' }));
            frameIndex++;
        } catch {
            break; // Exit loop when no more frames are found
        }
    }

    return frames;
}

/**
 * Resize a video to the specified dimensions.
 * @param {File} videoFile - The video file to resize.
 * @param {number} width - The desired width of the output video.
 * @param {number} height - The desired height of the output video.
 * @returns {Promise<Blob>} - A promise that resolves to the resized video as a Blob.
 */
export async function resizeVideo(videoFile, width, height) {
    await initializeFFmpeg();

    const videoData = await fetchFile(videoFile);
    ffmpeg.FS('writeFile', 'input.mp4', videoData);

    const outputFileName = 'output.mp4';
    await ffmpeg.run(
        '-i',
        'input.mp4',
        '-vf',
        `scale=${width}:${height}`,
        outputFileName
    );

    const outputData = ffmpeg.FS('readFile', outputFileName);
    return new Blob([outputData.buffer], { type: 'video/mp4' });
}

/**
 * Apply a grayscale filter to a video.
 * @param {File} videoFile - The video file to process.
 * @returns {Promise<Blob>} - A promise that resolves to the processed video as a Blob.
 */
export async function applyGrayscaleFilter(videoFile) {
    await initializeFFmpeg();

    const videoData = await fetchFile(videoFile);
    ffmpeg.FS('writeFile', 'input.mp4', videoData);

    const outputFileName = 'output.mp4';
    await ffmpeg.run('-i', 'input.mp4', '-vf', 'hue=s=0', outputFileName);

    const outputData = ffmpeg.FS('readFile', outputFileName);
    return new Blob([outputData.buffer], { type: 'video/mp4' });
}

/**
 * Convert a video to GIF format.
 * @param {File} videoFile - The video file to convert.
 * @param {number} fps - The frames per second for the GIF.
 * @returns {Promise<Blob>} - A promise that resolves to the GIF as a Blob.
 */
export async function convertVideoToGif(videoFile, fps = 10) {
    await initializeFFmpeg();

    const videoData = await fetchFile(videoFile);
    ffmpeg.FS('writeFile', 'input.mp4', videoData);

    const outputFileName = 'output.gif';
    await ffmpeg.run('-i', 'input.mp4', '-vf', `fps=${fps}`, outputFileName);

    const outputData = ffmpeg.FS('readFile', outputFileName);
    return new Blob([outputData.buffer], { type: 'image/gif' });
}

/**
 * Extract audio from a video file.
 * @param {File} videoFile - The video file to extract audio from.
 * @returns {Promise<Blob>} - A promise that resolves to the audio as a Blob.
 */
export async function extractAudio(videoFile) {
    await initializeFFmpeg();

    const videoData = await fetchFile(videoFile);
    ffmpeg.FS('writeFile', 'input.mp4', videoData);

    const outputFileName = 'output.mp3';
    await ffmpeg.run('-i', 'input.mp4', '-q:a', '0', '-map', 'a', outputFileName);

    const outputData = ffmpeg.FS('readFile', outputFileName);
    return new Blob([outputData.buffer], { type: 'audio/mpeg' });
}

/**
 * Merge multiple video files into one.
 * @param {Array<File>} videoFiles - An array of video files to merge.
 * @returns {Promise<Blob>} - A promise that resolves to the merged video as a Blob.
 */
export async function mergeVideos(videoFiles) {
    await initializeFFmpeg();

    const fileList = videoFiles.map((file, index) => {
        const fileName = `input${index}.mp4`;
        ffmpeg.FS('writeFile', fileName, fetchFile(file));
        return `file '${fileName}'`;
    });

    const fileListContent = fileList.join('\n');
    ffmpeg.FS('writeFile', 'fileList.txt', new TextEncoder().encode(fileListContent));

    const outputFileName = 'output.mp4';
    await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'fileList.txt', '-c', 'copy', outputFileName);

    const outputData = ffmpeg.FS('readFile', outputFileName);
    return new Blob([outputData.buffer], { type: 'video/mp4' });
}

export default {
    initializeFFmpeg,
    extractFrames,
    resizeVideo,
    applyGrayscaleFilter,
    convertVideoToGif,
    extractAudio,
    mergeVideos,
};
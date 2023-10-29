const fs = require("fs").promises;
const axios = require("axios");
const { fileExists, isURL, isVideoFile, processVideoBuffer } = require("./helpers");

async function videoDuration(video) {

  if (isURL(video)) {

    try {

      // Download video from the URL
      const response = await axios.get(video, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary', // Add this line for Node.js
      });

      // Status
      if (response.status !== 200) {
        throw new Error(`Failed to download the video from the URL: HTTP ${response.status}`);
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.startsWith("video/")) {

        // The response has a video MIME type
        const videoBuffer = await response.data;

        // Proceed with processing the video buffer
        return processVideoBuffer(videoBuffer);

      } else {

        throw new Error("The url is not a video.");
      }

    } catch (error) {

      if (axios.isAxiosError(error)) {

        // Handle Axios-specific errors 
        throw new Error('Axios Error:', error.message);
      } else {

        // Handle other errors
        throw new Error('Error:', error.message);
      }
    }

  } else if (isVideoFile(video) && (fileExists(video))) {

    const { size } = await fs.stat(video);
    const buff = Buffer.alloc(size);
    const file = await fs.open(video, "r");

    const { buffer } = await file.read({
      buffer: buff,
      length: size,
      offset: 0,
      position: 0,
    });

    await file.close();

    return processVideoBuffer(buffer);

  } else {

    throw new Error("Invalid video file/url/path");
  }

}

module.exports = { videoDuration };

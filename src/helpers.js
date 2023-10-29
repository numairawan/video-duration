const url = require("url");
const mime = require("mime-types");
const fs = require('fs');

function processVideoBuffer(buffer) {

    const header = Buffer.from("mvhd");
    const start = buffer.indexOf(header) + 16;
    const timeScale = buffer.readUInt32BE(start);
    const duration = buffer.readUInt32BE(start + 4);

    let lengthSeconds = Math.floor(duration / timeScale);
    let lengthMS = Math.floor((duration / timeScale) * 1000);

    return {
        ms: lengthMS,
        seconds: lengthSeconds,
        timeScale: timeScale,
        duration: duration,
    };
}

function isVideoFile(filePath) {

    const mimeType = mime.lookup(filePath);

    return mimeType && mimeType.startsWith("video/");
}

function isURL(input) {
    const parsedUrl = url.parse(input);
    return parsedUrl.protocol && (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:");
}


function fileExists(filePath) {

    try {
        fs.accessSync(filePath);
        return true;
    } catch (error) {
        return false;
    }
}


module.exports = { fileExists, isURL, isVideoFile, processVideoBuffer };
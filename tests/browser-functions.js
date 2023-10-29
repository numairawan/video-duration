async function videoDuration(video) {
    if (isURL(video)) {
        try {
            const response = await fetch(video);

            if (!response.ok) {
                throw new Error(`Failed to download the video from the URL: HTTP ${response.status}`);
            }
            const videoBuffer = new Uint8Array(await response.arrayBuffer());
            return processVideoBuffer(videoBuffer);
        } catch (error) {
            console.error(error);
        }

    } else if (video instanceof File && isVideoFile(video)) {
        const videoBuffer = await readVideoFile(video);
        return processVideoBuffer(videoBuffer);
    } else {
        console.error('Invalid video source.');
    }
}

function processVideoBuffer(buffer) {

    const header = new Uint8Array([109, 118, 104, 100]);
    const start = buffer.indexOfSequence(header) + 16;
    const timeScale = readUInt32BE(buffer, start);
    const duration = readUInt32BE(buffer, start + 4);

    let lengthSeconds = Math.floor(duration / timeScale);
    let lengthMS = Math.floor((duration / timeScale) * 1000);

    return {
        ms: lengthMS,
        seconds: lengthSeconds,
        timeScale: timeScale,
        duration: duration,
    };
}

function isURL(input) {
    try {
        new URL(input);
        return true;
    } catch (error) {
        return false;
    }
}

function isVideoFile(file) {
    return file.type.startsWith('video/');
}

function readVideoFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(new Uint8Array(event.target.result));
        };
        reader.onerror = (event) => {
            reject(event.error);
        };
        reader.readAsArrayBuffer(file);
    });
}

function readUInt32BE(buffer, offset) {
    return (buffer[offset] << 24) |
        (buffer[offset + 1] << 16) |
        (buffer[offset + 2] << 8) |
        buffer[offset + 3];
}

Uint8Array.prototype.indexOfSequence = function (sequence) {
    for (let i = 0; i < this.length - sequence.length + 1; i++) {
        let match = true;
        for (let j = 0; j < sequence.length; j++) {
            if (this[i + j] !== sequence[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return i;
        }
    }
    return -1;
};

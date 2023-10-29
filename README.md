<p align="center">
    <img src="https://raw.githubusercontent.com/numairawan/video-duration/main/art/video-duration.png" width="600" alt="video-duration">
    <p align="center">
        <a href="https://github.com/numairawan/video-duration"><img alt="Total Hits" src="https://hits.dwyl.com/numairawan/video-duration.svg?style=flat-square"></a>
        <a href="https://www.npmjs.com/package/@numairawan/video-duration"><img alt="Downloads" src="https://img.shields.io/npm/dt/@numairawan/video-duration"></a>
        <a href="https://www.npmjs.com/package/@numairawan/video-duration"><img alt="Version" src="https://img.shields.io/npm/v/@numairawan/video-duration?logo=npm&style=flat-square"></a>
        <a href="https://github.com/numairawan/video-duration"><img alt="License" src="https://img.shields.io/github/license/numairawan/video-duration"></a>
    </p>
</p>


------
**video-duration** 📺 Get video duration from any URL and video object in Node.js and the browser without ffmpeg/ffprobe.

## 📦 Installation

### Node.js

You can install the package using npm:

```sh
npm i @numairawan/video-duration
```

Usage in nodeJS

```js
const { videoDuration } = require("@numairawan/video-duration");

// Using a video URL
const videoUrl = "https://example.com/sample.mp4";
videoDuration(videoUrl)
  .then(duration => {
    console.log(`Video duration: `, duration);
  })
  .catch(error => {
    console.error(error);
  });

// Using a local video file (Node.js)
const localVideoPath = "path/to/local/video.mp4";
videoDuration(localVideoPath)
  .then(duration => {
    console.log(`Video duration: `, duration);
  })
  .catch(error => {
    console.error(error);
  });
```

### Browser

You can use the package in the browser by including it directly via a CDN. It's lightweight, only 1KB in size.

```sh
<script src="https://cdn.jsdelivr.net/npm/@numairawan/video-duration/dist/index.min.js"></script>
```

Usage in browser

```js
// VideoDuration class
const videoDuration = new VideoDuration();

// Using a video URL
const videoUrl = "https://example.com/sample.mp4";
videoDuration.analyze(videoUrl)
  .then(duration => {
    console.log(`Video duration: `, duration);
  })
  .catch(error => {
    console.error(error);
  });

// Using a local video file (Node.js)
const localVideoPath = "path/to/local/video.mp4";
videoDuration.analyze(localVideoPath)
  .then(duration => {
    console.log(`Video duration: `, duration);
  })
  .catch(error => {
    console.error(error);
  });
```

### Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests as well.

### License
This project is licensed under the **[MIT license](https://opensource.org/licenses/MIT)**.


## Connect with Me

Feel free to reach out to me for any project-related queries or collaborations. I'm always happy to connect and discuss ideas!

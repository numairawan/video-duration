const { videoDuration } = require("../src/main");

(async () => {

    // Get video duration
    let info = await videoDuration(
        "./example/file_example_MP4_640_3MG.mp4"
    );

    console.log(info);

})();
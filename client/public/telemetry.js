(function () {
    amp.plugin('telemetry', function (options) {
        var player = this
        var init = function () {
            console.log("plugin telemetry initialized with player ", player)
            console.log("Width and Height: ", player.width_, player.height_);

            //add an event listener
            player.addEventListener('pause', function (event, info) {
                console.log("Video Paused ", event, info);
            });

            player.addEventListener('playbackbitratechanged', function (event, info) {
                console.log("Video playbackbitratechanged", event, info);
            });

            player.addEventListener('play', function (event, info) {
                console.log("Video Played", event, info);
            });

            player.addEventListener('end', function (event, info) {
                console.log("Video Ended");
            });
            
            player.addEventListener('loadedmetadata', function (event, info) {
                
                console.log("Video MetaData: ", player.currentVideoStreamList());
                console.log("Audio MetaData: ", player.currentAudioStreamList());
            });

            
        }
        // initialize the plugin
        init();
    });
}).call(this);
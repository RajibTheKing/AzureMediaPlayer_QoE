(function () {
    amp.plugin('telemetry', function (options) {
        var player = this
        var init = function () {
            //console.log("plugin telemetry initialized with player ", player)

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
                
                //console.log("Video MetaData: ", player.currentVideoStreamList());
                let videoStreamList = player.currentVideoStreamList();
                let selectedIndex = videoStreamList.selectedIndex;
                let trackList = videoStreamList.streams[selectedIndex].tracks;
                let availableFrameSizes  = [];
                let availableBitrates  = [];
                trackList.forEach(element => {
                    availableFrameSizes.push(element.height + ' X ' + element.width);
                    availableBitrates.push(element.bitrate);
                });

                console.log(availableBitrates);
                console.log(availableFrameSizes);

                player.trigger(new Event('save_availabal_bitrates'), availableBitrates);

                //console.log("Audio MetaData: ", player.currentAudioStreamList());
            });

            
        }
        // initialize the plugin
        init();
    });
}).call(this);
(function () {
    amp.plugin('telemetry', function (options) {
        var player = this
        var bitrateChangedTimestamps = [];
        var bufferingStats = [];
        var bufferingEndingTimestamp, bufferingStartedTimestamp;
        var bufferingStarted = false;



        var init = function () {
            //console.log("plugin telemetry initialized with player ", player)

            //add an event listener
            player.addEventListener('pause', function (event, info) {
                console.log("Video Paused ", event, info);
            });

            player.addEventListener('playbackbitratechanged', function (event, info) {
                //Define new Event to store frameSizes
                let currentTimestamp = Date.now();
                bitrateChangedTimestamps.push(currentTimestamp);
                player.trigger(new Event('save_bitrate_change_timestamps'), bitrateChangedTimestamps);
            });

            player.addEventListener('play', function (event, info) {
                console.log("Video Played", event, info);
            });

            player.addEventListener('waiting', function (event, info) {
                bufferingStarted = true;
                bufferingStartedTimestamp = Date.now();
                console.log("Video waiting", event, info);
            });

            player.addEventListener('start', function (event, info) {
                console.log("Video started", event, info);
            });

            player.addEventListener('resume', function(event, info){
                console.log("resume event", info);
            });

            player.addEventListener('playing', function(event, info){
                console.log("playing event", info);
                //track how much time needed for that buffer
                if(bufferingStarted){
                    bufferingEndingTimestamp = Date.now();
                    bufferingTime = bufferingEndingTimestamp - bufferingStartedTimestamp;
                    console.log('buffering time = ', bufferingTime);
                    bufferingStats.push({startTime: bufferingStartedTimestamp, duration: bufferingTime});
                    bufferingStarted = false;

                    //create a new event to store buffering stats
                    player.trigger(new Event('save_buffering_stats'), bufferingStats);
                }
            })

            player.addEventListener('ended', function (event, info) {
                console.log("Video Ended");
            });
            
            player.addEventListener('loadedmetadata', function (event, info) {
                console.log("Buffer Data: ", player.videoBufferData());

                let videoStreamList = player.currentVideoStreamList();
                let selectedIndex = videoStreamList.selectedIndex;
                let trackList = videoStreamList.streams[selectedIndex].tracks;
                console.log(trackList);
                let availableFrameSizes  = [];
                let availableBitrates  = [];
                trackList.forEach(element => {
                    availableFrameSizes.push(element.height + ' X ' + element.width);
                    availableBitrates.push(element.bitrate);
                });

                console.log(availableBitrates);
                console.log(availableFrameSizes);

                //Define new Event to store Bitrates
                player.trigger(new Event('save_available_bitrates'), availableBitrates);

                //Define new Event to store frameSizes
                player.trigger(new Event('save_available_framesizes'), availableFrameSizes);

                //console.log("Audio MetaData: ", player.currentAudioStreamList());
            });

            player.addEventListener('downloadrequested', function(event, info){
                console.log("download requested: ", Date.now());
            }); 
            
        }
        // initialize the plugin
        init();
    });
}).call(this);
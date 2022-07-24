<template>
  <v-card class="mx-auto" max-width="1200" tile justify-center>
    <v-row>
      <v-col>
        <v-card>
          <video id= "myVideo" ref="video" class="azuremediaplayer amp-default-skin ma-2">
            <p class="amp-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video
            </p>
          </video>
        </v-card>

        <v-btn @click="send_QoE_Stats()">
          Send Data to Server
        </v-btn>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title justify-center>Monitor QoE</v-card-title>

          <v-card-subtitle>Available Frame Sizes </v-card-subtitle>
          <v-list>
            <v-list-item
              v-for="(item, i) in statistics.availableFrameSizes" :key="i"
            >
            
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>

          <v-card-subtitle>Available Bitrates </v-card-subtitle>
          <v-list>
              <v-list-item
                v-for="(item, i) in statistics.availableBitrates" :key="i"
              >
              
                <v-list-item-content>
                  <v-list-item-title v-text="humanReadableBitrate(item)"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

          </v-list>

          <v-card-subtitle>Bitrate Changed Timestamps </v-card-subtitle>
          <v-list>
              <v-list-item
                v-for="(item, i) in statistics.bitrateChangedTimestamps" :key="i"
              >
              
                <v-list-item-content>
                  <v-list-item-title v-text="humanReadableTimestamp(item)"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

          </v-list>

          <v-card-subtitle>Buffering Statistics </v-card-subtitle>
          <v-list>
              <v-list-item
                v-for="(item, i) in statistics.bufferingStats" :key="i"
              >
              
                <v-list-item-content>
                  <v-list-item-title v-text="humanReadableTimestamp(item.startTime) + ' ' +(item.duration) + 'ms'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

          </v-list>
          
        </v-card>

      </v-col>

    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'
import '@/scripts/telemetry.js'

export default Vue.extend({
  name: 'AzureMediaPlayer',
  data () {
    return {}
  },

  created () {
    this.setupVideoPlayer();
    console.log(this.statistics);
    var instance = this;
  },

  computed: {
    ...mapGetters({
      statistics: 'getStatistics'
    }),

    // ...mapActions({
    //   saveBitrates: 'saveAvailableBitrates',
    //   saveFramesizes: 'saveAvailableFrameSizes',
    //   addBitrateChanged: 'addBitrateChangeTimestamp',
    // })
  },

  methods: {
    humanReadableBitrate(bitrate: number) : string {
      if(bitrate/1000000 >= 1){
        return (bitrate/1000000).toFixed(2) + " Mbps";
      }else{
        return (bitrate/1000).toFixed(2) + " Kbps";
      }
    },

    humanReadableTimestamp(timestamp: number) : string {
      var s = new Date(timestamp).toLocaleTimeString("en-US");
      return s;
    },

    send_QoE_Stats() {
      this.$store.dispatch('SubmitStatistics', {
        statistics: {
          framesizes: this.statistics.availableFrameSizes,
          bitrates: this.statistics.availableBitrates,
          bitratechanged: this.statistics.bitrateChangedTimestamps,
          bufferstats: this.statistics.bufferingStats
          }
      });
    },

    setupVideoPlayer() {
       this.$nextTick(() => {
          //console.log(this.$refs);
          let currentInstance = this;

          var myPlayer = amp(this.$refs.video, { /* Options */
                "nativeControlsForTouch": false,
                autoplay: true,
                controls: true,
                width: "640",
                height: "480",
                poster: "",
                plugins: {
                  /* load our telemetry plugin */
                  telemetry: {
                  /* Options */
                  }
                }
            }, function() {
                  console.log('Good to go!');
              }
        );
        myPlayer.src([{
            src: "http://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest",
            type: "application/vnd.ms-sstr+xml"
        }]);

        //Listen to events for some statistics
        myPlayer.addEventListener('save_available_bitrates', function (event: any, bitrates : any) {
            currentInstance.$store.dispatch('saveAvailableBitrates', {bitrates});
        });

        myPlayer.addEventListener('save_available_framesizes', function (event: any, framesizes : any) {
            currentInstance.$store.dispatch('saveAvailableFrameSizes', {framesizes});

        });

        myPlayer.addEventListener('save_bitrate_change_timestamps', function (event: any, timestamps : any) {
            currentInstance.$store.dispatch('saveBitrateChangeTimestamps', {timestamps});
        });

        myPlayer.addEventListener('save_buffering_stats', function (event: any, bufferingStats : any) {
            currentInstance.$store.dispatch('saveBufferingStats', {bufferingStats});
        });

      })
    }
  }

})
</script>
<style scoped>
.v-list-item__content{
  padding: 2px;
}

.v-list-item{
  padding: 2px;
  padding-left: 20px;
  min-height: 10px;
}
</style>

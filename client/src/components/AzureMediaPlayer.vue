<template>
  <v-card class="mx-auto" max-width="654" tile justify-center>
    <v-card>
      <video id= "myVideo" ref="video" class="azuremediaplayer amp-default-skin ma-2">
        <p class="amp-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video
        </p>
      </video>
    </v-card>
    
    <v-card>
      <v-card-title>Monitor QoE</v-card-title>

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
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

      </v-list>

      <v-card-subtitle>Bitrate Changed Timestamps </v-card-subtitle>
      <v-list>
          <v-list-item
            v-for="(item, i) in statistics.bitrateChangedTimestamps" :key="i"
          >
          
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

      </v-list>
      
    </v-card>

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
            console.log("save_availabale_bitrates", bitrates);
            currentInstance.$store.dispatch('saveAvailableBitrates', {bitrates});
        });

        myPlayer.addEventListener('save_available_framesizes', function (event: any, framesizes : any) {
            console.log("save_availabal_framesizes", framesizes);
            currentInstance.$store.dispatch('saveAvailableFrameSizes', {framesizes});

        });

        myPlayer.addEventListener('save_bitrate_change_timestamp', function (event: any, timestamp : any) {
            console.log("save_bitrate_change_timestamp", {timestamp});
        });

      })
    }
  }

})
</script>

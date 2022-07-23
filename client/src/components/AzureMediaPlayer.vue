<template>
  <v-card class="mx-auto" max-width="654" tile justify-center>

    <video id= "myVideo" ref="video" class="azuremediaplayer amp-default-skin ma-2">
        <p class="amp-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video
        </p>
    </video>

  </v-card>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'AzureMediaPlayer',
  data () {
    return {}
  },

  created () {
    this.setupVideoPlayer();
  },

  computed: {
  },

  methods: {

    setupVideoPlayer() {
       this.$nextTick(() => {
          //console.log(this.$refs);
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
      })
    }
  }

})
</script>

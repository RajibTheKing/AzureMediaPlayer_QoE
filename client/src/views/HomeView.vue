<template>
  <azure-media-player />
</template>

<script lang="ts">
import Vue from 'vue'
import AzureMediaPlayer from '../components/AzureMediaPlayer.vue'

export default Vue.extend({
  name: 'HomeView',

  components: {
    AzureMediaPlayer
  }
})
</script>

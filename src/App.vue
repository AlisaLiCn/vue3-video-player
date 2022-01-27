<template>
  <div class="video-player">
    <video-player
      :options="playerOptions"
      :currentTime="currentTime"
      @pause="onPause"
      @play="onPlay"
      @playing="onPlaying"
      @ended="onEnded"
    ></video-player>
  </div>
</template>

<script lang="ts" setup>
import VideoPlayer from '@/components/video-player/index.vue'

const currentTime = ref(20)

const playerOptions = reactive({
  autoplay: 'play',
  controls: true,
  language: 'zh',
  inactivityTimeout: 7 * 24 * 60 * 60 * 1000,
  playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
  poster: '',
  sources: [
    {
      type: 'video/mp4',
      src: '//vjs.zencdn.net/v/oceans.mp4'
    }
  ],
  controlBar: {
    durationDisplay: true,
    currentTimeDisplay: true,
    timeDivider: true,
    volumePanel: {
      inline: false
    },
    children: [
      'playToggle',
      'currentTimeDisplay',
      'timeDivider',
      'durationDisplay',
      'progressControl',
      'playbackRateMenuButton',
      'volumeMenuButton',
      'fullscreenToggle'
    ]
  }
})

const onPause = (video: any) => {}

const onPlay = (video: any) => {}

const onEnded = (video: any) => {}

const onPlaying = (video: any) => {}

// 1
</script>

<style lang="scss" scoped>
.video-player {
  position: relative;
  margin: 30px auto;
  width: 1200px;
  height: 600px;
}
</style>

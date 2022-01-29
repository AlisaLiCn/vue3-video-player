<template>
  <div class="section-title">video.js player</div>
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

  <div class="section-title">xg player</div>
  <div class="video-player">
    <video-player-xg :options="xgOptions"></video-player-xg>
  </div>
</template>

<script lang="ts" setup>
import VideoPlayer from '@/components/video-player/index.vue'
import VideoPlayerXg from '@/components/video-player-xg/index.vue'

const currentTime = ref(20)

const playerOptions = reactive({
  autoplay: false,
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

const xgOptions = reactive({
  id: 'video-player-xg',
  url: 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
  width: '100%',
  height: '100%',
  closeInactive: true
})
</script>

<style lang="scss" scoped>
.video-player {
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  height: 600px;
}
.section-title {
  padding-top: 20px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
</style>

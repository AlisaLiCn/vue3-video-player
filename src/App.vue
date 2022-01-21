<template>
  <div class="video-player">
    <video-player
      :options="playerOptions"
      :is-audio="type === 2"
      :currentTime="props.currentTime"
      @pause="onPause"
      @play="onPlay"
      @playing="onPlaying"
      @ended="onEnded"
    ></video-player>
  </div>
</template>

<script lang="ts" setup>
import VideoPlayer from '@/components/video-player/index.vue'

const props = defineProps({
  type: {
    type: Number
  },
  url: {
    type: String
  },
  currentTime: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['pause', 'play', 'ended'])

const playerOptions = reactive({
  autoplay: 'play',
  controls: true,
  language: 'zh',
  inactivityTimeout: 7 * 24 * 60 * 60 * 1000,
  playbackRates: [0.5, 1.0, 1.5, 2.0],
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

watch(
  () => props.url,
  newVal => {
    playerOptions.sources[0].src = newVal
  }
)

const isPaused = ref(true)
const onPause = (video: any) => {
  isPaused.value = true
  emits('pause')
}

const onPlay = (video: any) => {
  isPaused.value = false
  emits('play')
}

const onEnded = (video: any) => {
  isPaused.value = true
  emits('ended')
}

const onPlaying = (video: any) => {}
</script>

<style lang="scss" scoped>
.video-player {
  position: relative;
  margin: 30px auto;
  width: 1200px;
  height: 600px;
}
</style>

<template>
  <div class="video-player-wrap" v-if="reseted">
    <video ref="videoPlayer" class="video-js vjs-custom"></video>
  </div>
</template>

<script lang="ts">
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'

const DEFAULT_EVENTS = [
  'abort',
  'canplay',
  'canplaythrough',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'playing',
  'ratechange',
  'resize',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting'
]
</script>

<script lang="ts" setup>
const props = defineProps({
  options: {
    type: Object
  },
  currentTime: {
    type: Number,
    default: 0
  }
})

const reseted = ref(true)
const player = ref<any>(null)
const videoPlayer = ref(null)

const emits = defineEmits(DEFAULT_EVENTS)

watch(
  () => props.options,
  async newVal => {
    await disposeVideo()
    initVideo()
  },
  {
    deep: true
  }
)

onMounted(() => {
  initVideo()
})

function initVideo() {
  player.value = videojs(videoPlayer.value, props.options, function onPlayerReady(this: any) {
    if (props.currentTime > 0) {
      this.currentTime(props.currentTime)
    }

    const events = DEFAULT_EVENTS
    const onEvents: { [key: string]: any } = {}
    // 监听事件
    for (let i = 0; i < events.length; i++) {
      if (typeof events[i] === 'string' && !onEvents[events[i]]) {
        const event = events[i]
        onEvents[event] = 1
        this.on(event, () => {
          emitPlayerState(event)
        })
      }
    }
  })
}

const emitPlayerState = (event: string) => {
  if (event) {
    emits(event, player.value)
  }
}

async function disposeVideo() {
  if (player.value && player.value.dispose) {
    player.value.pause && player.value.pause()
    player.value.dispose()
    player.value = null
    await nextTick()
    reseted.value = false
    await nextTick()
    reseted.value = true
    await nextTick()
  }
}

onBeforeUnmount(() => {
  disposeVideo()
})
</script>

<style lang="scss">
.video-player-wrap {
  width: 100%;
  height: 100%;
}
.vjs-custom {
  width: 100%;
  height: 100%;
  cursor: pointer;

  &.vjs-paused {
    .vjs-big-play-button {
      display: block;
    }
  }
  .vjs-big-play-button {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .vjs-control-bar {
    display: flex;
    background-color: #000;
  }

  /* progress */
  .vjs-progress-control {
    .vjs-slider {
      background-color: #fff;
    }
    .vjs-load-progress {
      background: rgb(209, 209, 209, 0.2);
      div {
        background: rgb(220, 223, 230, 0.8);
      }
    }
    .vjs-play-progress {
      background: var(--el-color-primary);
    }
  }

  /* time */
  .vjs-time-control {
    display: block;
    min-width: unset;
    width: unset;
  }
  .vjs-current-time {
    padding-right: 0;
  }
  .vjs-remaining-time {
    display: none;
  }
  .vjs-duration {
    padding-left: 0;
  }
  .vjs-time-divider {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

<template>
  <div :id="props.options.id"></div>
</template>

<script setup>
import Player from 'xgplayer'
import './.xgplayer/skin/index.js'

const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        id: 'video-player-xg'
      }
    }
  }
})

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

const player = ref()

onMounted(() => {
  initVideo()
})

function initVideo() {
  player.value = new Player(props.options)
}

function destroyVideo() {
  player.value.destroy()
}
onBeforeUnmount(() => {
  destroyVideo()
})
</script>

<style scoped lang="scss"></style>

<template>
  <main>
    <MaterialFormFileSelector
      v-model="state.files"
      label="Choose an image"
      accept="image/*"
      :modifiers="{ primary: true }"
    />
    <canvas ref="canvas" />
  </main>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  watch,
  onMounted,
} from 'vue';

import MaterialFormFileSelector from '@/components/Materials/Form/FileSelector.vue';

const canvas = ref<HTMLCanvasElement | null>(null);

const state = reactive<{
  files: File[];
  img: HTMLImageElement;
  ctx?: CanvasRenderingContext2D | null;
}>({
  files: [],
  img: new Image(),
});

watch(() => state.files, ([file]) => {
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    if (!e.target) return;
    state.img.src = `${e.target.result}`;
  });
  reader.readAsDataURL(file);
});

onMounted(() => {
  state.img.addEventListener('load', () => {
    if (!canvas.value || !state.ctx) return;

    canvas.value.width = state.img.naturalWidth;
    canvas.value.height = state.img.naturalHeight;

    state.ctx.filter = 'grayscale(100%) contrast(200%)';
    state.ctx.drawImage(state.img, 0, 0);
    state.ctx.filter = 'none';
  });
  state.ctx = canvas.value?.getContext('2d');
});
</script>

<style lang="scss" src="./index.scss">
</style>

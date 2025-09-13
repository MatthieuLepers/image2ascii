<template>
  <div
    :id="props.id"
    class="m-accordion"
  >
    <button
      type="button"
      :class="GenerateModifiers('m-accordion__button', { open: state.open })"
      @click="state.open = !state.open"
    >
      <slot name="title">
        {{ props.title }}
      </slot>
    </button>
    <div
      v-show="state.open"
      class="m-accordion__content"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  id: { type: String, default: null },
  title: { type: String, required: true },
  open: { type: Boolean, default: false },
});

const state = reactive({
  open: props.open,
});

watch(() => props.open, (open) => {
  state.open = open;
});
</script>

<style lang="scss" src="./Accordion.scss">
</style>

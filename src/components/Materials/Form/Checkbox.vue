<template>
  <div :class="GenerateModifiers('m-form-checkbox', {
    focus: state.focused,
    checked: State.checked,
    [props.variant]: true,
    ...props.modifiers,
  })">
    <input
      type="checkbox"
      :id="props.id || `formCheckbox${$uid}`"
      :value="props.value"
      :name="props.name"
      :disabled="props.disabled"
      :checked="State.checked"
      @click="actions.handleClick"
      @focus="state.focused = true"
      @blur="state.focused = false"
    />
    <label :for="props.id || `formCheckbox${$uid}`">
      <slot>{{ props.label }}</slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, getCurrentInstance } from 'vue';

import type {
  TValue,
  IProps,
  IClickEmitDetails,
  IState,
} from './Checkbox';

defineOptions({ name: 'FormCheckbox' });

const emit = defineEmits<{
  click: [e: MouseEvent, details: IClickEmitDetails ];
}>();
const $uid = getCurrentInstance()?.uid;

const modelValue = defineModel<Array<TValue> | TValue, string>();

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  variant: 'default',
  modifiers: () => ({}),
});

const state = reactive<IState>({
  focused: false,
});

const State = computed(() => {
  const model = Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value];
  const checked = model.includes(props.value);

  return {
    modelValue: model,
    checked,
  };
});

const actions = {
  handleClick(e: MouseEvent) {
    const { checked } = e.target as HTMLInputElement;

    if (checked && !State.value.modelValue.includes(props.value)) {
      modelValue.value = [...State.value.modelValue, props.value];
    } else if (!checked && State.value.modelValue.includes(props.value)) {
      modelValue.value = State.value.modelValue.filter((v) => v !== props.value);
    }
    emit('click', e, { value: props.value, checked });
  },
};
</script>

<style lang="scss" src="./Checkbox.scss">
</style>

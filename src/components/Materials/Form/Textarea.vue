<template>
  <div :class="GenerateModifiers('m-form-textarea', {
    valid: props.valid !== null && props.valid,
    invalid: props.valid !== null && !props.valid,
    [variant]: !!props.variant,
    focus: state.focused,
    empty: State.isEmpty,
    required: props.required,
    readonly: props.readonly,
    disabled: props.disabled,
    adornment: props.iconData.icon || props.iconData.text || props.type === 'password',
    noLabel: !props.label || !props.label.length,
  })">
    <div class="m-form-textarea__container">
      <textarea
        :id="props.id || `formTextarea${$uid}`"
        :placeholder="props.placeholder"
        :required="props.required"
        :readonly="props.readonly"
        :disabled="props.disabled"
        :value="modelValue"
        :name="name"
        :autocomplete="autocomplete"
        :rows="props.rows"
        @input="modelValue = $event.target.value"
        @click="emit('click')"
        @keydown="emit('keydown', $event)"
        @focus="actions.handleFocus('focus', true)"
        @blur="actions.handleFocus('blur', false)"
      />
      <label
        v-if="props.label"
        class="m-form-textarea__label"
        :for="`formTextarea${$uid}`"
      >
        {{ props.label }}
      </label>
      <component
        v-if="props.iconData.icon || props.iconData.text"
        type="button"
        :is="props.iconData.clickable ? 'button' : 'span'"
        :class="[props.iconData.icon, GenerateModifiers('m-form-textarea__adornment', { clickable: props.iconData.clickable })]"
        :aria-label="props.iconData.ariaLabel"
        :aria-hidden="!props.iconData.clickable"
        @click.stop="emit('icon', $event)"
      >
        {{ props.iconData.text || '' }}
      </component>
    </div>

    <MaterialFormMessageList
      :valid="props.valid"
      :touched="state.touched"
      :messages="props.messages"
    />
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  ref,
  getCurrentInstance,
} from 'vue';

import MaterialFormMessageList from '@/components/Materials/Form/MessageList.vue';

defineOptions({ name: 'FormTextarea' });
const emit = defineEmits(['click', 'keydown', 'icon', 'focus', 'blur']);
const $uid = ref(getCurrentInstance().uid);

const modelValue = defineModel({ type: String });

const props = defineProps({
  id: { type: String, default: null },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: null },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: null },
  iconData: { type: Object, default: () => ({}) },
  variant: { type: String, default: 'default' },
  valid: { type: Boolean, default: null },
  messages: { type: Array, default: () => [] },
  rows: { type: String, default: null },
  autocomplete: { type: [String, Boolean], default: null },
  name: { type: String, default: null },
});

const state = reactive({
  focused: false,
  touched: false,
});

const State = computed(() => ({
  isEmpty: !modelValue.value.length && !props.placeholder?.length,
}));

const actions = {
  handleFocus(type, value) {
    if (!state.touched) {
      state.touched = true;
    }
    state.focused = value;
    emit(type, state.focused);
  },
};
</script>

<style lang="scss" src="./Textarea.scss">
</style>

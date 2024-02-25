<template>
  <div class="d-flex flex-col mar-h-5 mar-v-1">
    <label
      for="input"
      class="mar-h-8 color-primary"
      :class="{'color-invalid': isError}"
      style="
        font-family: var(--font-family);
        font-size: var(--font-size-base-hd)"
    >
      {{ labelText + (isRequired ? '*' : '') }}
    </label>
    <div class="d-flex flex-row mar-h-3">
      <img class="mar-right-2" :src=whatIcon alt="icon" width="24" height="24">
      <input
        :value="modelValue"
        :type=typeIs
        id="input"
        :placeholder=placeholder
        @input="updateValue"
        class="input w-100 border-none"
        style="border-bottom: 1px solid var(--color-border)"
      >
    </div>
  </div>
</template>

<script>
import person from '../assets/img/person.svg';
import numbers from '../assets/img/numbers.svg';
import mobile from '../assets/img/mobile.svg';
import email from '../assets/img/mail.svg';

export default {
  data() {
    return {
      placeholder: 'не указано',
      icon: {
        personIcon: person,
        numbersIcon: numbers,
        mobileIcon: mobile,
        emailIcon: email,
      },
    };
  },
  props: {
    labelText: {
      type: String,
      default: '',
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
      required: true,
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    isError: {
      type: Boolean,
      default: false,
      required: true,
    },
    pickedIcon: {
      type: String,
    },
  },
  computed: {
    typeIs() {
      return this.type;
    },
    whatIcon() {
      return this.icon[this.pickedIcon];
    },
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

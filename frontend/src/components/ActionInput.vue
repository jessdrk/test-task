<template>
  <label for="input" class="changeStyle" :class="{'error': isError}">
    {{ labelText + (isRequired ? '*' : '') }}
    <input
      :value="modelValue"
      :type=typeIs
      id="input"
      :placeholder=placeholder
      @input="updateValue"
    >
  </label>
</template>

<script>
export default {
  data() {
    return {
      placeholder: 'не указано',
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
  },
  computed: {
    typeIs() {
      return this.type;
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

<style>
.changeStyle {
  display: flex;
  flex-direction: column;
}

.error {
  color: red;
}
</style>

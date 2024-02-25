<template>
  <div>
    <label for="select" :class="{'error': isError}">
      {{ labelText + (isRequired ? '*' : '')}}
      <select v-model="selectedItem" @change="handleChange" id="select">
        <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
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
    isError: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      selectedItem: null,
    };
  },
  methods: {
    handleChange() {
      this.$emit('update:modelValue', this.selectedItem);
    },
  },
};
</script>

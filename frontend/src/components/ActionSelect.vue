<template>
  <div class="d-flex flex-col mar-v-2 mar-h-5">
    <label
      class="mar-h-8 color-primary"
      for="select"
      style="font-family: var(--font-family);
        font-size: var(--font-size-base-hd)"
      :class="{'invalid': isError}"
    >
      {{ labelText + (isRequired ? '*' : '')}}
    </label>
    <div class="d-flex flex-row mar-h-3">
      <img class="mar-right-2" :src=whatIcon alt="icon" width="24" height="24">
      <select
        v-model="selectedItem"
        @change="handleChange"
        id="select"
        class="select w-100 border-none mar-left-1"
        placeholder="normal"
        style="border-bottom: 1px solid var(--color-border)"
      >
        <option selected v-for="item in items" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import briefcase from '../assets/img/briefcase.svg';

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
    pickedIcon: {
      type: String,
    },
  },
  data() {
    return {
      selectedItem: null,
      briefcaseIcon: briefcase,
    };
  },
  methods: {
    handleChange() {
      this.$emit('update:modelValue', this.selectedItem);
    },
  },
  computed: {
    whatIcon() {
      return this.briefcaseIcon;
    },
  },
};
</script>

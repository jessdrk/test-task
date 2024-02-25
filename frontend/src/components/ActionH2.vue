<template>
  <h2
    class="h2 mar-none text-bold color-body"
      style="font-size: var(--font-size-base);
      font-family: var(--font-family-headings);"
  >
    {{ text }}
  </h2>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

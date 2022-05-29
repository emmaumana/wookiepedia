<script setup>
const props = defineProps({
  query: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="no-results py-5">
    <i class="no-results__icon fa-solid fa-hands-bubbles"></i>
    <p class="no-results__title title is-4 mt-5">
      No search results for: {{ query }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.no-results {
  &__icon {
    font-size: 45px;
    color: #3e8ed0;
  }
}
</style>

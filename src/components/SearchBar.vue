<script setup>
const emit = defineEmits(['queried'])

const sendQuery = e => {
  emit('queried', e.target.value.toLowerCase())
}
</script>

<template>
  <div class="search-bar">
    <div class="field has-addons">
      <div class="control has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Search by name..."
          @input="sendQuery"
        />
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  .control {
    width: 100%;
  }
}
</style>

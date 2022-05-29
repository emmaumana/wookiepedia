<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['filtered'])

const filter = e => {
  // const fileteredResidents = props.data.filter(resident =>
  //   resident.name.toLowerCase().includes(e.target.value.toLowerCase())
  // )
  // emit('filtered', fileteredResidents)
  emit('filtered', e.target.value.toLowerCase())
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
          @input="filter"
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

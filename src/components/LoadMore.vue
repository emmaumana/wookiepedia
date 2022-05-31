<script setup>
import { useStore } from 'vuex'
import { onMounted, ref, computed } from 'vue'
import { getNumberFromString } from '../utils/index'

const store = useStore()

const isLoading = ref(false)

const changeLoadingStatus = () => {
  isLoading.value = !isLoading.value
}

const loadMore = async () => {
  changeLoadingStatus()
  await store.dispatch('residents/fetchResidents', parseInt(nextPage.value))
  changeLoadingStatus()
}

const loadMoreTest = async () => {
  await store.dispatch('residents/fetchResidents', 0)
}

const isTableLoaded = computed(() => {
  return store.state.loadStatus.isLoaded
})

const nextPage = computed(() => {
  return getNumberFromString(store.state.residents.residents.next)
})

const buttonText = computed(() => {
  return nextPage.value ? 'Load more' : 'No more people'
})

const buttonLoadingClass = computed(() => {
  return isLoading.value ? 'is-loading' : ''
})
</script>

<template>
  <div v-if="isTableLoaded" class="load-more">
    <div class="buttons is-centered">
      <button
        @click="loadMore"
        class="button is-danger is-outlined"
        :class="[buttonLoadingClass]"
        :disabled="!nextPage"
      >
        {{ buttonText }}
      </button>

      <button @click="loadMoreTest" class="button is-info is-outlined">
        Test notification
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button {
  &.is-danger:focus,
  &.is-info:focus {
    box-shadow: none !important;
  }
}
</style>

<script setup>
import { useStore } from 'vuex'
import { onMounted, ref, computed } from 'vue'
import { getNumberFromString } from '../utils/index'

const store = useStore()

const nextPage = ref(getNumberFromString(store.state.residents.residents.next))
const isLoading = ref(false)

const updateNextPage = () => {
  nextPage.value = getNumberFromString(store.state.residents.residents.next)
}

const changeLoadingStatus = () => {
  isLoading.value = !isLoading.value
}

const loadMore = async () => {
  changeLoadingStatus()
  await store.dispatch('residents/fetchResidents', parseInt(nextPage.value))
  updateNextPage()
  changeLoadingStatus()
}

const buttonText = computed(() => {
  return nextPage.value ? 'Load more' : 'No more people'
})

const buttonLoadingClass = computed(() => {
  return isLoading.value ? 'is-loading' : ''
})
</script>

<template>
  <div class="load-more">
    <div class="buttons is-centered">
      <button
        @click="loadMore"
        class="button is-danger is-outlined"
        :class="[buttonLoadingClass]"
        :disabled="!nextPage"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button {
  &.is-danger:focus {
    box-shadow: none;
  }
}
</style>

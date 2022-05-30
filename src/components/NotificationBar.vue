<script setup>
import { useStore } from 'vuex'
import { onMounted, onBeforeUnmount } from 'vue'

const store = useStore()

let timeout
const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  timeout = setTimeout(() => {
    store.dispatch('notifications/remove', props.notification)
  }, 2500)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
})
</script>

<template>
  <div class="notifications__notification notification is-danger">
    <p class="notifications__notification-title title is-6">
      There was a comunication problem with the Api
    </p>
    <p class="notifications__notification-message mt-0">
      {{ notification.message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.notifications__notification {
  user-select: none;
  transition: 0.3s;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
}
</style>

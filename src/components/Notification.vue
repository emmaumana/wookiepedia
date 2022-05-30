<script setup>
import { useStore } from 'vuex'
import NotificationBar from './NotificationBar.vue'

const store = useStore()
</script>

<template>
  <div class="notifications">
    <transition-group name="translate-from-right">
      <NotificationBar
        v-for="notification in store.state.notifications.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.notifications {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
  width: 100%;
  right: 0;
  padding-right: 10px;
  z-index: 300;
}

/* translate from right */
.translate-from-right-enter-active,
.translate-from-right-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.translate-from-right-enter-from,
.translate-from-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 0
export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  DELETE(state, notificationToRemove) {
    console.log(notificationToRemove)
    state.notifications = state.notifications.filter(notification => {
      return notification.id !== notificationToRemove.id
    })
  }
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}

import { createStore } from 'vuex'
// modules
import * as residents from './modules/residents'
import * as loadStatus from './modules/loadStatus'
import * as notifications from './modules/notifications'

export const store = createStore({
  modules: {
    residents,
    loadStatus,
    notifications
  }
})

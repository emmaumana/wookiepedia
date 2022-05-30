export const namespaced = true

export const state = {
  isLoaded: false,
  error: false
}

export const mutations = {
  SET_STATUS(state) {
    state.isLoaded = !state.isLoaded
  },

  SET_ERROR(state) {
    state.error = true
  }
}

export const actions = {
  async changeStatus(context) {
    context.commit('SET_STATUS')
    return context.state.isLoaded
  },

  addError({ commit }) {
    commit('SET_ERROR')
  }
}

export const getters = {}

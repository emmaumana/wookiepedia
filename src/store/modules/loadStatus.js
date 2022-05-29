export const namespaced = true

export const state = {
  isLoaded: false
}

export const mutations = {
  SET_STATUS(state) {
    state.isLoaded = !state.isLoaded
  }
}

export const actions = {
  async changeStatus(context) {
    context.commit('SET_STATUS')
    return context.state.isLoaded
  }
}

export const getters = {}

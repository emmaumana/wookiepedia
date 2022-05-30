import { useStore } from 'vuex'
import Api from '../../services/api'
import {
  sortArray,
  formatPlanetInfo,
  saveToLocalStorage,
  getFromLocalStorage,
  getNumberFromString,
  formatResidentsData
} from '../../utils/index'

export const namespaced = true

export const state = {
  residents: null
}

export const mutations = {
  SET_RESIDENTS(state, residentsData) {
    if (!state.residents) {
      state.residents = residentsData
    } else {
      state.residents.next = residentsData.next
      state.residents.results = [...state.residents.results, ...residentsData.results]
    }
    // caching
    saveToLocalStorage('residents', { data: state.residents })
  },

  SET_RESIDENTS_ORDER(state, criteria) {
    state.residents.result = sortArray(state.residents.results, criteria)
  }
}

export const actions = {
  async fetchResidents({ commit, dispatch }, page = 1) {
    try {
      let request
      let cachedPages = getFromLocalStorage('cached-pages') || []

      if (cachedPages.includes(page)) {
        request = getFromLocalStorage('residents')
      } else {
        // or it's a new page
        request = await Api.get(`people?page=${page}`)
        // Adding planet info
        for (const resident of request.data.results) {
          const planetId = getNumberFromString(resident.homeworld)
          const planetData = await Api.get(`planets/${planetId}/`)

          Object.assign(resident, formatPlanetInfo(planetData.data))
        }
        // format date
        formatResidentsData(request.data.results)
      }

      // saving
      commit('SET_RESIDENTS', request.data)
      // caching page if it doesn't exist
      if (!cachedPages.includes(page)) {
        cachedPages.push(page)
        saveToLocalStorage('cached-pages', cachedPages)
      }

      return request.data.results
    } catch (error) {
      let message
      if (error?.response?.status === 404) {
        message = `The page "${page}" doesn't exists`
      } else {
        message = error.message
      }

      const notification = {
        message: message
      }

      dispatch('notifications/add', notification, { root: true })
    }
  },

  sortResidents({ commit }, criteria) {
    commit('SET_RESIDENTS_ORDER', criteria)
  }
}

export const getters = {
  getLoadedResidents(state) {
    return state.residents?.results
  },

  getLoadedResidentsCount(state) {
    return state.residents?.results.length
  },

  getTotalResidentsCount(state) {
    return state.residents?.count
  },

  getFilteredOrTotal(state, getters) {
    return query => {
      return query
        ? getters.getLoadedResidents.filter(resident =>
            resident.name.toLowerCase().includes(query)
          )
        : getters.getLoadedResidents
    }
  }
}

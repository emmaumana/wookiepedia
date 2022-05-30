<script setup>
import { useStore } from 'vuex'
import { onMounted, computed, ref } from 'vue'
import NoResults from '../components/NoResults.vue'
import SearchBar from '../components/SearchBar.vue'
import PlanetInfo from '../components/PlanetInfo.vue'

const store = useStore()
const requiredInfo = ['name', 'height', 'mass', 'created', 'edited', 'planet']

const searchQuery = ref('')
const isLoaded = ref(false)

const initTable = async () => {
  await store.dispatch('residents/fetchResidents')
  isLoaded.value = await store.dispatch('loadStatus/changeStatus')
}

const requestSort = key => {
  store.dispatch('residents/sortResidents', key)
}

const setSearchQuery = value => {
  searchQuery.value = value
}

const tableResidents = computed(() => {
  return store.getters['residents/getFilteredOrTotal'](searchQuery.value)
})

const totalResidents = computed(() => store.getters['residents/getTotalResidentsCount'])

const loadedResidentsCount = computed(
  () => store.getters['residents/getLoadedResidentsCount']
)

onMounted(() => {
  initTable()
})
</script>

<template>
  <SearchBar @queried="setSearchQuery" />
  <div v-if="isLoaded" class="data-table my-5 is-relative">
    <div class="data-table__container">
      <table
        v-if="tableResidents.length"
        class="data-table__table table is-hoverable is-fullwidth is-capitalized"
      >
        <thead>
          <tr>
            <th
              v-for="item in requiredInfo"
              :key="item"
              class="table__heading is-centered"
              @click="requestSort(item)"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resident in tableResidents">
            <td
              v-for="(info, key) in requiredInfo"
              :key="`${key}-${info}`"
              class="has-text-left"
            >
              <template v-if="info !== 'planet'">
                {{ resident[info] }}
              </template>
              <template v-else>
                <PlanetInfo :planet-data="resident[info]" />
              </template>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total People:</th>
            <template v-for="info in requiredInfo.length - 2">
              <th></th>
            </template>
            <th>{{ loadedResidentsCount }} / {{ totalResidents }}</th>
          </tr>
        </tfoot>
      </table>
      <NoResults v-else :query="searchQuery" />
    </div>
  </div>
  <div v-else>
    <p class="is-flex mt-5 p-4">
      Loading
      <span class="ml-4 is-loading"></span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.data-table {
  &__container {
    max-height: 70vh;
    overflow: scroll;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 6px;

    thead,
    tfoot {
      position: sticky;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      z-index: 1;

      th {
        border: none;
        padding: 15px 12px;
        user-select: none;
      }
    }

    thead {
      top: 0;
      cursor: pointer;

      th:hover {
        background-color: #f3f3f3;
      }
    }

    tfoot {
      bottom: -1px;
    }
  }
}
</style>

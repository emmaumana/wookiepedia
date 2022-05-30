<script setup>
import { ref, computed } from 'vue'
import { images } from '../vendor/planets-images'

const props = defineProps({
  planetData: {
    type: Object,
    required: true
  }
})

const showInfo = ref(false)

const toggleInfoVisibility = () => {
  showInfo.value = !showInfo.value
}

const formatPlanetName = computed(() => {
  return props.planetData.name.toLowerCase().replace(' ', '_')
})
</script>

<template>
  <div class="planet-info">
    <a @click.prevent="toggleInfoVisibility" class="planet-info__name">
      {{ planetData.name }}
    </a>
    <div
      v-show="showInfo"
      class="planet-info__wrapper"
      @click.self="toggleInfoVisibility"
    >
      <transition>
        <div v-if="showInfo" class="card planet-info__info p-4 is-rounded">
          <div class="card-image">
            <figure class="image">
              <img :src="images[formatPlanetName]" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title">{{ planetData.name }}</p>
          </div>
          <ul class="content">
            <template v-for="(info, key) in planetData" :key="info">
              <li v-if="info !== planetData.name">{{ key }}: {{ info }}</li>
            </template>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.planet-info {
  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;
  }

  &__info {
    max-width: 320px;
    z-index: 2;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);

    .image {
      margin: -16px -16px 20px;
      width: 300px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>

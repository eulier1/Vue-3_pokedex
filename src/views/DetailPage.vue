<template>
  <div class="container mx-auto p-4">
    <button
      @click="$router.push('/')"
      class="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Back to List
    </button>

    <div v-if="pokemon" class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <img :src="pokemon.image" :alt="pokemon.name" class="w-64 h-64 object-contain mx-auto mb-6" />

      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold capitalize mb-2">{{ pokemon.name }}</h1>
        <p class="text-xl text-gray-600">#{{ pokemon.id }}</p>
      </div>

      <div class="abilities">
        <h2 class="text-2xl font-semibold mb-4">Abilities</h2>
        <ul class="space-y-2">
          <li
            v-for="ability in pokemon.abilities"
            :key="ability.ability.name"
            class="bg-gray-100 p-3 rounded-lg capitalize"
          >
            {{ ability.ability.name }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-xl">Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemon = ref(null)

const fetchPokemonDetail = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    pokemon.value = {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other['official-artwork'].front_default,
      abilities: response.data.abilities,
    }
  } catch (error) {
    console.error('Error fetching pokemon details:', error)
  }
}

onMounted(() => {
  fetchPokemonDetail()
})
</script>

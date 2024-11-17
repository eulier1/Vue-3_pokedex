<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Vue 3 - Pokedex</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="pokemon-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
      >
        <router-link :to="{ name: 'detail', params: { id: pokemon.id } }">
          <img :src="pokemon.image" :alt="pokemon.name" class="w-full h-48 object-contain mb-4" />
          <div class="text-center">
            <h2 class="text-xl font-semibold capitalize">{{ pokemon.name }}</h2>
            <p class="text-gray-600">#{{ pokemon.id }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pokemons = ref([])

const fetchPokemons = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
    const results = response.data.results

    const pokemonDetails = await Promise.all(
      results.map(async (pokemon) => {
        const detail = await axios.get(pokemon.url)
        return {
          id: detail.data.id,
          name: detail.data.name,
          image: detail.data.sprites.other['official-artwork'].front_default,
        }
      }),
    )

    pokemons.value = pokemonDetails
  } catch (error) {
    console.error('Error fetching pokemons:', error)
  }
}

onMounted(() => {
  fetchPokemons()
})
</script>

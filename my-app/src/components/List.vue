<template>
  <div class="container">
    <div class="pokemons">
      <div class="pokemon-bg"></div>
      <Pokemons
          :pokemons="pokemons" :pokemonDetails="pokemonDetails"
          @getNextPokemons="getNextPokemons" @getPrevPokemons="getPrevPokemons"
          :prevDisabled="prevDisabled" :nextDisabled="nextDisabled"/>
      <div v-if="pokemons.length === 0">
        <div class="loader" role="progressbar">
          <div class="pokeball-container">
            <div class="pokeball"></div>
            <div class="text">Loading...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import Pokemons from './Pokemons.vue'
import { getPokemons, getPokemonDetails } from '../services/PokemonService'

export default {
  name:       'List',
  components: {
    Pokemons
  },
  data() {
    return {
      pokemons:            [],
      pokemonDetails:      [],
      currentPokemonIds:   [],
      totalPokemon:        80,
      limit:               8,
      offset:              0,
      showNotification:    false,
      notificationMessage: '',
      prevDisabled:        true,
      nextDisabled:        false,
    }
  },
  methods: {
    getPokemons(limit, offset) {
      getPokemons(limit, offset)
          .then(async response => {
            if (response.success === true) {
              // Get pokemon ids
              const currentPokemonIds = _.map(response.data.results, 'id');

              // Using the ids get pokemon details
              await this.getPokemonDetails(currentPokemonIds);

              this.pokemons = response.data.results;
            }
          })
          .catch(error => {
            // TODO: Create a notification
            console.log(error);
          });
    },
    async getPokemonDetails(pokemonIds) {
      await getPokemonDetails(pokemonIds)
          .then(response => {
            if (response.success === true) {
              this.pokemonDetails = response.data;
            }
          })
          .catch(error => {
            // TODO: Create a notification
            console.log(error);
          });
    },

    getPrevPokemons() {
      this.pokemons       = [];
      this.pokemonDetails = [];

      // Enable next button
      this.nextDisabled = false;

      // Extract from offset
      if (this.offset > 0) {
        this.offset = this.offset - this.limit;
      }

      // If offset is 0, then disable prev button
      if (this.offset === 0) {
        this.prevDisabled = true;
      }

      // Load pokemons
      this.getPokemons(this.limit, this.offset);
    },
    getNextPokemons() {
      this.pokemons       = [];
      this.pokemonDetails = [];

      // Enable prev button
      this.prevDisabled = false;

      // Increase offset
      this.offset = this.offset + this.limit;

      // If offset larger, than total pokemon, then disable next button
      if (this.offset >= this.totalPokemon - this.limit) {
        this.nextDisabled = true;
      }

      // Load pokemons
      this.getPokemons(this.limit, this.offset);
    },
  },

  mounted() {
    // Load pokemons
    this.getPokemons(this.limit, this.offset);
  }
}
</script>

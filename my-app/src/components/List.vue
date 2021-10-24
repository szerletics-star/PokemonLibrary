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
      currentPokemonIds:   [],
      pokemons:            [],
      pokemonDetails:      [],
      showNotification:    false,
      notificationMessage: '',
      totalPokemon:        80,
      limit:               8,
      offset:              0,
      prevDisabled:        true,
      nextDisabled:        false,
    }
  },
  methods: {
    getPokemons:       (limit, offset) => {
      getPokemons(limit, offset)
          .then(async response => {
            if (response.success === true) {
              const currentPokemonIds = _.map(response.data.results, 'id');
              await this.getPokemonDetails(currentPokemonIds);

              this.pokemons = response.data.results;
            }
          });
    },
    getPokemonDetails: async (pokemonIds) => {
      await getPokemonDetails(pokemonIds)
          .then(response => {
            if (response.success === true) {
              this.pokemonDetails = response.data;
            }
          });
    },

    getPrevPokemons: () => {
      this.pokemons       = [];
      this.pokemonDetails = [];

      if (this.offset > 0) {
        this.offset = this.offset - this.limit;
      }

      if (this.offset === 0) {
        this.prevDisabled = true;
      }

      this.getPokemons(this.limit, this.offset);
    },
    getNextPokemons: () => {
      this.pokemons       = [];
      this.pokemonDetails = [];

      this.prevDisabled = false;
      this.offset       = this.offset + this.limit;

      if (this.offset >= this.totalPokemon - this.limit) {
        this.nextDisabled = true;
      }

      this.getPokemons(this.limit, this.offset);
    },
  },

  mounted() {
    this.getPokemons(this.limit, this.offset);
  }
}
</script>

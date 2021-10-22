<template>
  <div class="pokemon-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="list">
            <div class="pokemons">
              <Pokemons v-if="pokemons.length > 0" :pokemons="pokemons"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pokemons from './Pokemons.vue'
import {getPokemons} from '../services/PokemonService'

export default {
  name: 'Dashboard',
  components: {
    Pokemons
  },
  data() {
    return {
      count: [],
      next: [],
      previous: [],
      pokemons: [],
    }
  },
  methods: {
    getPokemons(limit, offset) {
      getPokemons(limit, offset).then(response => {
        response = JSON.parse(response);

        this.count = response.count;
        this.next = response.next;
        this.previous = response.previous;
        this.pokemons = response.results;
      })
    },
  },
  mounted() {
    this.getPokemons(100, 0);
  }
}
</script>
<template>
  <div>
    <div class="row" style="justify-content: center; position: relative">
      <div class="col-lg-3" v-for="item in pokemons" :key="item.name">
        <div class="deck">
          <div class="card-p hovercard">
            <div class="front face">
              <div class="poke-card">
                <div class="img-container">
                  <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + item.id + '.svg'" :alt="item.name">
                </div>
                <div class="info">
                  <span class="number">#{{ item.id }}</span>
                  <h3 class="name"> {{ item.name }}</h3>
                </div>
              </div>
            </div>
            <div class="back face">
              <div class="poke-card">
                <div class="img-container">
                  <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + item.id + '.png'" :alt="item.name">
                </div>
                <div class="info">
                  <button class="pure-material-button-contained" v-b-modal.modal-1 v-on:click="showModal(item.id, false)">Details</button>
                  <button class="pure-material-button-contained" v-b-modal.modal-2 v-on:click="showModal(item.id, true)">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pokemon-pagination" v-if="pokemons.length !== 0">
        <div class="prev-button" v-on:click="prev()" v-bind:class="{ disabled: prevDisabled }">
          &#65124;
        </div>
        <div class="next-button" v-on:click="next()" v-bind:class="{ disabled: nextDisabled }">
          &#65125;
        </div>
      </div>
    </div>
    <Modal
        v-if="pokemons.length !== 0" :modalId="'modal-1'" :modalTitle="'Pokemon Details'"
        :okTitle="'Ok'" :isEdit="false" :pokemonName="pokemonName"
        :selectedPokemonId="selectedPokemonId" :pokemonTypes="pokemonTypes"
    ></Modal>
    <Modal
        v-if="pokemons.length !== 0" :modalId="'modal-2'" :modalTitle="'Pokemon Edit'"
        :okTitle="'Edit'" :isEdit="true" :pokemonName="pokemonName"
        :selectedPokemonId="selectedPokemonId" :pokemonTypes="pokemonTypes" ref="modalComponent"
    ></Modal>
  </div>
</template>
<script>
import Modal from './Modal.vue'

export default {
  name:       'Pokemons',
  components: {
    Modal,
  },
  props:      ['pokemons', 'pokemonDetails', 'nextDisabled', 'prevDisabled'],
  data() {
    return {
      isEdit:            false,
      modalTitle:        '',
      errors:            [],
      selectedPokemonId: null,
      pokemonName:       null,
      pokemonTypes:      [],
    }
  },
  methods: {
    showModal: (id, isEdit) => {
      this.pokemonTypes                = [];
      this.isEdit                      = isEdit;
      this.pokemonName                 = this.pokemonDetails[id].name;
      this.selectedPokemonId           = id;
      this.$refs.modalComponent.errors = [];

      this.pokemonDetails[id].types.forEach((item) => {
        this.pokemonTypes.push(item.type.name);
      });
    },
    next:      () => {
      this.$emit('getNextPokemons');
    },
    prev:      () => {
      this.$emit('getPrevPokemons');
    },
  }
}
</script>

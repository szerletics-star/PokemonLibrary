<template>
  <div>
    <div class="row" style="justify-content: center; position: relative">
      <div class="col-lg-3" v-for="(item, index)  in pokemons" :key="item.name">
        <div class="deck">
          <div :class="['card-p', 'hovercard', (index===0 && animate ? 'flipped' : '')]">
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
      <div v-if="pokemons.length !== 0" class="create-pokemon" v-b-modal.modal-3 v-on:click="resetCreateModal()">+</div>
    </div>
    <Modal
        v-if="pokemons.length !== 0" :modalId="'modal-1'" :modalTitle="'Pokemon Details'"
        :okTitle="'Ok'" :isEdit="false" :isCreate="false" :pokemonName="pokemonName"
        :selectedPokemonId="selectedPokemonId" :pokemonTypes="pokemonTypes"
    ></Modal>
    <Modal
        v-if="pokemons.length !== 0" :modalId="'modal-2'" :modalTitle="'Pokemon Edit'"
        :okTitle="'Edit'" :isEdit="true" :isCreate="false" :pokemonName="pokemonName"
        :selectedPokemonId="selectedPokemonId" :pokemonTypes="pokemonTypes" ref="modalComponentEdit"
    ></Modal>
    <Modal
        v-if="pokemons.length !== 0" :modalId="'modal-3'" :modalTitle="'Pokemon Create'"
        :okTitle="'Create'" :isEdit="true" :isCreate="true" :pokemonName="''"
        :selectedPokemonId="selectedPokemonId" :pokemonTypes="[]" ref="modalComponentCreate"
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
      animate:           false,
      pokemonName:       null,
      selectedPokemonId: null,
      pokemonTypes:      [],
      errors:            [],
      modalTitle:        ''
    }
  },
  methods: {
    // Show modal
    showModal(id, isEdit) {
      this.isEdit            = isEdit;
      this.selectedPokemonId = id;

      // Empty pokemon
      this.pokemonName  = this.pokemonDetails[id].name;
      this.pokemonTypes = [];

      // Empty errors
      this.$refs.modalComponentEdit.errors   = [];
      this.$refs.modalComponentCreate.errors = [];

      // Get pokemon types from details
      this.pokemonDetails[id].types.forEach((item) => {
        this.pokemonTypes.push(item.type.name);
      });
    },
    // Empty pokemon
    resetCreateModal() {
      this.pokemonName  = '';
      this.pokemonTypes = [];
    },
    // Load next pokemons
    next() {
      this.$emit('getNextPokemons');
    },
    // Load prev pokemons
    prev() {
      this.$emit('getPrevPokemons');
    },
    // Add animation
    addAnimation() {
      setTimeout(() => {
        this.animate = true;
        setTimeout(() => {
          this.animate = false;
        }, 1000);
      }, 1500);
    },
    // The function and animation is to make the user aware of the hover effect over the cards
    // The animation is displayed only until the first five visits
    callAnimationUntilFirstFiveView() {
      let pageView = 1;

      if (localStorage.pageView) {
        pageView = parseInt(localStorage.pageView);

        // If page view is greater than five, then do not put data in localstorage
        if (pageView <= 5) {
          pageView++
          localStorage.pageView = pageView;
        }
      } else {
        localStorage.pageView = pageView;
      }

      if (pageView <= 5) {
        this.addAnimation();
      }
    },
  },
  mounted() {
    this.callAnimationUntilFirstFiveView();
  }
}
</script>

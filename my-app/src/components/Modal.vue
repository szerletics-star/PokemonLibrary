<template>
  <div>
    <b-modal centered :id="modalId" :title="modalTitle" class="pokemon-modal" :ok-title="okTitle" @ok="checkForm" :hide-footer="isEdit ? false : true">
      <div class="row">
        <div class="col-lg-7">
          <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + selectedPokemonId + '.png'" :alt="pokemonName">
        </div>
        <div class="col-lg-5">
          <p class="list-elem">
            <label for="pokemon_name">Name</label>
            <input id="pokemon_name" v-model="pokemonName" type="text" name="pokemon_name" :disabled="!isEdit"
                   @input="$emit('input', $event.target.pokemonName)">
          </p>
          <p class="list-elem">
            <label for="pokemon_types">Type</label>
            <input id="pokemon_types" v-model="pokemonTypes" type="text" name="pokemon_types" :disabled="!isEdit"
                   @input="$emit('input', $event.target.pokemonTypes)">
          </p>
          <p class="error-title" v-if="errors.length !== 0">
            <b>Please correct the following error(s):</b>
          <ul class="error-messages">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
          </p>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name:  'Modal',
  props: {
    modalId:           {type: String},
    okTitle:           {type: String},
    modalTitle:        {type: String},
    isEdit:            {type: Boolean},
    pokemonName:       {type: String},
    pokemonTypes:      {type: Array},
    selectedPokemonId: {type: Number},
  },
  data() {
    return {
      errors: []
    }
  },
  methods: {
    checkForm: (e) => {
      this.errors = [];

      if (!this.pokemonName) {
        this.errors.push('Name is required.');
      }

      if (this.pokemonTypes.length === 0) {
        this.errors.push('Type is required.');
      }

      if (this.errors.length === 0) {
        this.makeToast('success', this.pokemonName + ' was edited successfully');
      } else {
        e.preventDefault();
      }
    },
    makeToast: (variant = null, message) => {
      this.$bvToast.toast(message, {
        title:   `Notification`,
        variant: variant,
        solid:   true
      })
    }
  }
}
</script>

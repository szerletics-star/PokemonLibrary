<template>
    <div class="container">
      <div class="row">
        <div v-for="item in pokemons" :key="item.name" class="poke-card">
          <div class="title" :data-details="item.url">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
</template>

<script>

    export default {
        name: 'Pokemons',
        props: ['pokemons']
     }
</script>
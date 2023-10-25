<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <from>
            <div class="field">
                <label for="nomeDoProjeto" class="label"></label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button"></button>
            </div>
        </from>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Projetos'
})
</script>

<style scoped>
</style>
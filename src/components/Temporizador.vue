<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempo-em-segundos="tempoEmSegundos" />
        <button class="button" @click="iniciar" :disabled="cronometroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
    name: 'Temporizador',
    emits: ['aoTemporizadorSerFinalizado'],
    components: {
        Cronometro
    },
    data() {
        return {
            tempoEmSegundos: 0,
            Cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true;
            this.Cronometro = setInterval(()=> {
                this.tempoEmSegundos++;
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.Cronometro);
            this.$emit('aoTemporizadorSerFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0;
        }
    }
})
</script>
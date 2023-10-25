<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroTarefa :tempo-em-segundos="tempoEmSegundos" />
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
import CronometroTarefa from './CronometroTarefa.vue';

export default defineComponent({
    name: 'TemporizadorTarefa',
    emits: ['aoTemporizadorSerFinalizado'],
    components: {
        CronometroTarefa
    },
    data() {
        return {
            tempoEmSegundos: 0,
            CronometroTarefa: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true;
            this.CronometroTarefa = setInterval(()=> {
                this.tempoEmSegundos++;
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.CronometroTarefa);
            this.$emit('aoTemporizadorSerFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0;
        }
    }
})
</script>
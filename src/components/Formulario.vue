<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Forumário para criação d euma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorSerFinalizado="salvarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex'

import { key } from '@/store'

export default defineComponent({
    name: 'Formulario',
    components: { Temporizador },
    emits: ['aoSalvarTarefa'],
    data() {
        return {
            descricao: 'Estudar Vue3 com Type Script',
            idProjeto: ''
        }
    },
    methods: {
        salvarTarefa(tempoDecorrido: number): void {
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegungos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(projeto => projeto.id == this.idProjeto)
            })
            this.descricao = '';
        }
    },
    setup() {
        const store = useStore(key);
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style>
.formulario {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
}
</style>
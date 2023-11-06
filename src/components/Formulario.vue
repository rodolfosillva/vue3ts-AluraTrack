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
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';

import { myUseStore } from '@/store'

export default defineComponent({
    name: 'Formulario',
    components: { Temporizador },
    emits: ['aoSalvarTarefa'],
    setup(props, { emit }) {
        const store = myUseStore();

        const projetos = computed(() => store.state.projeto.projetos);
        const descricao = ref('Estudar Vue3 com Type Script');
        const idProjeto = ref('');

        const salvarTarefa = (tempoDecorrido: number): void => {
            emit('aoSalvarTarefa', {
                duracaoEmSegungos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(projeto => projeto.id == idProjeto.value)
            })
            descricao.value = '';
        }

        return {
            projetos,
            descricao,
            idProjeto,
            salvarTarefa
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
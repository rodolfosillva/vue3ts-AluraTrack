<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <TarefaFinalizada v-for="(tarefa, index) in tarefas" :key="index"
          :tarefa="tarefa" />
        <BoxTarefaFinalizada v-if="tarefas.length === 0">
          Você não está muito produtivo hoje :(
        </BoxTarefaFinalizada>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioTarefa from './components/FormularioTarefa.vue';
import TarefaFinalizada from './components/TarefaFinalizada.vue';
import ITarefa from './interfaces/ITarefa'
import BoxTarefaFinalizada from './components/BoxTarefaFinalizada.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioTarefa,
    TarefaFinalizada,
    BoxTarefaFinalizada
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  }
});
</script>

<style scoped>
.lista{
  padding: 1rem;
}
main {
 --bg-primario: #fff;
 --texto-primario: #000
}
main.modo-escuro {
 --bg-primario: #2b2d42;
 --texto-primario: #ddd
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>

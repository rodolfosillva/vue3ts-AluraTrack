<template>
    <BoxTarefaFinalizada>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                <CronometroTarefa :tempo-em-segundos="tarefa.duracaoEmSegungos" />
            </div>
        </div>
    </BoxTarefaFinalizada>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import ITarefa from '@/interfaces/ITarefa';
import BoxTarefaFinalizada from './BoxTarefaFinalizada.vue';

export default defineComponent({
    name: 'TarefaFinalizada',
    components: {
        CronometroTarefa,
        BoxTarefaFinalizada
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})
</script>

<style scoped>
.box{
    background-color: rgb(249, 238, 211);
}
</style>
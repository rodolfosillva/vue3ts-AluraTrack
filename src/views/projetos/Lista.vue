<template>
    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { myUseStore } from '@/store'
import { TipoNotificacao } from '@/enums/tipo-notificacao';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes';
import { NOTIFICAR } from '@/store/tipo-mutacoes';

export default defineComponent({
    name: 'Lista',
    methods: {
        excluir(projetoId: number) {
            this.store.dispatch(REMOVER_PROJETO, projetoId)
                .then(() => {
                    this.store.commit(NOTIFICAR, {
                        titulo: 'PRONTO!',
                        texto: 'Seu projeto foi deletado',
                        tipo: TipoNotificacao.SUCCESS
                    })
                })
        }
    },
    setup() {
        const store = myUseStore()
        store.dispatch(OBTER_PROJETOS)
        return {
            store,
            projetos: computed(() => store.state.projeto.projetos)
        }
    }
})
</script>
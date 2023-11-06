import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { NOTIFICAR, EXCLUI_TAREFA, ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import {  CADASTRAR_TAREFA, REMOVER_TAREFA, ALTERAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from '@/http'
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modules/projeto";

export interface state {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
            }, 3000)
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(taref => taref.id == tarefa.id)
            state.tarefas[index] = tarefa;
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit } ){
            return http.get('/tarefas')
                .then(response => commit(DEFINIR_TAREFAS, response.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                    .then((response) => commit(ADICIONA_TAREFA, response.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
        [REMOVER_TAREFA]({ commit }, id: string) {
            return http.delete(`/tarefas/${id}`)
                .then(() => commit(EXCLUI_TAREFA, id))
        }
    },
    modules: {
        projeto
    }
})

export function myUseStore(): Store<state> {
    return useStore(key)
}
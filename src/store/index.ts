import { createStore, Store, useStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

import { EstadoProjeto, projeto } from "./modules/projeto";
import { EstadoTarefa, tarefa } from "./modules/tarefa";

export interface state {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
            }, 3000)
        }
    },
    modules: {
        projeto,
        tarefa
    }
})

export function myUseStore(): Store<state> {
    return useStore(key)
}
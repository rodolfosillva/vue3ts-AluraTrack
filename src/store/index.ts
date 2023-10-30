import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ADICIONA_PROJETO, DEFINIR_PROJETO,  ALTERA_PROJETO, EXCLUI_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { CADASTRAR_PROJETOS, ALTERAR_PROJETOS, REMOVER_PROJETOS, OBTER_PROJETOS } from "./tipo-acoes";
import http from '@/http'

interface state {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto: IProjeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto;
        },
        [EXCLUI_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id != id);
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
            }, 3000)
        }
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('/projetos')
                .then(response => commit('DEFINIR_PROJETO', response.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoprojeto: string) {
            return http.post('/projetos', { nome: nomeDoprojeto})
        },
        [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
            return http.put(`/projetos${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS]({ commit }, id: string) {
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUI_PROJETO, id))
        }
    }
})

export function myUseStore(): Store<state> {
    return useStore(key)
}
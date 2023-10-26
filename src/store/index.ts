import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO } from "./tipo-mutacoes";

interface state {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
    state: {
        projetos: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto: IProjeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto;
        },
        [EXCLUI_PROJETO](state, index: number) {
            state.projetos.splice(index, 1);
        }
    }
})

export function myUseStore(): Store<state> {
    return useStore(key)
}
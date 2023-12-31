import { TipoNotificacao } from "@/enums/tipo-notificacao"
import { NOTIFICAR } from "@/store/tipo-mutacoes"
import { store } from "@/store"

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string):void {
            store.commit(NOTIFICAR, {titulo, texto, tipo})
        }
    }
}
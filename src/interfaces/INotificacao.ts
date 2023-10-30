import { TipoNotificacao } from "@/enums/tipo-notificacao";

export interface INotificacao {
    id: number;
    titulo: string;
    texto: string;
    tipo: TipoNotificacao;
}
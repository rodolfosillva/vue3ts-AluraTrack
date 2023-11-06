import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: number,
    duracaoEmSegungos: number,
    descricao: string,
    projeto: IProjeto
}
import IProjeto from "./IProjeto";

export default interface ITarefa {
    duracaoEmSegungos: number,
    descricao: string,
    projeto: IProjeto
}
export interface Historico{
    data: string;
    preco: number;
}
export interface Investimento {
    id: string;
    codigo: string;
    nome: string;
    quantidade: number;
    precocompra: number;
    precoatual: number;
    tipo: 'Ação'|'Fundo'|'Cripto';
    setor?: string;
    histprecos: Historico[];
}
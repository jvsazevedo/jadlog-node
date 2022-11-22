export interface OrderIncludeModel {
    conteudo: string;
    pedido: Array<string>;
    totPeso: number;
    totValor: number;
    obs: string;
    modalidade: string;
    contaCorrente: string;
    tpColeta: string;
    tipoFrete: number;
    cdUnidadeOri: string;
    cdUnidadeDes: string;
    cdPickupOri: string;
    cdPickupDes: string;
    nrContrato: number;
    servico: number;
    shipmentId: string;
    vlColeta: number;
    rem: {
        nome: string;
        cnpjCpf: string;
        ie: string;
        endereco: string;
        numero: string;
        compl: string;
        bairro: string;
        cidade: string;
        uf: string;
        cep: string;
        fone: string;
        cel: string;
        email: string;
        contato: string;
    },
    des: {
        nome: string;
        cnpjCpf: string;
        ie: string;
        endereco: string;
        numero: string;
        compl: string;
        bairro: string;
        cidade: string;
        uf: string;
        cep: string;
        fone: string;
        cel: string;
        email: string;
        contato: string;
    },
    dfe: Array<OrderDfeModel>;
    volume: Array<OrderVolumeModel>;
}

export interface OrderDfeModel {
    cfop: string;
    danfeCte: string;
    nrDoc: string;
    serie: string;
    tpDocumento: number;
    valor: number;
}

export interface OrderVolumeModel {
    altura: number;
    comprimento: number;
    identificador: string;
    largura: number;
    peso: number
}

export interface IncludeOrderResponseModel {
    codigo: string;
    shipmentId: string;
    status: string;
}

export interface CancelOrderParams {
    codigo: string | null;
    shipmentId: string | null;
}

export interface  CancelOrderResponse {
    shipmentId: string;
    status: string;
}

export interface TrackingResponseEvents {
    data: string;
    status: string;
    unidade: string;
}

export interface  TrackingResponseVolumes {
    peso: number;
    altura: number;
    largura: number;
    comprimento: number;
}

export interface TrackingResponseModel {
    codigo: string;
    shipmentId: string;
    dacte: string;
    dtEmissao: string;
    status: string;
    valor: number;
    peso: number;
    eventos: Array<TrackingResponseEvents>,
    volumes: Array<TrackingResponseVolumes>
}

export interface  TrackingError {
    id: number;
    descricao: string;
}

export interface TrackingModel {
    cte: string;
    tracking: TrackingResponseModel;
    error: TrackingError | null;
}

export interface  TrackOrderResponse {
    consulta: Array<TrackingModel>
}
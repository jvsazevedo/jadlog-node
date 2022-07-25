export interface ShippingParamsData {
    from: string;
    to: string;
    charge_at_destination: string | null;
    weight: number;
    document: string;
    account: string;
    contract: string;
    modality: number;
    delivery_type: string;
    insurance_type: string;
    declared_value: number;
    collect_value: number | null;
}

export interface ShippingParams {
    shipping: ShippingParamsData[]
}

export interface ShippingParamsModelData {
    cepori: string;
    cepdes: string;
    frap: string | null;
    peso: number;
    cnpj: string;
    conta: string;
    contrato: string;
    modalidade: number;
    tpentrega: string;
    tpseguro: string;
    vldeclarado: number;
    vlcoleta: number | null;
}

export interface ShippingParamsModel {
    frete: ShippingParamsModelData[]
}

export interface  ShippingResponseModelData {
    cepdes: string;
    cepori: string;
    conta: string;
    contrato: string;
    frap: string;
    modalidade: number;
    peso: number;
    prazo: number;
    tpentrega: string;
    tpseguro: string;
    vldeclarado: number;
    vltotal: number;
    error: {
        descricao: string,
        id: number
    } | undefined
}

export interface ShippingResponseModel {
    frete: ShippingResponseModelData[]
}

export interface ShippingResponseData {
    from: string,
    to: string,
    charge_at_destination: string | null,
    weight: number,
    account: string,
    deadline: number;
    contract: string,
    modality: number,
    delivery_type: string,
    insurance_type: string,
    declared_value: number,
    total_value: number
}

export interface ShippingResponse {
    shipping: ShippingResponseData[]
}
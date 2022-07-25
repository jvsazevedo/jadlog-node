import {
    ShippingParams,
    ShippingParamsModel,
    ShippingParamsModelData,
    ShippingResponse, ShippingResponseData, ShippingResponseModel
} from "../utils/interfaces/shipping";
import {RequestHandler} from "../utils/factory/requestHandler";
import {Configs} from "../utils/config";
import {parseError} from "../utils/factory/errorHandler";


export class JadlogHandler {
    _requestHandler: RequestHandler;

    constructor(requestHandler: RequestHandler) {
        this._requestHandler = requestHandler;
    }

    async calculateShipping(params: ShippingParams) {
        try {
            const dataModel: ShippingParamsModelData[] = [];
            const responseModel: ShippingResponseData[] = [];

            params.shipping.map((shipment) => {
                dataModel.push({
                    cepori: shipment.from,
                    cepdes: shipment.to,
                    frap: shipment.charge_at_destination,
                    peso: shipment.weight,
                    cnpj: shipment.document,
                    conta: shipment.account,
                    contrato: shipment.contract,
                    modalidade: shipment.modality,
                    tpentrega: shipment.delivery_type,
                    tpseguro: shipment.insurance_type,
                    vldeclarado: shipment.declared_value,
                    vlcoleta: shipment.collect_value
                })
            });

            const model: ShippingParamsModel = {
                frete: [...dataModel]
            };

            const response = await this._requestHandler.postAsync<ShippingResponseModel>(model, Configs.endpoints.shippingSimulator);

            if (response.frete[0].error) {
                throw parseError(response.frete[0].error)
            }

            response.frete.map((item) => {
               responseModel.push({
                   from: item.cepori,
                   to: item.cepdes,
                   charge_at_destination: item.frap,
                   weight: item.peso,
                   account: item.conta,
                   deadline: item.prazo,
                   contract: item.contrato,
                   modality: item.modalidade,
                   delivery_type: item.tpentrega,
                   insurance_type: item.tpseguro,
                   declared_value: item.vldeclarado,
                   total_value: item.vltotal
               })
            });

            const responseObj: ShippingResponse = {
                shipping: responseModel
            };

            return responseObj;
        } catch (e) {
            throw e;
        }
    }
}
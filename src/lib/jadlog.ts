import {
    ShippingParams,
    ShippingParamsModel,
    ShippingParamsModelData,
    ShippingResponse, ShippingResponseData, ShippingResponseModel
} from "../utils/interfaces/shipping";
import {RequestHandler} from "../utils/factory/requestHandler";
import {Configs} from "../utils/config";
import {parseError} from "../utils/factory/errorHandler";
import {
    OrderIncludeModel,
    IncludeOrderResponseModel,
    CancelOrderParams,
    CancelOrderResponse,
    TrackOrderResponse
} from "../utils/interfaces/order";


export class JadlogHandler {
    _requestHandler: RequestHandler;

    constructor(requestHandler: RequestHandler) {
        this._requestHandler = requestHandler;
    }

    // Shipping
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

    // Orders
    async includeOrder(data: OrderIncludeModel) {
        try {
            const response =  await this._requestHandler
                .postAsync<IncludeOrderResponseModel>(data, Configs.endpoints.includeOrder);

            return {
                code: response.codigo,
                status: response.status,
                shipmentId: response.shipmentId
            }

        } catch (e) {
            throw parseError(e);
        }
    }

    async cancelOrder(data: CancelOrderParams) {
        try {
            let response = null;
            if(data.codigo) {
                const obj = { codigo: data.codigo };
                response = await this._requestHandler
                    .postAsync<CancelOrderResponse>(obj, Configs.endpoints.cancelOrder);
            }

            if(data.shipmentId) {
                const obj = { shipmentId: data.shipmentId };
                response = await this._requestHandler
                    .postAsync<CancelOrderResponse>(obj, Configs.endpoints.cancelOrder);
            }

            return {
                status: response?.status,
                shipmentId: response?.shipmentId
            }

        } catch (e) {
            throw parseError(e);
        }
    }

    // Tracking
    async trackOrderByCode(codes: Array<string>) {
        try {
            const obj: Array<object> = [];

            codes.map((code) => {
                obj.push({
                    codigo: code
                });
            });

            if(obj.length > 0) {
                const response =  await this._requestHandler
                    .postAsync<TrackOrderResponse>({
                        consulta: obj
                }, Configs.endpoints.trackOrder);

                return response.consulta;
            }

        } catch (e) {
            throw parseError(e);
        }
    }
}
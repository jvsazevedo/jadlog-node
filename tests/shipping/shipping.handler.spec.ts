import { JadlogNode } from "../../index";
import {JadlogHandler} from "../../src/lib/jadlog";
import {ShippingParams} from "../../src/utils/interfaces/shipping";

let handler: JadlogHandler;

function initializePackage() {
    handler = JadlogNode('token');
}

describe("Shipping operations", () => {
    beforeAll(() => {
       initializePackage();
    });
    test("Should return estimated cost for shipping", async () => {
        const params: ShippingParams = {
            shipping: [{
                from: '06233200',
                to: '17213580',
                charge_at_destination: "N",
                weight: 13.78,
                document: '12345678901234',
                account: '000001',
                contract: '123',
                modality: 3,
                delivery_type: 'D',
                insurance_type: 'N',
                declared_value: 149.97,
                collect_value: null
            }]
        }
        const response = await handler.calculateShipping(params);

        expect(response.frete).toBe(Array);

    });
});

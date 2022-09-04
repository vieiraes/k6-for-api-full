import { base_url, walletKZ} from '../../env/env.param.js';
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import { env } from "../../env/env.param.js"


const source = walletKZ;
const digitableLine = `23793381286008301352856000063307789840000150000`;
const amount = "0.23";
const asset = "BRLP"
const dueDate = "2022-10-30"
const externalId = `Stress Test @ ${env} #${amount} - ${new Date().toLocaleString()}`

export const url =
    `${base_url}/boletos-payment/pay`;

export function params(accessToken) {
    const idempotenceKey = uuidv4()

    //console.log("CHAVE: ", idempotenceKey)

    return {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "x-idempotence-key": idempotenceKey
        }
    }
};

export const payload = JSON.stringify({
    source,
    digitableLine,
    amount,
    asset,
    extra: {
        dueDate,
        externalId,
    }
})

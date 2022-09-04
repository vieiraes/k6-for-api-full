import { env, base_url, evp_key, walletKZ } from '../../env/env.param.js';

const type = `dynamic`;
const output = `base64`;

const destination = evp_key; // chave de destino
const amount = "0.02";
const modalityChange = false;
const city = "São Paulo";
const description = `${env} - Descrição do serviço sendo cobrado em PIX COBRANÇA`;
var customID = `DEVELOP TESTE 2 - ${new Date().toLocaleString()}`;

export const url =
	`${base_url}/pix-service/wallets/${walletKZ}/qrcodes?type=${type}&output=${output}`;

export function params(accessToken) {
	return {
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		}
	}
};

export const payload = JSON.stringify({
	destination : destination,
	amount: amount,
	modalityChange: modalityChange,
	city: city,
	description: description,
	customId: customID,
});

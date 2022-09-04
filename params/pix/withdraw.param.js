import { base_url } from "../../env/env.param"

const key = '849ce7d3-3b69-48e3-b8b6-014c53d0116d';
const amount = 0.01;
const description = 'PIX-OUT withdraw para uma wallet externa';
const priority = 'high';

export const url = `${base_url}/pix-service/wallets/:walletKZ/withdraw`;

export const payload = JSON.stringify({
    key,
	amount,
	description,
	priority,
})

export function params(accessToken) {
	return {
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		}
	}
};
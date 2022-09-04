import { base_url } from "../../env/env.param.js";

// essa variavel data é uma cobrança de 100000 reais emitida no postman
var data = `MDAwMjAxMDEwMjEyMjY4NTAwMTRici5nb3YuYmNiLnBpeDI1NjNxcmNvZGUtaC5waXhhbWUuYXBwL3BpeC92Mi8zNDdhOTExMy0wNjcwLTQ3NDgtODE0NC1kM2ZhOWE1ZDQwYmM1MjA0MDAwMDUzMDM5ODY1NDA2MTAwLjAwNTgwMkJSNTkyNEthaXplbiBwaXgtY29icmFuY2EgcHJvZDYwMDlTYW8gUGF1bG82MjA3MDUwMyoqKjYzMDQ4MDFF`
var amount = "0.01"
var asset = "BRLP"
var source = "33046597-0382-445f-afe1-275b1f9bf1f1"


export const url = `${base_url}/pix-service/wallets/qrcode/pay`;

export function params(accessToken) {
	return {
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		}
	}
};

export const payload = JSON.stringify({
  data,
  amount,
  asset,
  source,
});

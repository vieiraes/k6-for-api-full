import { base_url, walletKZ  } from "../../env/env.param.js";

export const url = `${base_url}/pix-service/wallets/${walletKZ}/qrcodes/:externalId?output=json`;

export function params(accessToken) {
    return {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }
}

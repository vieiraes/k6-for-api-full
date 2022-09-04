import { grant_type, client_id, client_secret, base_url } from '../../env/env.param.js';

export const url = `${base_url}/auth-service/login`;

export const payload = {
  grant_type,
  client_id,
  client_secret,
}

export const params = {
  headers: {
    //
  },
}

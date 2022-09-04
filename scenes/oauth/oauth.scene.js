import http from 'k6/http';
import { check, sleep } from 'k6';
import { url, params, payload } from '../../params/oauth/oauth.param.js';
//import { logResults } from '../../utils.js';

export function oauth() {
  let res = http.post(url, payload, params);

  const accessToken = res.json().access_token;
  sleep(6);

  return accessToken;
}

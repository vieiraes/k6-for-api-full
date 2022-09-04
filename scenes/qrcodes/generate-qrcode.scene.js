import http from 'k6/http';
import { check, group, sleep } from 'k6';
import fs from 'fs';
import { Counter } from 'k6/metrics';

import { url, payload, params } from '../../params/qrcodes/generate-qrcode.param.js';
import { logResults } from '../../utils.js';


let arrayBase64 = [];

export function generateQrcode(accessToken) {

  const req = http.post(url, payload, params(accessToken));

  check(req, {
    'status was 200 or 201': (r) => r.status == 200 || r.status == 201,
    // 'transaction time less than 3s': (r) => r.timings.duration < 3000
  });

  const headers = req.headers;
  const KAIExternalId = headers['X-Client-External-Id'];

  let qrCodeBase64 = JSON.stringify(req.body);
  arrayBase64.push(qrCodeBase64);

  let jsonObjectArray = JSON.stringify(arrayBase64);

  fs.writeFile(`../../data/qrcodes.json`, jsonObjectArray, (error) => error ?? console.log('Error in write qrcode json => ', error));

  return {
    KAIExternalId,
    qrCodeBase64
  }
}

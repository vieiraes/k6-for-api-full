import http from 'k6/http';
import { check, group, sleep } from 'k6';

import { url, payload, params } from '../../params/qrcodes/pay-qrcode.param.js';



export function payQRCode(accessToken) {

  const req = http.post(url, payload, params(accessToken));

  check(req, {
    'status was 200 or 201': (r) => r.status == 200 || r.status == 201,
    // 'transaction time less than 3s': (r) => r.timings.duration < 3000
  });


}

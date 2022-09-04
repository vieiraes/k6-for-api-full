import http from 'k6/http';
import { check } from 'k6';

import { params, url } from '../../params/qrcodes/get-qrcode.param.js';
import { logResults } from '../../utils.js';

export function getQrcode(accessToken, kzExternalId) {

    const req = http.get(getUrlBasedExternalId(kzExternalId), params(accessToken));

    check(req, {
        'status was 200 or 201': (r) => r.status == 200 || r.status == 201,
        //'transaction time less than 3s': (r) => r.timings.duration < 3000
    });

    logResults(req);
}

function getUrlBasedExternalId(kzExternalId) {
    return url.replace(':externalId', kzExternalId);
}

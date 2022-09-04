import { http } from 'k6/http';

import { url, payload, params } from '../../params/pix/withdraw.param.js';

export function withdraw(accessToken, kzExternalId) {
    const req = http.post(getUrlBasedExternalId(kzExternalId), payload, params(accessToken));

    check(req, {
        'status was 200 or 201': (r) => r.status == 200 || r.status == 201,
        'transaction time less than 3s': (r) => r.timings.duration < 3000
    });

    logResults(req);
}

function getUrlBasedExternalId(kzExternalId) {
    return url.replace(':externalId', kzExternalId);
}
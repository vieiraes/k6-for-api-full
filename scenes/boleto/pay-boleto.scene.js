import http from 'k6/http';
import { check, sleep } from 'k6';
import { url, payload, params } from '../../params/boleto/pay-boleto.param.js';
// import { logResults } from '../../utils.js';
import { Rate } from "k6/metrics"

export let errorRate = new Rate('errorRate');



export function payBoleto(accessToken) {

   
    const res = http.post(url, payload, params(accessToken));

    check(res, {
        'status was 200 or 201': (r) => r.status == 200 || r.status == 201,
        // 'transaction time less than 3s': (r) => r.timings.duration < 3000
    });
    errorRate.add(res.status >= 400);

    const result = res.json()
    return result.id
    // console.log(JSON.stringify(params()));
}

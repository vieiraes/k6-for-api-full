import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { data, params  } from '../params/batchProcess.param.js';

export function batchProcess() {

    // a diferença do batch é que os requests são feitos em paralelo
    // ou seja o K6 ele executa X vezes em paralelo para cara request feito. Teste extremo.
    let req = http.batch(JSON.stringify(data), params);

    check(req, {
        'status was 200 or 201': (r) => r.status === 200 || 201,
        'transaction time OK': (r) => r.timings.duration < 2000
    });

    console.log(JSON.stringify(req.json()))
};


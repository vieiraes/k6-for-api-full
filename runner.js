import { oauth } from "./scenes/oauth/oauth.scene.js";
import { payBoleto, errorRate } from './scenes/boleto/pay-boleto.scene.js';
import { sleep, group } from "k6";
import { env } from "./env/env.param.js";

// REPORT HTML
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export function setup() {
  return group(`Login em ${env}`, () => oauth(), [])
}


export default function (accessToken) {

  //PAGAR BOLETO
  group("checks - Pagar Boleto", () => {
    payBoleto(accessToken);
    // array.push(resultId)
    sleep(5);
  });
  // console.log("--ARRAY---",array)


  // //GERAR COBRANÇA
  // group("checks - Gerar Cobrança", () => {
  //   generateQrcode(accessToken);
  //   // sleep(5);
  // });

  // //PAGAR COBRANÇA
  // group("checks - Pagar Cobrança", () => {
  //   payQRCode(accessToken);
  //   sleep(5)
  // })

  // //TODO:CONSULTAR COBRANÇA
  // group("checks - Consultar Cobrança", () => {
  //   const KAIExternalId = generateQrcode(accessToken);
  //   getQrcode(accessToken, KAIExternalId);
  // });
}




export let options = {

  vus: 3,
  noConnectionReuse: true,
  thresholds: {
    errorRate: [
      { threshold: ['rate < 0.1'],
      //  abortOnFail: true, 
      //  delayAbortEval: '1m'
       },
    ]


    //  http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    //  http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'], // 95% of requests should be below 200ms
  },

  stages: [

    { duration: '10s', target: 3 },
    { duration: '2m', target: 3 },
    { duration: '10s', target: 0 },

  ],

}
//REPORT HTML
export function handleSummary(data) {
  console.log('Preparing the end-of-test report...');
  return {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
    "./output/results.html": htmlReport(data),
    //"./output/results.json": JSON.stringify(data)
    "./output/boletos-pagos.json": JSON.stringify(data)
  };
}

import { Counter } from 'k6/metrics';

export const CounterErrors = new Counter('Errors');

let errorCount400 = new Counter('errorCount400');
let errorCount500 = new Counter('errorCount500');


export function logResults(req) {

  if (req.status < 299) {
    console.log('========== Response Status: ' + req.status);

    console.log(req.body)
  } else if (req.status >= 400 && req.status < 500) {
    console.error('========== Error: ' + req.status);
    console.log(req.body)
    errorCount400.add(1);

  } else if (req.status >= 500) {
    console.error('========== Error: ' + req.status);
    console.log(req.body)
    errorCount500.add(1);
  }
  const accessTokenBit = req.json().access_token;
  console.log(accessTokenBit);
  return accessTokenBit;
}

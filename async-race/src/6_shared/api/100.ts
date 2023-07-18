import { ICreateCarRequest } from './../../types';

export function set100CarInGarage(request: ICreateCarRequest) {
  const url = 'http://127.0.0.1:3000/garage';
  const method = 'POST';
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
}

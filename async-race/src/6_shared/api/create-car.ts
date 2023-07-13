import { ICreateCarRequest } from './../../types';

export async function setCarInGarage(request: ICreateCarRequest) {
  const url = 'http://127.0.0.1:3000/garage';
  const method = 'POST';
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    return await response.json();
  }
  catch {
    /* throw new Error('Error in Set Car Request')
    console.error('Error') */
  }
}

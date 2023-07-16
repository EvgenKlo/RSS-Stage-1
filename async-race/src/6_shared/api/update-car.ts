import { ICreateCarRequest } from '../../types';

export async function updateCar(request: ICreateCarRequest, id: string) {
  const url = 'http://127.0.0.1:3000/garage';
  const method = 'PUT';
  try {
    const response = await fetch(url + '/' + id, {
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

import { ICreateCarRequest } from './../../types';

export async function deleteCar(id: string) {
  const url = 'http://127.0.0.1:3000/garage';
  const method = 'DELETE';
  try {
    const response = await fetch(url + '/' + id, {
      method: method,
    })
  }
  catch {
    /* throw new Error('Error in Set Car Request')
    console.error('Error') */
  }
}

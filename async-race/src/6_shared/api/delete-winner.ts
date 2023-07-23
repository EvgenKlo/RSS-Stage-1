import { ICreateCarRequest } from './../../types';

export async function deleteWinner(id: string) {
  const url = 'http://127.0.0.1:3000/winners';
  const method = 'DELETE';
  try {
    const response = await fetch(url + '/' + id, {
      method: method,
    })
  }
  catch (error){
    console.log(error)
  }
}

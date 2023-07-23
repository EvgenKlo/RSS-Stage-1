import { IUpdateWinnerRequest } from '../../types';

export async function updateWinner(request: IUpdateWinnerRequest, id: number) {
  const url = 'http://127.0.0.1:3000/winners';
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
  catch (error){
    console.log(error)
  }
}

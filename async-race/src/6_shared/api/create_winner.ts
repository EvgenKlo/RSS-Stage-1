import { IWinnerResponse } from './../../types';

export async function createWinner(request: IWinnerResponse) {
  const url = 'http://127.0.0.1:3000/winners';
  const method = 'POST';
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    return response;
  }
  catch (error){
    console.log(error)
    return await Promise.reject()
  }
}

import { IStartStorParams } from '../../types';

export async function startStopEng(id: number, status: string) {
  const url = 'http://127.0.0.1:3000/engine';
  const queryParams: IStartStorParams = {
    _id: `id=${id}`,
    _status: `status=${status}`
  }
  const method = 'PATCH';
  try {
    const response = await fetch(url + '?' + queryParams._id + '&' + queryParams._status, {
      method: method,
    })
    return await response.json();
  }
  catch {
    /* throw new Error('Error in Set Car Request')
    console.error('Error') */
  }
}

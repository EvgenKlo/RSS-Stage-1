import { ICarResponse } from '../../../types';

export async function getGarage() {
  const url = 'http://127.0.0.1:3000/garage';
  const response: ICarResponse[] = await fetch(url).then((data) => data.json());
  return response;
}

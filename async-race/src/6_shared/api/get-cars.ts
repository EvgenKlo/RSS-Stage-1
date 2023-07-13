import { IQueryParams, IGarageResponse } from '../../types';

export async function getGarage(pageNumber = 1): Promise<IGarageResponse | undefined> {
  const url = 'http://127.0.0.1:3000/garage';
  const queryParams: IQueryParams = {
    _page: `_page=${pageNumber}`,
    _limit: '_limit=7'
  }
  try {
    const response = await fetch(url + '?' + queryParams._page + '&' + queryParams._limit);
    const carsCount = response.headers.get('X-Total-Count');
    const garage = await response.json();
    const resp: IGarageResponse = {
      garage: garage,
      carsCount: carsCount
    }
    return resp;
  }
  catch {
    console.error('Error')
  }
  
}

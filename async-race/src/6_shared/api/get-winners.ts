import { IQueryWinnersParams, IWinnersResponse } from '../../types';

export async function getWinners(pageNumber: number, sort = 'time'): Promise<IWinnersResponse | undefined> {
  const url = 'http://127.0.0.1:3000/winners';
  const queryParams: IQueryWinnersParams = {
    _page: `_page=${pageNumber}`,
    _limit: '_limit=10',
    _sort: `_sort=${sort}`
  }
  try {
    const response = await fetch(url + '?' + queryParams._page + '&' + queryParams._limit + '&' + queryParams._sort);
    const winnersCount = response.headers.get('X-Total-Count');
    const winners = await response.json();
    const resp: IWinnersResponse = {
      winners: winners,
      winnersCount: winnersCount
    }
    return resp;
  }
  catch {
    console.error('Error')
  }
  
}

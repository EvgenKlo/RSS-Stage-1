import { IQueryWinnersParams, ISortParams, IWinnersResponse } from '../../types';

export async function getWinners(pageNumber: number, sortParams: ISortParams): Promise<IWinnersResponse | undefined> {
  const url = 'http://127.0.0.1:3000/winners';
  const queryParams: IQueryWinnersParams = {
    _page: `_page=${pageNumber}`,
    _limit: '_limit=10',
    _sort: `_sort=${sortParams.sort}`,
    _order: `_order=${sortParams.order}`
  }
  try {
    const response = await fetch(url + '?' + queryParams._page + '&' + queryParams._limit + '&' + queryParams._sort + '&' + queryParams._order);
    const winnersCount = response.headers.get('X-Total-Count');
    const winners = await response.json();
    const resp: IWinnersResponse = {
      winners: winners,
      winnersCount: winnersCount
    }
    return resp;
  }
  catch (error){
    console.log(error)
  }
  
}

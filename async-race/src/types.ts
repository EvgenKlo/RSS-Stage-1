export interface ICarResponse {
  name: string,
  color: string,
  id: number
}

export interface ICreateCarRequest {
  name: string,
  color: string
}

export interface IQueryParams {
  _page: string,
  _limit: string
}

export interface IGarageResponse {
  garage: ICarResponse[],
  carsCount: string | null
}



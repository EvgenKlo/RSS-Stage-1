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

export interface ICarRequest {
  name: string,
  color: string
}

export interface IStartStorParams {
  _id: string,
  _status: string
}

export interface IStartStorResponse {
  velocity: number,
  distance: number
}

export interface IQueryWinnersParams {
  _page: string,
  _limit: string,
  _sort: string
}

export interface IWinnersResponse {
  winners: IWinnerResponse[],
  winnersCount: string | null
}

export interface IWinnerResponse {
  id: number,
  wins: number,
  time: number
}

export interface ISourseResponse {
  status: string,
  sources: ISourse[]
}

export interface ISourse {
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string
}

export interface INewsResponse {
  status: string,
  totalResults: number,
  articles: INewsArticle[]
}

export interface INewsArticle {
  source: {
    id: string,
    name: string
    },
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string
}

export type ApiKey = {
  [key: string]: string;
}

export type RequestOptions = {
  endpoint: string;
  options?: Options;
}

export interface Options {
  sources?: string;
  [key: string]: string | undefined;
}

export type Callback<T> = (data: T) => void;
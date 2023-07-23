import { IWinnerResponse } from "../../types";

export async function getWinner(id: number): Promise<IWinnerResponse | undefined> {
  const url = 'http://127.0.0.1:3000/winners';
  const method = 'GET';
  try {
    const response = await fetch(url + '/' + id, {
      method: method,
    })
    return await response.json();
  }
  catch (error){
    console.log(error)
  }
}

import { ICarResponse } from "../../types";

export async function getCar(id: number): Promise<ICarResponse | undefined> {
  const url = 'http://127.0.0.1:3000/garage';
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

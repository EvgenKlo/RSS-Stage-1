import { getGarage } from '../../6_shared/api/get-api/get-api-garage';
import { ICarResponse } from '../../types';


export class Garage {
  public garage: ICarResponse[] = [];

  async name() {
    this.garage = await getGarage();
    console.log(this.garage)
  }
}

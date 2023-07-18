import { carModels } from './../../6_shared/car-models';
import { getRandomInt } from './../../6_shared/lib/helpers/generate-ramdon-number';
import { ICarRequest } from './../../types';

export function generate100Cars() {
  const request = new Array<ICarRequest>;
  for(let i = 0; i < 100; i++) {
    const requestItem: ICarRequest = {
      name: '',
      color: ''
    };
    const ramdomItemInCarModels = carModels[getRandomInt(carModels.length)];
    const ramdomCarBrand = ramdomItemInCarModels.brand;
    const ramdomCarModel = ramdomItemInCarModels.models[getRandomInt(ramdomItemInCarModels.models.length)];
    requestItem.name += `${ramdomCarBrand} ${ramdomCarModel}`
    let color = '#' + Math.floor(Math.random()*16777215).toString(16);
    requestItem.color = color;
    request.push(requestItem);
  }
  return request
}

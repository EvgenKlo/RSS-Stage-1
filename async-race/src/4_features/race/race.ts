import { IGarageBox } from './../../5_entities/garage-box/types';
import { AnimateCar } from './../animate-car/animate-car'

export class Race {
  static startRace (garageItems: IGarageBox[]) {
    garageItems.forEach((item) => {
      AnimateCar.startAnimate(item);
    })
  }
}

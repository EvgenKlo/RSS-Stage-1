import { IGarageBox } from './../../5_entities/garage-box/types';
import { AnimateCar } from './../animate-car/animate-car'

export class Race {
  static async startRace (garageItems: IGarageBox[]) {
    const fastCar = await Promise.race(garageItems.map((item) => AnimateCar.startAnimate(item))).then(data => data);
    console.log(fastCar)
  }

  static resetRace(garageItems: IGarageBox[]) {
    garageItems.forEach((item) => {
      AnimateCar.resetAnimation(item);
    })
  }
}

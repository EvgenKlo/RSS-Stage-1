import { IGarageBox } from './../../5_entities/garage-box/types';
import { AnimateCar } from './../animate-car/animate-car';
import { createWinner } from './../../6_shared/api/create_winner'
import { IWinnerResponse } from '../../types';

export class Race {

  static async startRace (garageItems: IGarageBox[]) {
    const fastCar = await Promise.any(garageItems.map((item) => AnimateCar.startAnimate(item)));
    if(fastCar){
      await this.addWinner(fastCar);
    }
  }

  static resetRace(garageItems: IGarageBox[]) {
    garageItems.forEach((item) => {
      AnimateCar.resetAnimation(item);
    })
  }

  static async addWinner(fastCar: IGarageBox) {
    const winnerRequest: IWinnerResponse = {
      id: fastCar.id,
      wins: 1,
      time: 10
    }
    await createWinner(winnerRequest)
  }
}

import { IGarageBox } from './../../5_entities/garage-box/types';
import { AnimateCar } from './../animate-car/animate-car';
import { createWinner } from './../../6_shared/api/create_winner'
import { IFastCarResponse, IUpdateWinnerRequest, IWinnerResponse } from '../../types';
import { getWinner } from './../../6_shared/api/get-winner';
import { updateWinner } from './../../6_shared/api/update-winner'

export class Race {

  static async startRace (garageItems: IGarageBox[]) {
    try {
      const fastCar = await Promise.any(garageItems.map((item) => AnimateCar.startAnimate(item))); 
      if(fastCar){
        await this.addWinner(fastCar);
      }
    } catch {
      console.log('All cars crashed!')
    }
    
  }

  static resetRace(garageItems: IGarageBox[]) {
    garageItems.forEach((item) => {
      AnimateCar.resetAnimation(item);
    })
  }

  static async addWinner(fastCar: IFastCarResponse) {
    const winnerRequest: IWinnerResponse = {
      id: fastCar.garageBox.id,
      wins: 1,
      time: Number((fastCar.response.distance / fastCar.response.velocity / 1000).toFixed(3))
    }
    const response = await createWinner(winnerRequest);
    if(response.status === 500) {
      this.updateWinner(fastCar, winnerRequest)
    }
    
  }

  static async updateWinner(fastCar: IFastCarResponse, winnerRequest: IWinnerResponse) {
    const lastWinnerInfo = await getWinner(fastCar.garageBox.id);
    if(lastWinnerInfo) {
      const newWinnerInfo: IUpdateWinnerRequest = {
        wins: lastWinnerInfo.wins + 1,
        time: lastWinnerInfo.time < winnerRequest.time ? lastWinnerInfo.time : winnerRequest.time
      }
      await updateWinner(newWinnerInfo, fastCar.garageBox.id)
    }
  }
}

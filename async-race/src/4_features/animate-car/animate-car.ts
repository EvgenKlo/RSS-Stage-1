import { IStartStorResponse } from "../../types";
import { stopEng } from '../../6_shared/api/stop-engine'
import { IGarageBox } from "../../5_entities/garage-box/types";
import { startEng } from "../../6_shared/api/start-engine";

export class AnimateCar {

  static async startAnimate(garageBox: IGarageBox) {
    if(garageBox.startBtn.button.classList.contains('active')) {
      garageBox.startBtn.button.classList.remove('active');
      garageBox.stopBtn.button.classList.add('active');
      const response = await startEng(garageBox.id, 'started');
      const car = garageBox.car;
      const track = garageBox.trackElements.track;
      await this.animate(car, track, response, garageBox.id, garageBox);
    }
  }

  static async animate(car: HTMLElement, track: HTMLElement, resonse: IStartStorResponse, id: number, garageBox: IGarageBox) {
    garageBox.stopBtn.button.addEventListener('click', () => {
      this.resetAnimation(garageBox)
    }, { once: true })
  
    let start: number;
    let done = false;
    const trackWidth = +window.getComputedStyle(track).width.slice(0, -2);
    const carWidth = +window.getComputedStyle(car).width.slice(0, -2);
    const finishPosition = trackWidth - carWidth - 10;
  
    requestAnimationFrame(step);
  
    try {
      await stopEng(id, 'drive');
    } catch {
      done = true
    }
  
    function step(timeStamp: number) {
      if (start === undefined) {
        start = timeStamp;
      }
      const elapsed = timeStamp - start;
  
      if(elapsed) {
        const count = (resonse.velocity / 500) * elapsed;
        
        car.style.transform = `translateX(${count}px)`;
  
        if (count > finishPosition) {
          done = true;
        }
      }
  
      if (!done && garageBox.stopBtn.button.classList.contains('active')) {
        requestAnimationFrame(step);
      }
    }
  }

  static resetAnimation(garageBox: IGarageBox) {
    garageBox.startBtn.button.classList.add('active');
    garageBox.stopBtn.button.classList.remove('active');
    garageBox.car.style.transform = 'translateX(0px)'
  }
}

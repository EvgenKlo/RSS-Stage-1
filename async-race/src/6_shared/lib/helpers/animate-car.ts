import { IStartStorResponse } from "../../../types";
import { stopEng } from './../../api/strop-engine'

export function animate(car: HTMLElement, track: HTMLElement, resonse: IStartStorResponse, id: number): void {

  let start: number;
  let done = false;
  const trackWidth = +window.getComputedStyle(track).width.slice(0, -2);
  const carWidth = +window.getComputedStyle(car).width.slice(0, -2);
  const finishPosition = trackWidth - carWidth - 10;

  async function step(timeStamp: number) {
    try {

      const responseStop = await stopEng(id, 'drive');

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
  
      if (!done) {
        requestAnimationFrame(step);
      }

      

      if(responseStop === 500 || responseStop === 429) {
        throw new Error('Crash motor')
      }
    } catch (error) {
      console.log(error)
      //console.log(error)
    }
  }

  requestAnimationFrame(step);

}

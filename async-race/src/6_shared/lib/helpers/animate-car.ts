import { IStartStorResponse } from "../../../types";

export function animate(car: HTMLElement, track: HTMLElement, resonse: IStartStorResponse): void {

  let start: number;
  let done = false;
  const trackWidth = +window.getComputedStyle(track).width.slice(0, -2);
  const carWidth = +window.getComputedStyle(car).width.slice(0, -2);
  const finishPosition = trackWidth - carWidth - 10;

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

    if (!done) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
      
}

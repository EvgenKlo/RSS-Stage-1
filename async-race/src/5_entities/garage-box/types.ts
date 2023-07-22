import { IButton } from './../../6_shared/lib/ui-components/types'

export interface IGarageBox {
  name: string;
  color: string;
  id: number;
  garageBox: HTMLElement;
  carName: HTMLElement;
  car: HTMLElement;
  trackLine: HTMLElement;
  startBtn: IButton;
  stopBtn: IButton;
  trackElements: {trackContainer: HTMLElement, car: HTMLElement, track: HTMLElement}
  buildTrack: () => void;
}

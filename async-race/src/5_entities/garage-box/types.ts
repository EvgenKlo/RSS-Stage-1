export interface IGarageBox {
  name: string;
  color: string;
  id: number;
  garageBox: HTMLElement;
  carName: HTMLElement;
  car: HTMLElement;
  trackLine: HTMLElement;
  buildTrack: () => void;
}

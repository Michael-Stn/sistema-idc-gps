import { Pets } from './pets.model';

export interface Alerts {
  _id: string;
  code: number;
  title: string;
  codePet: number;
  distance: number;
  date: string;
  infoPet?: Pets;
}

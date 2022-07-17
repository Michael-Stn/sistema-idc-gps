import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-pet',
  templateUrl: './item-pet.component.html',
  styleUrls: ['./item-pet.component.scss'],
})
export class ItemPetComponent implements OnInit {
  @Input() code!: number;
  @Input() index!: number;
  @Input() namePet!: string;
  @Input() doTrack!: boolean;
  @Input() color!: string;

  petIndexLabel: string;
  btnEditLabel: string;
  chbxLabel: string;
  constructor() {
    this.petIndexLabel = 'Mascota ';
    this.btnEditLabel = 'Editar';
    this.chbxLabel = 'Monitoreando';
  }

  ngOnInit(): void {
    this.petIndexLabel += String(this.index);
  }
}

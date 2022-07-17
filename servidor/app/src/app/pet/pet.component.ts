import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  titlePage: string;
  nameLabel: string;
  codeLabel: string;
  chbxLabel: string;
  btnSaveLabel: string;
  btnCancelLabel: string;

  constructor() {
    this.titlePage = 'Agregar mascota';
    this.nameLabel = 'Nombre:';
    this.codeLabel = 'Código ID:';
    this.chbxLabel = 'Monitorear';
    this.btnSaveLabel = 'Guardar';
    this.btnCancelLabel = 'Cancelar';
  }

  ngOnInit(): void {}
}

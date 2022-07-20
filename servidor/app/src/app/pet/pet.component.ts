import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PetsService } from '../core/services/pets/pets.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  code!: string;
  titlePage: string;
  nameLabel: string;
  codeLabel: string;
  chbxLabel: string;
  btnSaveLabel: string;
  btnCancelLabel: string;
  addingPet: boolean;

  petForm = this.formBuilder.group({
    name: '',
    code: 0,
    doTrack: true,
    color: '#000000',
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private petsService: PetsService
  ) {
    this.addingPet = true;
    this.titlePage = 'Agregar mascota';
    this.nameLabel = 'Nombre:';
    this.codeLabel = 'Código ID:';
    this.chbxLabel = 'Monitorear';
    this.btnSaveLabel = 'Guardar';
    this.btnCancelLabel = 'Cancelar';
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code') ?? '';
    if (this.code) {
      this.addingPet = false;
      this.titlePage = 'Editar mascota';
    }
  }

  onSubmit() {
    if (this.addingPet) {
      this.petsService.create(this.petForm.value).subscribe((response) => {
        console.log(response);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  btnDeleteLabel: string;
  addingPet: boolean;
  messageAlert = '';

  petForm = this.formBuilder.group({
    name: '',
    code: 0,
    doTrack: true,
    color: '#000000',
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    this.btnDeleteLabel = 'Eliminar';
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code') ?? '';
    if (this.code) {
      this.addingPet = false;
      this.titlePage = 'Editar mascota';
      this.petsService.getByCode(this.code).subscribe((response) => {
        const infoPet = response.data;
        this.petForm.setValue({
          name: infoPet.name,
          code: infoPet.code,
          doTrack: infoPet.doTrack,
          color: infoPet.color,
        });
      });
    }
  }

  onSubmit() {
    if (this.addingPet) {
      this.petsService.create(this.petForm.value).subscribe((response) => {
        const petName = response.data[0].name;
        this.messageAlert = `La mascota ${petName} ha sido creada correctamente`;
        this.petForm.reset();
      });
    } else {
      this.petsService.update(this.code, this.petForm.value).subscribe(() => {
        this.messageAlert = `La mascota ${this.petForm.value.name} ha sido actualizada`;
        this.code = String(this.petForm.value.code);
      });
    }
  }

  onDelete() {
    this.petsService.delete(this.code).subscribe((response) => {
      const modifiedCount = response.data.modifiedCount;
      if (modifiedCount) {
        this.router.navigate(['/']);
      }
    });
  }
}

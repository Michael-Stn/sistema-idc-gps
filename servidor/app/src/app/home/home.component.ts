import { Component, OnInit } from '@angular/core';
import { Pets } from '../core/models/pets.model';
import { PetsService } from '../core/services/pets/pets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  titlePage: string;
  pets!: Pets[];

  constructor(private petsService: PetsService) {
    this.titlePage = 'Monitoreo de mascotas';
  }

  ngOnInit(): void {
    this.petsService.get().subscribe((response) => {
      this.pets = response.data;
    });
  }
}

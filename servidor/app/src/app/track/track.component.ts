import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tracks } from '../core/models/tracks.model';
import { PetsService } from '../core/services/pets/pets.service';
import { TracksService } from '../core/services/tracks/tracks.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  code: string;
  titlePage: string;
  petLabel: string;
  distanceLabel: string;
  tracks!: Tracks[];
  constructor(
    private route: ActivatedRoute,
    private tracksService: TracksService,
    private petsService: PetsService
  ) {
    this.titlePage = 'Localizar mascota';
    this.petLabel = 'Mascota: ';
    this.distanceLabel = 'Distancia: PENDIENTE';
    this.code = this.route.snapshot.paramMap.get('code') ?? '';
  }

  ngOnInit(): void {
    this.petsService.getByCode(this.code).subscribe((response) => {
      this.petLabel += response.data.name;
    });
    this.tracksService.get(this.code).subscribe((response) => {
      this.tracks = response.data;
    });
  }
}

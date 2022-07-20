import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tracks } from '../core/models/tracks.model';
import { ConfigsService } from '../core/services/configs/configs.service';
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

  // Configuración por defecto del Maps
  center: google.maps.LatLngLiteral = { lat: 4.661287, lng: -74.1108173 };
  zoom = 11;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition!: google.maps.LatLngLiteral;
  markerHomeOptions: google.maps.MarkerOptions = { draggable: false };
  markerHomePosition!: google.maps.LatLngLiteral;

  constructor(
    private route: ActivatedRoute,
    private tracksService: TracksService,
    private petsService: PetsService,
    private configService: ConfigsService
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
    this.configService.get().subscribe((response) => {
      const infoConfig = response.data;
      this.markerHomePosition = {
        lat: infoConfig.homeLat,
        lng: infoConfig.homeLon,
      };
    });
    this.tracksService.getLast(this.code).subscribe((response) => {
      this.tracks = response.data;
      if (this.tracks.length) {
        const track = this.tracks[0];
        this.center = { lat: track.lat, lng: track.lon };
        this.zoom = 19;
        this.markerPosition = {
          lat: track.lat,
          lng: track.lon,
        };
      }
    });
  }
}

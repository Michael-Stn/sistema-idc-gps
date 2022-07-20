import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfigsService } from '../core/services/configs/configs.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  titlePage: string;
  doSyncLabel: string;
  intervalSyncLabel: string;
  minutesLabel: string;
  locationLabel: string;
  doAlertLabel: string;
  distanceAlertLabel: string;
  metersLabel: string;
  intervalAlertLabel: string;
  btnSaveLabel: string;
  btnCancelLabel: string;
  messageAlert: string;
  initialConfig: boolean;

  configForm = this.formBuilder.group({
    doSync: false,
    intervalSync: 0,
    homeLat: 0,
    homeLon: 0,
    doAlert: false,
    distanceAlert: 0,
    intervalAlert: 0,
  });

  // Configuración por defecto del Maps
  center: google.maps.LatLngLiteral = { lat: 4.661287, lng: -74.1108173 };
  zoom = 11;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition!: google.maps.LatLngLiteral;

  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigsService
  ) {
    this.titlePage = 'Configuración';
    this.doSyncLabel = 'Sincronizar';
    this.intervalSyncLabel = 'Intervalo de sincronización: ';
    this.minutesLabel = 'minutos';
    this.locationLabel = 'Ubicación del hogar';
    this.doAlertLabel = 'Alertar';
    this.distanceAlertLabel = 'Distancia de alertamiento';
    this.metersLabel = 'metros';
    this.intervalAlertLabel = 'Intervalo de alertamiento';
    this.btnSaveLabel = 'Guardar';
    this.btnCancelLabel = 'Cancelar';
    this.messageAlert = '';
    this.initialConfig = true;
  }

  ngOnInit(): void {
    this.configService.get().subscribe((response) => {
      this.initialConfig = false;
      const infoConfig = response.data;
      this.configForm.setValue({
        doSync: infoConfig.doSync,
        intervalSync: infoConfig.intervalSync,
        homeLat: infoConfig.homeLat,
        homeLon: infoConfig.homeLon,
        doAlert: infoConfig.doAlert,
        distanceAlert: infoConfig.distanceAlert,
        intervalAlert: infoConfig.intervalAlert,
      });

      this.center = { lat: infoConfig.homeLat, lng: infoConfig.homeLon };
      this.zoom = 19;
      this.markerPosition = {
        lat: infoConfig.homeLat,
        lng: infoConfig.homeLon,
      };
    });
  }

  onSubmit(): void {
    const formData = this.configForm.value;
    formData.homeLat = this.markerPosition.lat;
    formData.homeLon = this.markerPosition.lng;

    if (this.initialConfig) {
      this.configService.create(formData).subscribe(() => {
        this.messageAlert = 'Configuración actualizada exitosamente';
      });
    } else {
      this.configService.update(formData).subscribe(() => {
        this.messageAlert = 'Configuración actualizada exitosamente';
      });
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (latLng) {
      this.markerPosition = latLng.toJSON();
    }
  }
}

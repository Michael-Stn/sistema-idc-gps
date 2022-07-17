import { Component, OnInit } from '@angular/core';

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

  constructor() {
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
  }

  ngOnInit(): void {}
}

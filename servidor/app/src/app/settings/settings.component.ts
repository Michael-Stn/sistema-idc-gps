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

  configForm = this.formBuilder.group({
    doSync: false,
    intervalSync: 0,
    homeLat: 0,
    homeLon: 0,
    doAlert: false,
    distanceAlert: 0,
    intervalAlert: 0,
  });

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
  }

  ngOnInit(): void {
    this.configService.get().subscribe((response) => {
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
    });
  }

  onSubmit(): void {
    this.configService.update(this.configForm.value).subscribe(() => {
      this.messageAlert = 'Configuración actualizada exitosamente';
    });
  }
}

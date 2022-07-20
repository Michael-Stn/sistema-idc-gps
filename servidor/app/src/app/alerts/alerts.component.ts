import { Component, OnInit } from '@angular/core';
import { Alerts } from '../core/models/alerts.model';
import { AlertsService } from '../core/services/alerts/alerts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  titlePage: string;
  alerts!: Alerts[];

  constructor(private alertsService: AlertsService) {
    this.titlePage = 'Notificaciones';
  }

  ngOnInit(): void {
    this.alertsService.get().subscribe((response) => {
      this.alerts = response.data;
      this.alerts.map((alert) => {
        alert.date = moment(alert.date).format('DD/MM/YYYY hh:mm:ss A');
      });
    });
  }
}

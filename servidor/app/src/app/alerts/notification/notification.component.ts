import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() title!: string;
  @Input() datetime!: string;
  @Input() petname!: string;
  @Input() distance!: string;

  petLabel: string;
  distanceLabel: string;
  constructor() {
    this.petLabel = 'Mascota: ';
    this.distanceLabel = 'Distancia: ';
  }

  ngOnInit(): void {
    if (this.petname) {
      this.petLabel += this.petname;
    }
    if (this.distance) {
      this.distanceLabel += this.distance.concat('m');
    }
  }
}

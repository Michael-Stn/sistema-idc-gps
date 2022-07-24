import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  text: string;
  constructor() {
    this.text =
      '© Michael Stiven Avila Arias - F.U. del Área Andina 2022';
  }

  ngOnInit(): void {}
}

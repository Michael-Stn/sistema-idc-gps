import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() btnClass!: string;
  @Input() iconClass!: string;
  @Input() link!: string;
  @Input() type = 'button'

  constructor() {}

  ngOnInit(): void {}
}

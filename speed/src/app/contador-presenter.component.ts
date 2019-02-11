import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contador-presenter',
  templateUrl: './contador-presenter.component.html'
})
export class ContadorPresenterComponent implements OnInit {

  @Input() public contador = { valor: 0 };

  constructor() {}

  ngOnInit() {}
}

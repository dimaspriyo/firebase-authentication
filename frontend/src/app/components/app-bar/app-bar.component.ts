import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  @Output() menu = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickMenu(menu: string) {
    console.log("Menu : " + menu);
    this.menu.emit(menu);
  }
}

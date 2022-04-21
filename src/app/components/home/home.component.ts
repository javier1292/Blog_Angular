import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Home_title:string;
  constructor() {
    this.Home_title = 'Bienvenido a JSocial'
   }

  ngOnInit(): void {
  }

}

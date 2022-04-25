import { Component, OnInit, DoCheck } from '@angular/core';
import { SevicioUsuario } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SevicioUsuario]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Tu blog perosnal';
  public identidad;
  public token;


  constructor(public _servicioUsuario: SevicioUsuario){
    this.loadUser();

  }

  ngOnInit(): void {
    console.log('webapp cargada')
  }
  ngDoCheck(): void {
    this.loadUser();
   
  }

  loadUser(){
    this.identidad = this._servicioUsuario.ObtenerIdentidad();
    this.token = this._servicioUsuario.obtenertoken();
  }


}

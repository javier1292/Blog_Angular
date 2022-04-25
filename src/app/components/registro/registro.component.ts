import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { SevicioUsuario } from 'src/app/Services/user.service';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers:[SevicioUsuario]
})
export class RegistroComponent implements OnInit {
  public Registro_Title: string;
  public user:User;
  public status: string;

  constructor(

    private _ServicioUsuario:SevicioUsuario
  ) { 
    this.Registro_Title = 'LLene el Formulario de Registro con sus datos';
    this.user =  new User(1, '', '','Role_user','','','','',);
  }

  ngOnInit(): void {
  }

  onSubmit(Form:any){
   this._ServicioUsuario.Rgistro(this.user).subscribe(
    Response => {
      if(Response.status == "success"){
        this.status = Response.status;
        console.log(Response);
        Form.reset();
      }else{
        this.status = 'error';
      }
    },
    error => {this.status = 'error';
      console.log(<any>error);
    }
   );
  
  }
 
}

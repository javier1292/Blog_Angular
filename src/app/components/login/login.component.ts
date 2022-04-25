import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router,ActivatedRoute, Params} from '@angular/router';
import { param } from 'jquery';
import { User } from 'src/app/models/user';
import { SevicioUsuario } from 'src/app/Services/user.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SevicioUsuario],
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public User: User;
  public status: string;
  public token;
  public identidad;

  constructor(
    private _ServicioUsuario: SevicioUsuario,
    private _router:Router,
    private _route:ActivatedRoute
    ) {
    this.page_title = 'identificate';
    this.User = new User(1, '', '', 'Role_user', '', '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form) {
    this._ServicioUsuario.Login(this.User).subscribe(
      Response => {
        //token
        if (Response.status != 'error') {
          this.status = 'success';
          this.token = Response;

          // uSUARIO IDENTIFICADO
          this._ServicioUsuario.Login(this.User,true).subscribe(
            Response => {
              //token
              this.identidad = Response;
              console.log(this.token);
              console.log(this.identidad);



              //Persisitir datos del usuario 
              localStorage.setItem('token',this.token);
              localStorage.setItem('identidad', JSON.stringify(this.identidad));
              this._router.navigate(['inicio'])
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout(){

    this._route.params.subscribe(params=>{
      let logout = +params['sure'];
      if(logout == 1){
        localStorage.removeItem('identidad');
        localStorage.removeItem('token');

        this.identidad = null;
        this.token = null;

       this._router.navigate(['inicio'])

      }

    });
  }
}

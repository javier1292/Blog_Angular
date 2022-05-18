import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./Global";



@Injectable()
export class SevicioUsuario{
    public url: string;
    public identidad;
    public token ;
    constructor(
        public _http: HttpClient
    ){
      this.url = global.URL
    }

    test(){
        return "Hola mundo";
    }

    Rgistro(User:any):Observable<any>{
        let json = JSON.stringify(User);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url +'Registro',params,{headers: headers});
    }

    Login(User, gettoken = null):Observable<any>{
        if(gettoken !=null){
            User.gettoken = 'true';
        }
        let json = JSON.stringify(User);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url +'Login',params,{headers: headers});
    }


    ObtenerIdentidad(){
        let identidad = JSON.parse(localStorage.getItem('identidad'));
        if(identidad && identidad!= "undefined"){
            this.identidad = identidad;
        }else{
            this.identidad = null;
        }

        return this.identidad;

    }

    obtenertoken(){
        let token = localStorage.getItem('token');

        if(token && token != "undefined"){

            this.token = token;
        }else {
            this.token = null;
        }
        return this.token;

    }

    update(token, User):Observable<any>{
        let json = JSON.stringify(User);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                                       .set('Authorization',token);
        return this._http.put(this.url +'user/update',params,{headers:headers});
    }

    
}
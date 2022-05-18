import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SevicioUsuario } from 'src/app/Services/user.service';
import { global } from 'src/app/Services/Global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [SevicioUsuario],
})
export class UserEditComponent implements OnInit {
  public User: User;
  public identidad;
  public token;
  public status;
  public forala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: [
      'bold',
      'italic',
      'underline',
      'paragraphFormat',
      'alert',
    ],
    toolbarButtonsSM: [
      'bold',
      'italic',
      'underline',
      'paragraphFormat',
      'alert',
    ],
    toolbarButtonsMD: [
      'bold',
      'italic',
      'underline',
      'paragraphFormat',
      'alert',
    ],
  };

  public afuConfig = {
  

    uploadAPI:  {
      url: global.URL + 'user/update/Avatar',
      headers: {        
        "Authorization": this._ServicioUsuario.obtenertoken()
      },
     
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Arrastrar y soltar',
      attachPinBtn: 'Sube tu avatar de usuario...',
      afterUploadMsg_success: '¡ Subido correctamente !',
      afterUploadMsg_error: '¡ Fallo en la subida !',
      sizeLimit: 'Tamaño máx.'
    }
  }; 

  constructor(private _ServicioUsuario: SevicioUsuario) {
    this.identidad = this._ServicioUsuario.ObtenerIdentidad();
    this.token = this._ServicioUsuario.obtenertoken();
    //rellenar obj Usuario
    this.User = this.identidad;
    this.User = new User(
      this.identidad.id,
      this.identidad.Nombre,
      this.identidad.Apellido,
      this.identidad.Role,
      this.identidad.Email,
      '',
      this.identidad.Descripcion,
      this.identidad.Imagen
    );
  }

  ngOnInit(): void {}

  onSubmit(form) {
    this._ServicioUsuario.update(this.token, this.User).subscribe(
      (response) => {
        if (response && response.status) {
          this.status = 'success';
          console.log(response);

          if (response.changes.Nombre) {
            this.User.Nombre = response.changes.Nombre;
          }
          if (response.changes.Apellido) {
            this.User.Apellido = response.changes.Apellido;
          }
          if (response.changes.Email) {
            this.User.Email = response.changes.Email;
          }

          if (response.changes.Descripcion) {
            this.User.Descripcion = response.changes.Descripcion;
          }

          if (response.changes.Imagen) {
            this.User.Imagen = response.changes.Imagen;
          }

          this.identidad = this.User;

          localStorage.setItem('identidad', JSON.stringify(this.identidad));
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }
  Avatar(datos) {
    console.log(datos.body.image);
    let data_image = datos.body.image;
    this.User.Imagen = data_image;
    this.identidad.image = data_image;
  }
}

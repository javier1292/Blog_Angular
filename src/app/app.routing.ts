/* IMPORTS NECESARIOS */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* IMPORTAR COMPONENTES */
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

/* DEFINIR LAS RUTAS */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', component: ErrorComponent },
  
];
//Exportar configuracion
export const proverdorRutas: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

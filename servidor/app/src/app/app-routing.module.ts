import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { HomeComponent } from './home/home.component';
import { PetComponent } from './pet/pet.component';
import { SettingsComponent } from './settings/settings.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  {
    path: '',
    title: 'Pet Tracker',
    component: HomeComponent,
  },
  {
    path: 'settings',
    title: 'Configuraciones',
    component: SettingsComponent,
  },
  {
    path: 'alerts',
    title: 'Notificaciones',
    component: AlertsComponent,
  },
  {
    path: 'pet',
    title: 'Agregar Mascota',
    component: PetComponent,
  },
  {
    path: 'pet/:code',
    title: 'Editar Mascota',
    component: PetComponent,
  },
  {
    path: 'track/:code',
    title: 'Localización',
    component: TrackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

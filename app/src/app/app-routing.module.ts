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
    component: HomeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'alerts',
    component: AlertsComponent,
  },
  {
    path: 'pet',
    component: PetComponent,
  },
  {
    path: 'track/:code',
    component: TrackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

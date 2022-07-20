import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AlertsComponent } from './alerts/alerts.component';
import { PetComponent } from './pet/pet.component';
import { TrackComponent } from './track/track.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BreadcrumbComponent } from './core/components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from './core/components/button/button.component';
import { ButtonIconComponent } from './core/components/button-icon/button-icon.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { OptionsComponent } from './home/options/options.component';
import { ItemPetComponent } from './home/item-pet/item-pet.component';
import { NotificationComponent } from './alerts/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './core/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    AlertsComponent,
    PetComponent,
    TrackComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ButtonComponent,
    ButtonIconComponent,
    FooterComponent,
    OptionsComponent,
    ItemPetComponent,
    NotificationComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

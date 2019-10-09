import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Arcgis3apiComponent } from './arcgis3api/arcgis3api.component';
import { Arcgis4apiComponent } from './arcgis4api/arcgis4api.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Routes,RouterModule} from '@angular/router';

const appRoutes: Routes = [
  {path: '', component:Arcgis3apiComponent},
  { path: 'arcgis4api', component: Arcgis4apiComponent }
  
]

@NgModule({
  declarations: [
    AppComponent,
    Arcgis3apiComponent,
    Arcgis4apiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

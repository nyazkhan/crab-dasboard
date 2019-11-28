import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';

import { AppComponent } from './app.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './components/login/login.service';




const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
  },

];

@NgModule({
  declarations: [
    AppComponent,


    LoginComponent,






  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],

  providers: [

    LoginService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

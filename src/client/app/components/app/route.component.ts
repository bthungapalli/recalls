import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../home/login/login.component';
import {RegistrationComponent} from '../home/registration/registration.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ProfileComponent} from '../dashboard/profile/profile.component';


const appRoutes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent }
   ]},
   { path: 'dashboard', component: DashboardComponent,
   children: [
     { path: '', redirectTo: 'profile', pathMatch: 'full' },
     { path: 'profile', component: ProfileComponent }
    ]}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RouteComponent {
 }

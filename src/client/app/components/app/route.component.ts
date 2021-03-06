import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../home/login/login.component';
import {RegistrationComponent} from '../home/registration/registration.component';
import {ForgotPasswordComponent} from '../home/forgotPassword/forgotPassword.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ProfileComponent} from '../dashboard/profile/profile.component';
import {UserManagementComponent} from '../dashboard/userManagement/userManagement.component';
import {CategoriesComponent} from '../dashboard/categories/categories.component';
import {RecallComponent} from '../dashboard/recalls/recall.component';
import {RecallsComponent} from '../dashboard/recalls/recalls.component';
import {RequestCategoryComponent} from '../dashboard/categories/requestCategory.component';
import {SubCategoriesComponent} from '../dashboard/subCategories/subCategories.component';
import {ShowRecallComponent} from '../dashboard/recalls/showRecall.component'

const appRoutes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'showRecall/:recallId' ,component: ShowRecallComponent},
  { path: 'registrationConfirmation' , redirectTo: 'home'},
  { path: 'home', component: HomeComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent }
   ]},
   { path: 'dashboard', component: DashboardComponent,
     children: [
       { path: '', redirectTo: 'profile', pathMatch: 'full' },
       { path: 'profile', component: ProfileComponent },
       { path: 'userManagement', component: UserManagementComponent },
       { path: 'categories', component: CategoriesComponent },
       { path: 'subCategories', component: SubCategoriesComponent },
       { path: 'recall', component: RecallComponent },
       { path: 'recall/:categoryName/:id', component: RecallComponent },
       { path: 'recalls', component: RecallsComponent },
       { path: 'requestCategory', component: RequestCategoryComponent }
      ]
   },
   {path: '**', redirectTo: 'dashboard'}
,
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

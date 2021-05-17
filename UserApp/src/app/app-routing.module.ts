import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdetailComponent } from './Components/userdetail/userdetail.component';
import { UsersComponent } from './Components/users/users.component';

const routes: Routes = [
  {path:'assignment2',component:UserdetailComponent},
  {path:'users',component:UsersComponent},
  {path:'**',redirectTo:'assignment2'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

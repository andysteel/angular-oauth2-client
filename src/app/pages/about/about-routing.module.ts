import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '',
    component: AboutComponent,
    canActivate: [PermissionGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

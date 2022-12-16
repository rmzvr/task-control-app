import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@features/login/guards/auth.guard';
import { LoginComponent } from '@features/login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'board/:id',
    loadChildren: () =>
      import('./features/board/board.module').then(
        (module) => module.BoardModule
      ),
    canLoad: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

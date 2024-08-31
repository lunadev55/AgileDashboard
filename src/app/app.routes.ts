import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboad/dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to Dashboard
  ];
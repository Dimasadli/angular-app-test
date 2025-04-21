import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    title: 'Employee List Page',
  },
  {
    path: 'employee-detail/:id',
    component: EmployeeDetailComponent,
    title: 'Employee Detail Page',
  },
  {
    path: 'employee-add',
    component: EmployeeAddComponent,
    title: 'Employee Add Page',
  },
];

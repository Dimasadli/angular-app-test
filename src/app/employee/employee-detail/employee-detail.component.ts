import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { LabelComponent } from '../../components/label/label.component';
import { ErrorTextComponent } from '../../components/error-text/error-text.component';
import { MatCardModule } from '@angular/material/card';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  imports: [ReactiveFormsModule, LabelComponent, MatCardModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent {
  detailForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employerService: EmployeeService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const { id } = this.activeRoute.snapshot.params;
    const employeeById: Employee | undefined =
      this.employerService.getEmployeeById(Number(id) || 1);

    const isoDate = employeeById?.birthDate || new Date();
    const parsedDate = new Date(isoDate);
    const formattedBirth = parsedDate.toISOString().split('T')[0];

    this.detailForm = this.fb.group({
      username: [employeeById?.username ?? ''],
      firstName: [employeeById?.firstName ?? ''],
      lastName: [employeeById?.lastName ?? ''],
      email: [employeeById?.email ?? ''],
      birthDate: [formattedBirth],
      basicSalary: [this.formatSalary(employeeById?.basicSalary || 0) ?? 0],
      status: [employeeById?.status ?? ''],
      group: [employeeById?.group ?? ''],
      description: [employeeById?.description ?? ''],
    });
  }

  formatSalary(salary: number): string {
    return 'Rp ' + salary.toLocaleString('id-ID');
  }

  onCancel(): void {
    this.location.back();
  }
}

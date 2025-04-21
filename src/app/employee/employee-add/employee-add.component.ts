import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LabelComponent } from '../../components/label/label.component';
import { ErrorTextComponent } from '../../components/error-text/error-text.component';
import { EmployeeService } from '../../services/employee.service';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-add',
  imports: [
    ReactiveFormsModule,
    LabelComponent,
    ErrorTextComponent,
    MatCardModule,
    CommonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  addForm!: FormGroup;
  groupList: string[] = [];
  filteredGroupList$!: Observable<string[]>;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.addForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.dateValidator]],
      basicSalary: [
        0,
        [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
      ],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.groupList = this.employeeService.getGroupList();

    this.filteredGroupList$ = this.addForm.get('group')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filteredOption(value || ''))
    );
  }

  dateValidator(control: FormControl): ValidationErrors | null {
    const value = new Date(control.value);
    return value > new Date() ? { futureDate: true } : null;
  }
  private _filteredOption(value: string): string[] {
    const filterValue = value.toLowerCase().trim();
    return this.groupList.filter((group) =>
      group.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const value = this.addForm.value;
    const birthDate = value.birthDate;
    const formattedBirth = new Date(birthDate);

    const payload = {
      ...value,
      id: this.employeeService.getAllEmployees().length + 1,
      birthDate: formattedBirth,
    };

    this.employeeService.addEmployee(payload);

    this._snackBar.open('Success menambahkan data', 'cancel', {
      verticalPosition: 'top',
      panelClass: 'success-snackbar',
      duration: 2500,
    });

    this.router.navigate(['/employee-list']);
  }

  onCancel(): void {
    this.router.navigate(['/employee-list']);
  }
}

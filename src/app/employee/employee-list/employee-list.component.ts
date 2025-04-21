import { Component, inject } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  imports: [MatTableModule, MatCardModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  private _snackBar = inject(MatSnackBar);
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'status',
    'email',
    'group',
    'action',
  ];
  page: number = 1;
  filteredEmployees: Employee[] = [];
  searchByName: string = '';
  searchInput: string = '';
  sortField: string = '';

  constructor(
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getAllEmployees();
    this.activeRoute.queryParams.subscribe((params) => {
      this.searchByName = params['name'] || '';
      this.sortField = params['sort'] || '';
      this.page = +params['page'] || 1;
      this.searchInput = params['name'] || '';
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredEmployees = this.employees
      .filter((emp) => {
        const name = `${emp.firstName} ${emp.lastName}`.toLowerCase();

        return name.includes(this.searchByName.toLowerCase());
      })
      .sort((a, b) => {
        const fullNameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const fullNameB = `${b.firstName} ${b.lastName}`.toLowerCase();

        if (this.sortField === 'ascName') {
          return fullNameA.localeCompare(fullNameB);
        }

        if (this.sortField === 'descName') {
          return fullNameB.localeCompare(fullNameA);
        }

        return 0;
      });
  }

  onClickAction(emp: Employee, type: string): void {
    if (type === 'detail') {
      this.router.navigate(['/employee-detail', emp.id]);
    } else if (type === 'edit') {
      this._snackBar.open('Open edit page', 'cancel', {
        verticalPosition: 'top',
        panelClass: 'warning-snackbar',
        duration: 2500,
      });
    } else {
      this._snackBar.open('Success delete data', 'cancel', {
        verticalPosition: 'top',
        panelClass: 'error-snackbar',
        duration: 2500,
      });
    }
  }

  get paginatedEmployees(): Employee[] {
    const start = (this.page - 1) * 10;
    return this.filteredEmployees.slice(start, start + 10);
  }

  onPageChange(type: string): void {
    if (type === 'prev') {
      this.page = this.page - 1;
    } else {
      this.page = this.page + 1;
    }

    this.updateQueryParams();
  }

  onSearch(): void {
    this.page = 1;
    this.searchByName = this.searchInput;
    this.updateQueryParams();
  }

  onSelectSort(event: any): void {
    const { value } = event.target;
    this.page = 1;
    this.sortField = value;
    this.updateQueryParams();
  }

  onChangeInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    this.searchInput = input.value;

    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onClickToAddPage(): void {
    this.router.navigate(['/employee-add']);
  }

  updateQueryParams(): void {
    const queryParams: any = {
      page: this.page,
    };

    if (this.searchByName.trim()) {
      queryParams.name = this.searchByName.trim();
    }

    if (this.sortField) {
      queryParams.sort = this.sortField;
    }

    this.router.navigate([], {
      queryParams,
    });
  }
}

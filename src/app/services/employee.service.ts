import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  protected employeList: Employee[] = [];
  protected gropList: string[] = [
    'HR',
    'IT',
    'Finance',
    'Marketing',
    'Admin',
    'Sales',
    'Support',
    'R&D',
    'Legal',
    'Product',
  ];

  constructor() {
    const stored = localStorage.getItem('employees');

    if (stored) {
      this.employeList = JSON.parse(stored);
    } else {
      this.generateEmployees();
    }
  }

  private generateEmployees() {
    for (let i = 1; i <= 100; i++) {
      this.employeList.push({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthDate: faker.date.past({ years: 30 }),
        basicSalary: parseInt(
          faker.finance.amount({ min: 5000000, max: 10000000 })
        ),
        status: faker.helpers.arrayElement(['Permanent', 'Contract']),
        group: faker.helpers.arrayElement(this.gropList),
        description: faker.lorem.sentence(),
        id: i,
      });
    }

    localStorage.setItem('employees', JSON.stringify(this.employeList));
  }

  getAllEmployees(): Employee[] {
    return this.employeList;
  }

  getGroupList(): string[] {
    return this.gropList;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employeList.find((employee) => employee.id === id);
  }

  addEmployee(employee: Employee): void {
    this.employeList.push(employee);
  }
}

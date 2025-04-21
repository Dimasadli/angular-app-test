# AngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs. qwqe

# User Journey

## Login

To test this login function please add a file `src/environments/environment.development.ts`, in this specific diretory with value

```
export const environment = {
  production: false,
  dummyCredentials: {
    username: 'admin',
    password: '123',
  },
};
```

For the first time user could login using dummy account, then redirect to employee list.

- username: admin
- password: 123

## Employee List

In this page, user can see the list of all mock employee that generated first time and save in localStorage. User could search by name, sort by name A-Z or Z-A.

- If user click edit, there will be toast that informs the user "Open edit page".
- If user click delete, there will be toast that informs the user "Success delete data".
- If user click detail, then user will redirect to Employee Detail Page.
- If user click Tambah Employee, then user will redirect to Employee Add Page.

## Employee Detail

In this page, user could see all the detail of user depending userId that has been passed from employee list page.

- If user click kembali, then user will go back to Employee List Page.

## Employee

In this page, user could generate new employee by fill all the required input.

- If user click kembali, then user will go back to Employee List Page.
- If user click save, then new employee being added to the current list employee and user will redirect to Employee List Page.

# MassageApp

---

This project is an Angular application for managing massage appointments, treatments, oils, and team members. The backend is powered by a JSON server with a `db.json` file.

## Prerequisites
Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://github.com/angular/angular-cli)

## Installation

1. Clone the repository to your local machine and navigate to the project directory.

2. Install the project dependencies:

    ```bash
    npm install
    ```

## Build

To build the project, run the following command:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. Deploy the contents of this directory to a web server for production use.

## JSON Server

The backend of this project is powered by JSON Server. To start the JSON Server, use the following command:

```bash
json-server --watch db.json
```

Make sure you have [JSON Server](https://github.com/typicode/json-server) installed globally:

```bash
npm install -g json-server
```

## Development server

Run the following command to start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your web browser. The application will automatically reload if you make any changes to the source files.

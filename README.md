# ConstructionRent

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.7.

## Project 
- Angular
- Ngrx for state management
- Angular material for ui components

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build & Setup

### Run
Run `docker-compose up` to start application with docker. It starts app on `localhost:4200` port 

### Setup
API url configuration is located under `/src/environments/environment.ts` and `/src/environments/environment.prod.ts` for production config, please change API url if needed.

## Further development
- Improve input validation(check 0-s)
- Improve listing of products(add description, image)
- Modularize app so we can take advantage of lazy loading
- Implement loading spinner
- Create separate sdk for invoices

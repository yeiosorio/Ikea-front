# CustomerService

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



# Detalle de instalacion IKEA
-> ng new customer-service --style=scss --routing
-> ng add @angular/material --skip-confirmation
-> ng add @angular-eslint/schematics --skip-confirmation
-> npm install --global stryker-cli
-> stryker init
-> npm install --save-dev @stryker-mutator/typescript-checker
-> npm install moment --save

# https://www.code-sample.com/2018/12/angular-7-cryptojs-encrypt-decrypt.html
-> npm install crypto-js --save
-> npm install @types/crypto-js --save-dev

# Open a terminal and connect to our npm registry.
npm set @ingka:registry https://npm.m2.blue.cdtapps.com

# Instalando los componentes de SKAPA-IKEA
npm i -P @ingka/core

# Style SKAPA-IKEA, importado en el angular.json
https://npm.m2.blue.cdtapps.com/-/web/detail/@ingka/core
    node_modules/@ingka/core/dist/style.css

# Fonts español SKAPA-IKEA
https://skapa.ikea.net/how-to/code-for-front-end/using-noto-ikea-on-the-web
    <link rel = "stylesheet" href = "https://www.ikea.com/global/assets/fonts/en/fonts.css">

# Favicon SKAPA-IKEA
https://skapa.ikea.net/how-to/code-for-front-end/including-favicons
    <link rel="icon" href="https://www.ikea.com/global/assets/logos/favicons/favicon.ico" sizes="any">
    <link rel="icon" href="https://www.ikea.com/global/assets/logos/favicons/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="https://www.ikea.com/global/assets/logos/favicons/apple-touch-icon.png">
    <link rel="manifest" href="https://www.ikea.com/global/assets/logos/favicons/site.webmanifest">

# Variables de SKAPA-IKEA / Paleta de colores
    node_modules/@ingka/variables/style.scss

# Login Azure AD
-> npm install @azure/msal-browser @azure/msal-angular@latest

# Variables de entorno del sistema en Angular
- https://medium.com/@fidelisclayton/system-environment-variables-in-angular-1f4a922c7b4c
- https://medium.com/@hughblue/reading-system-environment-variables-from-angular-part-2-a63368e591b4
- https://www.youtube.com/watch?v=BU5G_i1J5CA

-> npm i --save-dev @angular-builders/custom-webpack@13.0.0
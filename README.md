# IT Inventory Management Frontend

Welcome to the IT Inventory Management frontend! This Angular 14 application is designed to manage a company's IT inventory, including Employees and Devices. The frontend integrates with a .NET Core backend API to provide essential CRUD operations for the required entities and additional functionality to manage the linking of devices to employees.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [State Management](#state-management)
- [Styling](#styling)
- [License](#license)

## Overview

This Angular 14 application provides a user-friendly interface for managing a company's IT inventory. Users can add, edit, and delete employees and devices, as well as link devices to employees. The application also supports search and pagination for easy navigation through large datasets.

## Tech Stack

- **Frontend Framework**: Angular 14
- **State Management**: NgRx, RxJS
- **Styling**: SCSS
- **UI Library**: Angular Material
- **HTTP Client**: Angular HTTP Client for API communication

## Features

- **Employees**: Add, edit, and delete employees with properties such as name and email.
- **Devices**: Add, edit, and delete devices with properties such as type and description.
- **Linking**: Manage the linking of devices to employees.
- **Search**: Search for employees or devices based on keyword.
- **Pagination**: Easily navigate through large datasets with pagination.

## Setup and Installation

To set up and run the frontend application:

1. **Clone the Repository**: Clone the repository to your local machine.
    ```bash
    git clone https://github.com/daoudi-bilel/hcInventoryApp.git
    ```

2. **Navigate to the Project Directory**: 
    ```bash
    cd hcInventoryApp
    ```

3. **Install Dependencies**: Install Angular dependencies.
    ```bash
    npm install
    ```

4. **Start the Development Server**: Run the application in development mode.
    ```bash
    ng serve
    ```

The application will be available at `http://localhost:4200` by default.

## State Management

The application uses NgRx for state management, allowing for centralized state storage and predictable state updates. RxJS is used for managing reactive state and data flow throughout the application.

- **Actions**: Define actions to represent user interactions or API requests.
- **Reducers**: Create reducers to handle actions and update the state accordingly.
- **Selectors**: Use selectors to access specific parts of the state.
- **Effects**: Implement effects to handle side effects such as API calls.

## Styling

The application uses SCSS for styling and Angular Material for UI components. SCSS provides a more structured and maintainable approach to styling compared to regular CSS. Angular Material offers a wide range of reusable components with built-in styling.

# Project - Reportr Backend

## Overview

Reportr is an app whose purpose is to help an organization to manage its activities. Employees can create reports on their activities to their direct managers. Managers can view those reports in their
Report log, and can also assign tasks to their direct subordinates. All tasks assigned to employees are visible in their task log, as well as on their profile page.

The backend is a REST API built with Node and Express. It uses MongoDB as its database, and Mongoose as its ODM. It also uses JWT for authentication and authorization of employee accounts.

All API endpoints are validated using Joi on the serverside.

## Technologies Used

-   TypeScript
-   OOP Principles
-   Node
-   Express
-   MongoDB
-   Mongoose
-   JWT
-   Bcrypt
-   Celecbrate (Joi)

## Features

-   Employees can:

    -   create an account
    -   login
    -   view their profile
    -   view their task log
    -   view other employees' profiles
    -   create reports on their activities to their direct managers

-   Managers can (in addition to the above):

    -   view their report log
    -   assign tasks to their direct subordinates

## REST API Endpoints

-   **POST** /auth/register - Register a new employee/manger account
-   **POST** /auth/login - Login to an existing employee/manager account
-   **GET** /employees/ - Get all employees
-   **GET** /employees/:id - Get a specific employee with details
-   **GET** /employees/myprofile - Get the logged in employee's profile
-   **DELETE** /employees - Delete employees including their reports and tasks
-   **GET** /reports/myreports - Get the logged in Manager's report log
-   **POST** /reports/:id - post a report to a specific manager
-   **DELETE** /reports/:id - delete a specific report
-   **DELETE** /reports - delete all reports for logged in manager
-   **GET** /tasks/mytasks - Get the logged in employee's task log
-   **POST** /tasks/:id - Assign a task to a specific employee
-   **GET** /tasks/:id - Get a tasks for a specific employee
-   **DELETE** /tasks/:id - Delete a specific task

## Deployed REST API URL (GCP)

[https://api.reportr.solomonbarayev.dev/](https://api.reportr.solomonbarayev.dev/)

## Deployed Fullstack App URL (GCP)

[https://reportr.solomonbarayev.dev/](https://reportr.solomonbarayev.dev/)

## Frontend Repository

[https://github.com/solomonbarayev/reportr-frontend](https://github.com/solomonbarayev/reportr-frontend)

## Possible Future Improvements

-   add email notifications for things like:

    -   new report added from employee to manager
    -   new task added from manager to employee
    -   task completed by employee
    -   report approved by manager
    -   report rejected by manager
    -   task deadline approaching (1 day before)

-   add a chat feature for employees to communicate with each other

## Particular Challenges:

This project had a few challenges for me. First of all, I was challenged with learning Typescript in order to use OOP principles in this project. Second of all, I had a set deadline of a week to
finish both learning TS and implementing it into this app.

## How to run this project locally

-   Clone this repository
-   Run `npm install` to install all dependencies
-   Run `npm run dev` to start the server
-   clone the frontend repository and follow the instructions in the readme to run the frontend locally

## Author

Solomon Barayev

# Project - Reportr Fontend

## Overview

Reportr is an app whose purpose is to help an organization to manage its activities. Employees can create reports on their activities to their direct managers. Managers can view those reports in their
Report log, and can also assign tasks to their direct subordinates. All tasks assigned to employees are visible in their task log, as well as on their profile page.

The frontend is a Typescript React app that consumes the backend REST API. It uses gloval state management with Context API, and React Router for routing.

## Technologies Used

- TypeScript
- React
- React Router
- Context API

## Features

- Employees can:

  - create an account
  - login
  - view their profile
  - view their task log
  - view other employees' profiles
  - create reports on their activities to their direct managers

- Managers can (in addition to the above):

  - view their report log
  - assign tasks to their direct subordinates

- Navigation is dynamic based on whether the user is an employee or also a manager

  - if Employee: only shows Employees List and Task Log
  - if Manager: shows Employees List, Task Log, and Report Log

- Employee Information page is dynamic based on whether the user is an employee or also a manager

  - if Employee: only shows Employee's info and tasks assigned to them
  - if Manager: shows the above as well as the subordinates of the employee
  - Report button is only enabled the employee is on their own profile page (their is also serverside validation in case postman is used to check this)
  - Assign Task button is only enabled if the employee (manager) is on their own profile page (their is also serverside validation in case postman is used to check this)

- Signin and Signup form clientside validation

  - In addition to the serverside validation, there is also clientside validation built in to the AuthForm component which is used for both the Signin and Signup forms. This validation is was built from scratch without the use of any libraries.
  - In the event of successful registration, the user will see a popup informing them of successful registration and the user will be redirected to the Signin page for them to login.
  - In the even of unsuccessful registration, the user will see a popup informing them of the error and the user can try to register again.
  - In the event of successful login, the user will be redirected to the Employees List page.
  - In the event of unsuccessful login, the user will see a popup informing them of the error and the user can try to login again.

## Deployed Fullstack App URL (GCP)

[https://reportr.solomonbarayev.dev/](https://reportr.solomonbarayev.dev/)

## Backend Repository

[https://github.com/solomonbarayev/reportr-backend](https://github.com/solomonbarayev/reportr-backend)

## Possible Future Improvements

- add email notifications for things like:

  - new report added from employee to manager
  - new task added from manager to employee
  - task completed by employee
  - report approved by manager
  - report rejected by manager
  - task deadline approaching (1 day before)

- add a chat feature for employees to communicate with each other
- imporve Homepage UI (where you can see all employees and their profiles)

## Particular Challenges:

This project had a few challenges for me. First of all, I was challenged with learning Typescript to implement into this project. Secondly, I had a set deadline of only a week to produce both frontend and backend, while using TS for the first time.

## How to run this project locally

- First clone backend repo and follow instructions in readme to run backend locally
- Clone this repository
- Run `npm install` to install all dependencies
- Run `npm start` to start the server
- to test api locally, enable localhost:3000 as baseUrl in the api.ts and the auth.ts files in the src/utils folder
- to test api with deployed backend, enable deployed backend url as baseUrl (should already by done by default) in the api.ts and the auth.ts files in the src/utils folder

## Author

Solomon Barayev

import { config } from './config/config';
require('dotenv').config({ path: '../.env' });

import App from './app';
import EmployeeController from './employees/employees.controller';
import AuthenticationController from './authentication/authentication.controller';
import TaskController from './tasks/tasks.controller';
import ReportController from './reports/reports.controller';

const controllers = [new EmployeeController(), new AuthenticationController(), new TaskController(), new ReportController()];

const app = new App(controllers, config.port);

app.connectToDatabaseAndListen();

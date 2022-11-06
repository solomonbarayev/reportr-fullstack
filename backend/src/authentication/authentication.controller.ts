import express, { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import ConflictError from '../errors/ConflictError';
import BadRequestError from '../errors/BadRequestError';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

import Controller from '../interfaces/controller.interface';
import { validateAuthentication, validateEmployee } from '../middleware/validation.middleware';
import employeeModel from '../employees/employees.model';
import managerModel from '../managers/managers.model';

export default class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();

    private employees = employeeModel;
    private managers = managerModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validateEmployee, this.createEmployee);
        this.router.post(`${this.path}/login`, validateAuthentication, this.login);
    }

    private login = (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        return this.employees
            .findOne({ email })
            .select('+password')
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or password.' });
                }
                return bcrypt.compare(password, user.password).then((match: boolean) => {
                    if (!match) {
                        return res.status(401).json({ error: 'Invalid email or password.' });
                    }
                    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '7d' });
                    // make object from user with everything except password
                    const { password, ...userWithoutPassword } = user.toObject();
                    // return token and user without password
                    return res.status(200).json({ token, user: userWithoutPassword });
                });
            })
            .catch((err) => {
                return res.status(500).json({ error: 'Something went wrong. ' + err });
            });
    };

    private createEmployee = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        /* create employee function needs:
    1. check if email already exists
    2. hash password
    3. create employee
    4. check if this employee is manager and if so create manager
    5. if manager, update other employees who's ID are in this employee's mySubordinates array
    */
        // const employeeData: IEmployee = req.body;
        const { mySubordinates, ...employeeData } = req.body;
        const createdEmployee = new this.employees(employeeData);
        //check if employee already exists
        this.employees
            .findOne({ email: employeeData.email })
            .then((employee) => {
                if (employee) {
                    throw new ConflictError('Email already exists');
                }
                return bcrypt.hash(employeeData.password, 10);
            })
            .then((hash) => {
                createdEmployee.password = hash;
                createdEmployee
                    .save()
                    .then((savedEmployee) => {
                        //check if this employee is manager and if so create manager
                        if (savedEmployee.isManager) {
                            this.managers
                                .create({
                                    mySubordinates,
                                    _id: savedEmployee._id
                                })
                                .then((manager) => {
                                    //update other employees who's ID are in this employee's mySubordinates array
                                    if (manager.mySubordinates.length > 0) {
                                        manager.mySubordinates.forEach((subordinateId) => {
                                            this.employees
                                                .findByIdAndUpdate(subordinateId, { managerId: manager._id }, { new: true })
                                                .then((subordinate) => {
                                                    console.log(subordinate);
                                                })
                                                .catch(next);
                                        });
                                    }
                                })
                                .catch(next);
                        }
                        return res.status(201).send(savedEmployee);
                    })
                    .catch((err) => {
                        if (err.name === 'ValidationError') {
                            next(new BadRequestError(err.message));
                        } else {
                            next(err);
                        }
                    });
            })
            .catch(next);
    };
}

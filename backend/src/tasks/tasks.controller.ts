import Controller from '../interfaces/controller.interface';
import express from 'express';
import taskModel from './tasks.model';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import employeeModel from '../employees/employees.model';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import auth from '../middleware/auth.middleware';
import { validateObjectId, validateTask } from '../middleware/validation.middleware';

class TaskController implements Controller {
    public path = '/tasks';
    public router = express.Router();

    private tasks = taskModel;
    private employees = employeeModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/mytasks`, auth, this.getCurrentUserTasks);
        this.router.post(`${this.path}/:id`, auth, validateObjectId, validateTask, this.assignTask);
        this.router.get(`${this.path}/:id`, auth, this.getTasksForEmployee);
        this.router.delete(`${this.path}/:id`, this.deleteTask);
    }

    private assignTask = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const employeeId = req.params.id;
        const taskData = req.body;

        //first check if employee exists
        this.employees
            .findById(employeeId)
            .then((employee) => {
                if (!employee) {
                    throw new NotFoundError('Employee not found');
                }

                // make sure that only manager can assign tasks

                if (employee?.managerId?.toString() !== req.user!._id.toString()) {
                    throw new BadRequestError('You are not authorized to assign tasks to this employee');
                }

                //create task
                this.tasks
                    .create({
                        ...taskData,
                        managerId: req.user!._id,
                        employeeId,
                        assignDate: new Date().toISOString()
                    })
                    //now update employee's tasks
                    .then((task) => {
                        this.employees
                            .updateOne({ _id: employeeId }, { $push: { myTasks: task._id } })
                            .then((result) => console.log(result))
                            .catch(next);

                        res.status(201).json(task);
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

    private getCurrentUserTasks = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const { _id } = req.user!;

        this.employees
            .findById(_id)
            .populate({ path: 'myTasks', select: 'title dueDate' })
            .then((employee) => {
                if (!employee) {
                    throw new NotFoundError('Employee not found');
                } else {
                    return res.status(200).json(employee.myTasks);
                }
            })
            .catch((err) => {
                if (err.name === 'CastError') {
                    next(new BadRequestError('Invalid employee id'));
                }
                return next(err);
            });
    };

    private getTasksForEmployee = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const employeeId = req.params.id;
        this.tasks
            .find({ employeeId })
            .then((tasks) => {
                if (tasks) {
                    return res.status(200).json(tasks);
                } else {
                    res.status(200).json({ message: 'No tasks found' });
                }
            })
            .catch((err) => {
                if (err.name === 'CastError') {
                    next(new BadRequestError('Invalid employee id'));
                }
                return next(err);
            });
    };

    private deleteTask = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const taskId = req.params.id;
        this.tasks
            .findByIdAndDelete({ _id: taskId })
            .then((task) => {
                if (task) {
                    return res.status(200).json({ message: 'Task deleted successfully', delete: task });
                } else {
                    throw new NotFoundError('Task not found');
                }
            })
            .catch((err) => {
                if (err.name === 'CastError') {
                    next(new BadRequestError('Invalid task id'));
                }
                return next(err);
            });
    };
}

export default TaskController;

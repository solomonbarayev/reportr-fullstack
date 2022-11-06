import Controller from '../interfaces/controller.interface';
import express from 'express';
import reportModel from './reports.model';
import employeeModel from '../employees/employees.model';
import managerModel from '../managers/managers.model';
import auth from '../middleware/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { validateReport } from '../middleware/validation.middleware';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

class ReportController implements Controller {
    public path = '/reports';
    public router = express.Router();

    private reports = reportModel;
    private employees = employeeModel;
    private managers = managerModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/myreports`, auth, this.getReportsForUser);
        this.router.post(`${this.path}/:id`, auth, validateReport, this.createReport);
        this.router.delete(`${this.path}/:id`, auth, this.deleteReport);
        this.router.delete(`${this.path}`, auth, this.deleteAllReportsForUser);
    }

    private getReportsForUser = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const managerId = req.user!._id;
        this.reports
            .find({ managerId })
            .populate({ path: 'employeeId', select: 'firstName lastName' })
            .select('date text employeeId')
            .then((reports) => {
                res.status(200).send(reports);
            })
            .catch(next);
    };

    private createReport = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const { text, date } = req.body;

        const employeeId = req.user!._id;
        const managerId = req.params.id;

        this.employees
            .findById({ _id: employeeId })
            .orFail(() => {
                throw new NotFoundError('Employee not found');
            })
            .then((employee) => {
                // make sure that only employee of manager can create report
                if (employee?.managerId?.toString() !== managerId.toString()) {
                    throw new BadRequestError('You are not authorized to create reports for this employee');
                } else {
                    this.reports
                        .create({
                            text,
                            date,
                            managerId,
                            employeeId
                        })
                        .then((report) => {
                            // add report id to manager's myReports array
                            this.managers
                                .updateOne({ _id: managerId }, { $push: { myReports: report._id } })
                                .then((result) => console.log(result))
                                .catch(next);

                            res.status(201).json({
                                message: 'Report created successfully',
                                report
                            });
                        })
                        .catch(next);
                }
            })
            .catch(next);
    };

    private deleteReport = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const reportId = req.params.id;
        const managerId = req.user!._id;

        this.reports
            .findByIdAndDelete({ _id: reportId, managerId })
            .orFail(() => {
                throw new NotFoundError('Report not found');
            })
            .then((report) => {
                // remove report id from manager's myReports array
                this.managers
                    .updateOne({ _id: managerId }, { $pull: { myReports: reportId } })
                    .then((result) => console.log(result))
                    .catch(next);

                res.status(200).json({
                    message: 'Report deleted successfully',
                    report
                });
            })
            .catch(next);
    };

    private deleteAllReportsForUser = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
        const managerId = req.user!._id;

        this.reports
            .deleteMany({ managerId })
            .then((result) => {
                //remove all reports from manager's myReports array
                this.managers
                    .updateOne({ _id: managerId }, { $set: { myReports: [] } })
                    .then((result) => console.log(result))
                    .catch(next);

                res.status(200).json({
                    message: 'All reports deleted successfully',
                    result
                });
            })
            .catch(next);
    };
}

export default ReportController;

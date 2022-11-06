import { Types } from 'mongoose';

export default interface IReport {
    text: string;
    date: string;
    employeeId: Types.ObjectId;
    managerId: Types.ObjectId;
}

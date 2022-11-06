import { Types } from 'mongoose';

export default interface ITask {
    title: string;
    employeeId: Types.ObjectId;
    managerId: Types.ObjectId;
    dueDate: string;
    assignedDate: string;
}

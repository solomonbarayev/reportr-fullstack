import { Types } from 'mongoose';

export interface IEmployee {
    picture: string;
    firstName: string;
    lastName: string;
    position: string;
    managerId?: Types.ObjectId;
    myTasks: Types.ObjectId[];
    password: string;
    email: string;
    isManager: boolean;
}

import { Types } from 'mongoose';

export interface IManager {
    mySubordinates: Types.ObjectId[];
    myReports: Types.ObjectId[];
}

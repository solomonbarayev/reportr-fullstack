import mongoose, { Document, Schema, Types } from 'mongoose';
const validator = require('validator');
import { IEmployee } from './employee.interface';

const employeeSchema = new Schema<IEmployee, Document>({
    picture: { type: String, required: true, default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Employee', default: null },
    myTasks: { type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Task', default: [] },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v: string) => validator.isEmail(v),
            message: 'Valid email is required'
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isManager: { type: Boolean, required: true, default: false }
});

const employeeModel = mongoose.model<IEmployee & Document>('Employee', employeeSchema);

export default employeeModel;

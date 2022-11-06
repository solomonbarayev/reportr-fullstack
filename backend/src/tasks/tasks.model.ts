import mongoose, { Document, Schema, Types } from 'mongoose';
import ITask from './task.interface';

const taskSchema = new Schema({
    title: { type: String, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' },
    managerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' },
    dueDate: { type: String, required: true },
    assignDate: { type: String, required: true, default: new Date().toISOString() }
});

const taskModel = mongoose.model<ITask & Document>('Task', taskSchema);

export default taskModel;

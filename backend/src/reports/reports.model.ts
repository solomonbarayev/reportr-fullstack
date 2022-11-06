import mongoose, { Document, Schema, Types } from 'mongoose';
import IReport from './report.interface';

const reportSchema = new Schema({
    text: { type: String, required: true },
    date: { type: String, required: true, default: new Date().toISOString() },
    employeeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' },
    managerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' }
});

const reportModel = mongoose.model<IReport & Document>('Report', reportSchema);

export default reportModel;

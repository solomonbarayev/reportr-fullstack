import mongoose, { Document, Schema } from 'mongoose';
import { IManager } from './manager.interface';

const managerSchema = new Schema<IManager, Document>({
    mySubordinates: { type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Employee', default: [] },
    myReports: { type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'Report', default: [] }
});

const managerModel = mongoose.model<IManager & Document>('Manager', managerSchema);

export default managerModel;

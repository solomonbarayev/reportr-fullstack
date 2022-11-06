import { employeeData } from './employeeType';

export interface managerData extends employeeData {
  mySubordinates: number[];
  myReports: {
    reportId: number;
    reportText: string;
    reportDate: string;
  }[];
}

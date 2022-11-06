// prettier-ignore
export interface employeeData {
  id: number;
  picture: string;
  name: string;
  position: string;
  managerId?: number;
  myTasks?: {
      id: number;
      text: string;
      dueDate: string;
  }[];
  mySubordinates?: number[];
}

export interface employeeDataArray extends Array<employeeData> {}

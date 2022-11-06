export interface ITask {
  _id: string;
  title: string;
  employeeId: string;
  managerId: string;
  dueDate: string;
}

export interface ITaskBody {
  title: string;
  dueDate: string;
}

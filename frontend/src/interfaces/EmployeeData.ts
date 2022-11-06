import { ITask } from './TaskData';

export interface IManager extends IEmployee {}

export interface ISubordinate {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
}

export interface IEmployee {
  _id: string;
  picture: string;
  firstName: string;
  lastName: string;
  position: string;
  managerId?: IManager;
  isManager: boolean;
  myTasks: ITask[];
  email: string;
  __v: number;
  mySubordinates: ISubordinate[];
}

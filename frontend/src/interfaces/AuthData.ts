export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  picture: string;
  firstName: string;
  lastName: string;
  position: string;
  isManager: boolean;
  mySubordinates: string[];
}

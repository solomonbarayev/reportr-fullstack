// import { useAuth } from '../contexts/AuthContext';
import { IReportBody } from '../interfaces/ReportData';
import { ITaskBody } from '../interfaces/TaskData';

export class Api {
  BASE_URL: string;
  headers: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit) {
    this.BASE_URL = baseUrl;
    this.headers = headers;
  }

  private _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  }

  public getAllEmployees = () => {
    return fetch(`${this.BASE_URL}/employees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(this._checkResponse);
  };

  public getEmployee = (token: string | null, employeeID: string) => {
    return fetch(`${this.BASE_URL}/employees/${employeeID}`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  public getCurrentUserTasks = (token: string | null) => {
    return fetch(`${this.BASE_URL}/tasks/mytasks`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  public getCurrentUserReports = (token: string | null) => {
    return fetch(`${this.BASE_URL}/reports/myreports`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  public createReport = (
    token: string | null,
    report: IReportBody,
    managerId: string | null
  ) => {
    return fetch(`${this.BASE_URL}/reports/${managerId}`, {
      method: 'POST',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(report),
    }).then(this._checkResponse);
  };

  public assignTask = (
    token: string | null,
    task: ITaskBody,
    employeeId: string
  ) => {
    return fetch(`${this.BASE_URL}/tasks/${employeeId}`, {
      method: 'POST',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    }).then(this._checkResponse);
  };

  public deleteReport = (token: string | null, reportId: string) => {
    return fetch(`${this.BASE_URL}/reports/${reportId}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  public deleteAllReportsForUser = (token: string | null) => {
    return fetch(`${this.BASE_URL}/reports`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  public completeTask = (token: string | null, taskId: string) => {
    return fetch(`${this.BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };
}

const api = new Api(
  // 'http://localhost:3000',
  'https://api.reportr.solomonbarayev.dev',
  {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
);

export default api;

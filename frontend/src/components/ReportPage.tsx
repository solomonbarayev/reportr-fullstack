import React from 'react';
import { IReport } from '../interfaces/ReportData';
import api from '../utils/api';
import { BsTrash } from 'react-icons/bs';
import Loader from './Loader';
import { useToken } from '../contexts/TokenContext';

const ReportPage = () => {
  const [reports, setReports] = React.useState<IReport[]>([] as IReport[]);
  const [isReportsLoading, setIsReportsLoading] = React.useState<boolean>(true);

  const tokenContext = useToken();

  React.useEffect(() => {
    api
      .getCurrentUserReports(tokenContext!.token)
      .then((res) => {
        if (res) {
          setReports(res);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReportsLoading(false);
      });
  }, []);

  const handleDeleteClick = (id: string) => {
    api
      .deleteReport(tokenContext!.token, id)
      .then((res) => {
        if (res) {
          setReports(reports.filter((report) => report._id !== id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isReportsLoading) {
    return <Loader />;
  }

  return (
    <section className="reports">
      <h1 className="reports__title">Your Reports</h1>
      {reports.length > 0 ? (
        <ul className="reports__list">
          {reports.map((report) => (
            <li key={report._id} className="reports__list-item">
              <div className="reports__list-item-text">
                <h2 className="reports__report-title">{report.text}</h2>
                <p className="reports__subordinate-info">
                  Submitted By: {report.employeeId.firstName}{' '}
                  {report.employeeId.lastName} on {report.date}
                </p>
              </div>
              <BsTrash
                className="reports__delete-icon"
                onClick={() => handleDeleteClick(report._id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no reports submitted to you.</p>
      )}
    </section>
  );
};

export default ReportPage;

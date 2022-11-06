import ProfileInfo from './ProfileInfo';
import ProfileSubordinates from './ProfileSubordinates';
import ProfileTasks from './ProfileTasks';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { IEmployee, ISubordinate } from '../interfaces/EmployeeData';
import api from '../../src/utils/api';
import { usePopups } from '../contexts/PopupsContext';
import { useAuth } from '../contexts/AuthContext';
import { useToken } from '../contexts/TokenContext';
import Loader from './Loader';

const EmployeeSinglePage = () => {
  const authContext = useAuth();
  const tokenContext = useToken();

  //param
  const { id } = useParams<{ id: string }>();

  const popupsContext = usePopups();

  //state
  const [employee, setEmployee] = useState<IEmployee | undefined>(
    {} as IEmployee
  );
  const [subordinates, setSubordinates] = useState<ISubordinate[]>([]);

  const [isMyPage, setIsMyPage] = useState<boolean>(false);

  const [isEmployeeLoading, setIsEmployeeLoading] = useState<boolean>(true);

  // if id is the same as the logged in user's id, then it's my page
  useEffect(() => {
    id === authContext!.userData._id ? setIsMyPage(true) : setIsMyPage(false);
  }, [id, authContext!.userData._id]);

  useEffect(() => {
    //api call to find specific employee
    api
      .getEmployee(tokenContext!.token, id)
      .then((res) => {
        res && setEmployee(res.employeeInfo);
        res.managerialInfo &&
          setSubordinates(res.managerialInfo.mySubordinates);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEmployeeLoading(false);
      });
  }, [id]);

  const handleReportButtonClick = () => {
    popupsContext!.handleReportPopupOpen();

    const managerId = employee?.managerId?._id;
    if (managerId) {
      popupsContext!.setReportingToManager(managerId);
    }
  };

  const handleTaskButtonClick = (subordinate: ISubordinate) => {
    popupsContext!.handleTaskPopupOpen();

    const employeeId = subordinate?._id;
    if (employeeId) {
      popupsContext!.setAssigningTaskToEmployee(employeeId);
    }
  };

  if (isEmployeeLoading) {
    return <Loader />;
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <ProfileInfo
          employee={employee}
          isMyPage={isMyPage}
          handleReportButtonClick={handleReportButtonClick}
        />

        <ProfileTasks employee={employee} />

        {subordinates.length !== 0 && (
          <ProfileSubordinates
            subordinates={subordinates}
            isMyPage={isMyPage}
            handleTaskButtonClick={handleTaskButtonClick}
          />
        )}
      </div>
    </section>
  );
};

export default EmployeeSinglePage;

import React from 'react';
import { IEmployee } from '../interfaces/EmployeeData';

interface Props {
  employee?: IEmployee;
  isMyPage: boolean;
  handleReportButtonClick: () => void;
}

export default function ProfileInfo({
  employee,
  isMyPage,
  handleReportButtonClick,
}: Props) {
  return (
    <section className="profile__info">
      <div
        className="profile__image"
        style={{
          backgroundImage: `url(${employee?.picture})`,
        }}></div>
      <div className="profile__info-text-container">
        <h1 className="profile__title">
          Name: {`${employee?.firstName} ${employee?.lastName}`}
        </h1>
        <p className="profile__info-text profile__info-text_type_position">
          Position: {employee?.position}
        </p>

        <div className="profile__info-divider"></div>

        {employee?.managerId && (
          <p className="profile__info-text profile__info-text_type_manager">
            <span>
              Manager:{' '}
              {`${employee?.managerId.firstName} ${employee?.managerId.lastName}`}{' '}
            </span>
            <button
              disabled={!isMyPage}
              onClick={handleReportButtonClick}
              className={`profile__report-btn ${
                !isMyPage ? 'profile__report-btn_disabled' : null
              }`}>
              Report
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

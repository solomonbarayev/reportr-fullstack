import React from 'react';
import { ISubordinate } from '../interfaces/EmployeeData';

interface Props {
  subordinates: ISubordinate[];
  handleTaskButtonClick: (subordinate: ISubordinate) => void;
  isMyPage: boolean;
}

export default function ProfileSubordinates({
  subordinates,
  isMyPage,
  handleTaskButtonClick,
}: Props) {
  return (
    <section className="profile__subordinates">
      <div className="profile__header-container">
        <h2 className="profile__subordinates-title">My Subordinates</h2>
        <div className="profile__header-divider"></div>
      </div>
      <ul className="profile__subordinates-list">
        {subordinates.map((subordinate: ISubordinate) => (
          <li key={subordinate._id} className="profile__subordinates-list-item">
            <div className="profile__subordiantes_container">
              <span className="profile__subordinates-name">
                Name: {subordinate.firstName} {subordinate.lastName}
              </span>
              <span className="profile__subordinates-position">
                Position: {subordinate.position}
              </span>
              <button
                disabled={!isMyPage}
                onClick={() => handleTaskButtonClick(subordinate)}
                className={`profile__task-btn ${
                  !isMyPage ? 'profile__task-btn_disabled' : null
                }`}>
                Assign Task
              </button>
            </div>
            <div className="profile__subordinates-divider"></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

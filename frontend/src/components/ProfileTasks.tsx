import React from 'react';
import { IEmployee } from '../interfaces/EmployeeData';

export default function ProfileTasks({ employee }: { employee?: IEmployee }) {
  return (
    <section className="profile__tasks">
      <div className="profile__header-container">
        <h2 className="profile__tasks-title">My Tasks</h2>
        <div className="profile__header-divider"></div>
      </div>
      {employee?.myTasks?.length !== 0 ? (
        <ul className="profile__tasks-list">
          {employee?.myTasks?.map((task) => (
            <li key={task._id} className="profile__tasks-item">
              <p className="profile__tasks-text">- {task.title}</p>
              <p className="profile__tasks-text">Deadline: {task.dueDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="profile__tasks-text_no-tasks">No tasks assign to you</p>
      )}
    </section>
  );
}

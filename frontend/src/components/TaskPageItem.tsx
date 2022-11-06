import React from 'react';
import { ITask } from '../interfaces/TaskData';
import { AiOutlineCheckSquare } from 'react-icons/ai';

interface Props {
  task: ITask;
  handleCompleteTask: (id: string) => void;
}

export default function TaskPageItem({ handleCompleteTask, task }: Props) {
  return (
    <li key={task._id} className="tasks__item">
      <h2 className="tasks__task-title">
        <span>Task: {task.title}</span>
        <span>Due date: {task.dueDate}</span>
      </h2>
      <AiOutlineCheckSquare
        className="tasks__complete-icon"
        onClick={() => handleCompleteTask(task._id)}
      />
    </li>
  );
}

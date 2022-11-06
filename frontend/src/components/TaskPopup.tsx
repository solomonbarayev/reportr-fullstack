import React from 'react';
import PopupWithForm from './PopupWithForm';
import { usePopups } from '../contexts/PopupsContext';

interface Props {
  name: string;
}

const TaskPopup = ({ name }: Props) => {
  const [taskName, setTaskName] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');

  const popupsContext = usePopups();

  const handleTaskNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(evt.target.value);
  };

  const handleDueDateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(evt.target.value);
  };

  const handleClosePopup = () => {
    popupsContext!.closeAllPopups();
    setTaskName('');
    setDueDate('');
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    popupsContext!.handleTaskFormSubmit(taskName, dueDate);
    setTaskName('');
    setDueDate('');
  };

  return (
    <PopupWithForm
      isOpen={popupsContext!.isTaskPopupOpen}
      name={name}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      title="Add Task"
      submitButtonText="Add Task">
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            className="form__input form__input_type_task-name"
            id="task-name"
            type="text"
            name="task-name"
            placeholder="Task Name"
            required
            minLength={2}
            value={taskName || ''}
            onChange={handleTaskNameChange}
          />
          <span className="form__input-error" id="task-name-error" />
        </div>
        <div className="form__input-container">
          <input
            className="form__input form__input_type_due-date"
            id="due-date"
            type="date"
            name="due-date"
            placeholder="Due Date"
            required
            value={dueDate || ''}
            onChange={handleDueDateChange}
          />
          <span className="form__input-error" id="due-date-error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default TaskPopup;

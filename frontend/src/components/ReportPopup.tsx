import React from 'react';
import PopupWithForm from './PopupWithForm';
import { usePopups } from '../contexts/PopupsContext';

interface Props {
  name: string;
}

const ReportPopup = ({ name }: Props) => {
  const [reportText, setReportText] = React.useState('');
  const [reportDate, setReportDate] = React.useState('');

  const popupsContext = usePopups();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    popupsContext!.handleReportFormSubmit(reportText, reportDate);
    setReportText('');
    setReportDate('');
  };

  const handleClose = () => {
    popupsContext!.closeAllPopups();
    setReportText('');
    setReportDate('');
  };

  return (
    <PopupWithForm
      isOpen={popupsContext!.isReportPopupOpen}
      name={name}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Add Report"
      submitButtonText="Add Report">
      <fieldset className="form__fieldset">
        <div className="form__input-container">
          <input
            className="form__input form__input_type_report-text"
            id="report-text"
            type="text"
            name="report-text"
            placeholder="Report Text"
            required
            minLength={2}
            value={reportText || ''}
            onChange={(evt) => setReportText(evt.target.value)}
          />
          <span className="form__input-error" id="report-text-error" />
        </div>
        <div className="form__input-container">
          <input
            className="form__input form__input_type_report-date"
            id="report-date"
            type="date"
            name="report-date"
            placeholder="Due Date"
            required
            value={reportDate || ''}
            onChange={(evt) => setReportDate(evt.target.value)}
          />
          <span className="form__input-error" id="report-date-error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
};

export default ReportPopup;

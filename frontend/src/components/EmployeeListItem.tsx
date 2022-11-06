import { Link } from 'react-router-dom';
import { IEmployee } from '../interfaces/EmployeeData';
import { AiOutlineUser } from 'react-icons/ai';

interface Props {
  employee: IEmployee;
}

const EmployeeListItem = ({ employee }: Props) => {
  return (
    <li className="employees__list-item">
      <div className="employees__list-item-container">
        <div className="employees__list-item-content">
          <div
            style={{
              backgroundImage: `url(${employee.picture})`,
            }}
            className="employees__list-item-image"></div>
          <div className="employees__list-item-info">
            <p className="employees__text employees__text_type_name">
              <span className="employees__text_bold">Name:</span>{' '}
              {`${employee.firstName} ${employee.lastName}`}
            </p>
            <p className="employees__text employees__text_type_position">
              <span className="employees__text_bold">Position:</span>{' '}
              {employee.position}
            </p>
          </div>
        </div>
        <Link
          to={`/employee/${employee._id}`}
          className="employees__view-btn-link">
          <button className="btn employees__view-btn">
            <AiOutlineUser className="employees__view-icon" />
            <span className="employees__view-btn-text">View</span>
          </button>
        </Link>
      </div>
    </li>
  );
};

export default EmployeeListItem;

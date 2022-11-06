import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeSinglePage from './components/EmployeeSinglePage';
import Header from './components/Header';
import TasksPage from './components/TasksPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import ReportPage from './components/ReportPage';
import TaskPopup from './components/TaskPopup';
import ReportPopup from './components/ReportPopup';
import AuthStatusPopup from './components/AuthStatusPopup';
import { usePopups } from './contexts/PopupsContext';

const App: React.FC = () => {
  const popupsContext = usePopups();
  return (
    <div className="App">
      <Header />

      <Switch>
        <ProtectedRoute path="/" exact>
          <EmployeeList />
        </ProtectedRoute>

        <ProtectedRoute path="/employee/:id">
          <EmployeeSinglePage />
        </ProtectedRoute>

        <ProtectedRoute path="/mytasks">
          <TasksPage />
        </ProtectedRoute>

        <ProtectedRoute path="/myreports">
          <ReportPage />
        </ProtectedRoute>

        <Route path="/signin">
          <SignIn />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        {/* route for non existent to redirect home */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

      <TaskPopup name="task-popup" />
      <ReportPopup name="report-popup" />
      <AuthStatusPopup type={popupsContext!.authStatus} />
    </div>
  );
};

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default PrivateRoute;
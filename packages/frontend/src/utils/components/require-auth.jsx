import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';

import { authAtom } from 'src/state/authState';


export const RequireAuth = ({ children, redirectTo }) => {
  const token = useRecoilValue(authAtom);
  const isAuthenticated = !!token // getAuth(); // Implement getAuth() to check user authentication status
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired
};
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';


export const RequireAuth = ({ children, redirectTo }) => {
  const isAuthenticated = true // getAuth(); // Implement getAuth() to check user authentication status
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired
};
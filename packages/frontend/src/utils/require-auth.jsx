import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';


export const RequireAuth = ({ children, redirectTo }) => {
  const isAuthenticated = false // getAuth(); // Implement getAuth() to check user authentication status
  console.timeLog(isAuthenticated)
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired
};
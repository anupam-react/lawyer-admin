import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  // Check if the user is authenticated. You might retrieve this information from a state management solution like Redux, context API, or from browser storage like localStorage or sessionStorage.
 const isAuthenticated = localStorage.getItem("accessToken"); // Example: Retrieve authentication token from localStorage

  // You can adjust your authentication logic based on your application requirements.
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
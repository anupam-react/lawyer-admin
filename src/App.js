import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login/Login";
// import PrivateRoute from "../src/utlis/PrivateRoute";
import Dashboard from "../src/Pages/Dashboard";
import Lawyers from "../src/Pages/Lawyers";
import Totalusers from "../src/Pages/Totalusers";
import Cases from "../src/Pages/Cases";
import Department from "../src/Pages/Department";
import Notification from "../src/Pages/Notification";
import Meeting from "../src/Pages/Meeting";
import Booking from "../src/Pages/Booking";
import Services from "../src/Pages/Services";
import Banners from "../src/Pages/Banners";
import Allfiles from "../src/Pages/Allfiles";
import Todolist from "../src/Pages/Todolist";
import Permissions from "../src/Pages/Permissions";
import Messages from "../src/Pages/Messages";
import Layout from "../src/Layout/Layout";
import PrivateRoute from "../src/utlis/PrivateRoute";
import Complaint from "./Pages/Complaint";
import History from "./Pages/History";
import Register from "./Register/Register";
import Forgot from "./Forgot/Forgot";
import Email from "./Forgot/Email";
import Otp from "./Forgot/Otp";
import ProfileDatails from "./Pages/ProfileDatails";
import Privacy from "./Pages/Privacy";
import City from "./Pages/City";
import CaseManager from "./Pages/CaseManager";
import BlogCategory from "./Pages/BlogCategory";
import Blog from "./Pages/Blog";
import WhyUserLove from "./Pages/WhyUserLove";
import TrustBy from "./Pages/TrustBy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/email",
    element: <Email />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <PrivateRoute element={<Dashboard />} /> },
      { path: "/Lawyers", element: <PrivateRoute element={<Lawyers />} /> },
      { path: "/profile", element: <PrivateRoute element={<ProfileDatails />} /> },
      {
        path: "/totalusers",
        element: <PrivateRoute element={<Totalusers />} />,
      },
      { path: "/cases", element: <PrivateRoute element={<Cases />} /> },
    
      {
        path: "/department",
        element: <PrivateRoute element={<Department />} />,
      },
      {
        path: "/notification",
        element: <PrivateRoute element={<Notification />} />,
      },
      { path: "/meeting", element: <PrivateRoute element={<Meeting />} /> },
      { path: "/Booking", element: <PrivateRoute element={<Booking />} /> },
      { path: "/services", element: <PrivateRoute element={<Services />} /> },
      { path: "/city", element: <PrivateRoute element={<City />} /> },
      { path: "/casemanager", element: <PrivateRoute element={<CaseManager />} /> },
      { path: "/banners", element: <PrivateRoute element={<Banners />} /> },
      { path: "/blog-category", element: <PrivateRoute element={<BlogCategory />} /> },
      { path: "/blog", element: <PrivateRoute element={<Blog />} /> },
      { path: "/whyuserlove", element: <PrivateRoute element={<WhyUserLove />} /> },
      { path: "/trustby", element: <PrivateRoute element={<TrustBy />} /> },
      { path: "/allfiles", element: <PrivateRoute element={<Allfiles />} /> },
      { path: "/todolist", element: <PrivateRoute element={<Todolist />} /> },
      {
        path: "/Permissions",
        element: <PrivateRoute element={<Permissions />} />,
      },
      { path: "/Messages", element: <PrivateRoute element={<Messages />} /> },
      { path: "/Complaint", element: <PrivateRoute element={<Complaint />} /> },
      { path: "/privacy", element: <PrivateRoute element={<Privacy />} /> },
      { path: "/History", element: <PrivateRoute element={<History />} /> },
    ],
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

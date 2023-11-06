import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import useFetch from "../../../../hooks/fetch.hook";

const Sidebar = () => {
  const [{ isLoading, apiData, serverError }] = useFetch();

  if (isLoading) {
    return <h1 className='text-2xl font-bold'>Loading...</h1>;
  }

  if (serverError) {
    return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin : {apiData?.username || ''}</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>

          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>Quizes</span>
            </li>
          </Link>

          <p className="title">USER INTERFACE</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <ManageAccountsOutlinedIcon className="icon" />
            <span>My Profile</span>
          </li>
          </Link>
          <li>
          
            <CalendarMonthOutlinedIcon className="icon" />
            <span>Calendar</span>
          </li>

          <li>
            <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

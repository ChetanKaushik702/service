import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../logo.svg";
import { logout } from "../../actions/userAction";
import "./header.css";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img className="navbar-logo" src={logo} alt="" />
          ServiceFare
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {!isAuthenticated && (
              <li className="nav-item">
                <a className="nav-link" href="/forgotpassword">
                  Forgot Password
                </a>
              </li>
            )}
          </ul>
          {isAuthenticated ? (
            <div className="nav-user">
              <span className="nav-greeting">Hi, {user && user.name}</span>
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <a href="/register">
                <button className="btn btn-outline-success my-2 my-sm-0" type="button">
                  <img
                    className="login"
                    alt="..."
                    src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-sign-up-call-to-action-bearicons-outline-color-bearicons-1.png"
                  />
                  Register
                </button>
              </a>
              <div>
                <a href="/login">
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="login"
                      src="https://img.icons8.com/fluency/64/000000/login-rounded-right.png"
                    />
                    Login
                  </button>
                </a>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import logo from "../../src/images/mentorzoom.png";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);
  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} method="POST">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}>
          <img
            className="text-uppercase text-center mb-0"
            src={logo}
            alt={logo}
            style={{ width: "50%", height: "50%" }}
          />
        </div>
        {/* {/* <h3
          className="text-uppercase text-center mb-0"
          style={{ color: "Crimson" }}>
          AURA CAPITAL
        </h3> */}
        {/* <h5 className=" text-center mb-4 text-warning">MentorZoom</h5> */}
        <div className="form-group">
          <label
            htmlFor="exampleInputEmail1"
            className="text-light font-weight-bold">
            Email*
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Nhập email"
            onChange={handleChangeInput}
            name="email"
            value={email}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="exampleInputPassword1"
            className="text-light font-weight-bold">
            Mật khẩu*
          </label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              placeholder="Nhập mật khẩu"
              name="password"
              value={password}
              autoComplete="off"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? (
                <span className="material-icons text-light">
                  visibility_off
                </span>
              ) : (
                <span className="material-icons text-light">visibility</span>
              )}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn w-100 font-weight-bold"
          disabled={email && password ? false : true}>
          Đăng nhập
        </button>
        <p className="my-2 text-light font-weight-bold">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" style={{ color: "yellow", fontWeight: "bold" }}>
            Đăng kí ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

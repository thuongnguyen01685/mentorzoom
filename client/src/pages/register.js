import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginFostech, register } from "../redux/actions/authAction";
import logo from "../../src/images/mentorzoom.png";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };

  // const initialState = {
  //   fullname: "",
  //   username: "",
  //   email: "",
  //   password: "",
  //   gender: "male",
  // };

  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password, gender } = userData;

  // const { email, password, fullname } = userData;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const dispatch = useDispatch();

  //console.log(userData);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginFostech(email, password, fullname));
    dispatch(register(userData));
  };
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  return (
    <div className="auth_pageRE">
      <form onSubmit={handleSubmit} method="POST">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            className="text-uppercase text-center mb-0"
            src={logo}
            alt={logo}
            style={{ width: "30%", height: "40%" }}
          />
        </div>
        <h6
          className="text-uppercase text-center mb-4"
          style={{ color: "#ffffff", marginTop: "10px" }}>
          Đăng kí tài khoản
        </h6>

        <div className="form-group">
          <label
            htmlFor="fullname"
            className="text-light
font-weight-bold">
            Họ và tên*
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            onChange={handleChangeInput}
            name="fullname"
            value={fullname}
            style={{ background: `${alert.fullname ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
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
              onChange={handleChangeInput}
              name="email"
              value={email}
              style={{
                background: `${alert.email ? "#fd2d6a14" : ""}`,
              }}
            />
            <small className="form-text text-danger">
              {alert.email ? alert.email : ""}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="text-light font-weight-bold">
              User Name*
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={handleChangeInput}
              name="username"
              value={username.toLocaleLowerCase().replace(/ /g, "")}
              style={{ background: `${alert.username ? "#fd2d6a14" : ""}` }}
            />
            <small className="form-text text-danger">
              {alert.username ? alert.username : ""}
            </small>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
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
                name="password"
                value={password}
                style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
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
            <small className="form-text text-warning">
              {alert.password ? alert.password : ""}
            </small>
          </div>

          <div className="form-group">
            <label
              htmlFor="cf_password"
              className="text-light
font-weight-bold">
              Xác nhận mật khẩu
            </label>
            <div className="pass">
              <input
                type={typeCfPass ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChangeInput}
                name="cf_password"
                value={cf_password}
                style={{
                  background: `${alert.cf_password ? "#fd2d6a14" : ""}`,
                }}
              />
              <small onClick={() => setTypeCfPass(!typeCfPass)}>
                {typeCfPass ? (
                  <span className="material-icons ">visibility_off</span>
                ) : (
                  <span className="material-icons text-light">visibility</span>
                )}
              </small>
            </div>
            <small className="form-text text-light">
              {alert.cf_password ? alert.cf_password : ""}
            </small>
          </div>
        </div>
        {/* <div className="row justify-content-between mx-0 mb-1">
          <label
            htmlFor="male"
            className="text-light
font-weight-bold">
            Nam:
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label
            htmlFor="female"
            className="text-light
font-weight-bold">
            Nữ:
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
          <label
            htmlFor="other"
            className="text-light
font-weight-bold">
            Khác:
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div> */}
        <button
          type="submit"
          className="btn w-100 text-light font-weight-bold"
          disabled={email && password ? false : true}>
          Đăng kí
        </button>
        <p className="my-2 text-light font-weight-bold">
          Đã có tài khoản?{""}
          <Link to="/" style={{ color: "yellow", fontWeight: "bold" }}>
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

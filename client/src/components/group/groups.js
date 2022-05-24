import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addGroup,
  deleteZoom,
  getGroups,
  GROUP_TYPES,
} from "../../redux/actions/groupAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Box from "./box";

const Groups = () => {
  const { auth, Groups } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(
  //   Groups.getGroup
  //     .filter((items) => items.user_zoom.filter((i) => i === auth.user.email))
  //     .map((item) => item)
  // );
  let temp = [];
  Groups.getGroup.map((i) => {
    if (i.user_zoom.includes(auth.user.email) === true) {
      temp.push(i);
    }
  });

  const handleInZoom = (id) => {
    Groups.getGroup
      .filter((items) => items._id === id)
      .map((item) =>
        dispatch(
          addGroup({ auth, nameGroup: item.ten_zoom, maZoom: item.ma_zoom })
        )
      );
    Groups.getGroup
      .filter((items) => items._id === id)
      .map((item) =>
        dispatch({
          type: GROUP_TYPES.DE_GROUP,
          payload: { nameGroup: item.ten_zoom, maZoom: item.ma_zoom },
        })
      );
    Groups.getGroup
      .filter((items) => items._id === id)
      .map((item) => localStorage.setItem("@ma_zoom", item.ma_zoom));
  };
  const token = localStorage.getItem("@token_key");

  //Delete zoom
  const handleDeleteZoom = async (id) => {
    await dispatch(deleteZoom(id));
    dispatch(getGroups(token));
  };

  //Edit zoom
  const handleEditZoom = async (id) => {
    dispatch({ type: GLOBALTYPES.STATUSZOOM, payload: true });

    await Groups.getGroup
      .filter((items) => items._id === id)
      .map((item) =>
        dispatch({
          type: GROUP_TYPES.DE_GROUP,
          payload: {
            id: item._id,
            nameGroup: item.ten_zoom,
            maZoom: item.ma_zoom,
            user_zoom: item.user_zoom,
          },
        })
      );
  };

  return (
    <div className="d-flex ml-2 flex_box">
      <Box />
      {Groups.getGroup !== null &&
        temp.map((item) => (
          <div className="card" style={{ width: "18rem" }} key={item._id}>
            <div className="color mt-0 p-3 bg-info text-center">
              {" "}
              <text className="text-white ">{item.ten_zoom}</text>
              <div className="nav-item dropdown">
                <span
                  className="material-icons text-light"
                  id="moreLink"
                  data-toggle="dropdown"
                  style={{ cursor: "pointer" }}>
                  more_horiz
                </span>
                <div className="dropdown-menu">
                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditZoom(item._id)}>
                    <span className="material-icons">create</span>
                    Sửa tên nhóm
                  </div>
                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteZoom(item._id)}>
                    <span className="material-icons">delete_outline</span>
                    Xoá nhóm
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body text-center">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Mã nhóm: {item.ma_zoom}
              </label>
              <br />
              <Link to="/home">
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={() => handleInZoom(item._id)}>
                  Vào nhóm
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Groups;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import {
  addGroup,
  editGroup,
  getGroups,
} from "../../redux/actions/groupAction";

const Box = () => {
  const { auth, Groups, statusZoom, ListUserF } = useSelector((state) => state);
  const [nameGroup, setNameGroup] = useState("");
  const [maZoom, setMaZoom] = useState("");
  const [arrayUser, setArrayUser] = useState([]);
  const dispatch = useDispatch();

  const userOption = ListUserF.userFostech.map((opt) => ({
    label: opt,
    value: opt,
  }));

  // console.log(userOption);
  const userFostech = arrayUser.map((item) => item.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (statusZoom) {
      // await dispatch(editGroup(Groups.deGroup.id, { nameGroup, maZoom }));
      // dispatch(getGroups(token));
      dispatch({ type: GLOBALTYPES.STATUSZOOM, payload: false });
    } else {
      await dispatch(addGroup({ auth, nameGroup, maZoom, userFostech }));
      setNameGroup("");
      setMaZoom("");
      setArrayUser([]);
      dispatch(getGroups(auth.token));
    }
  };
  const handleCancel = () => {
    dispatch({ type: GLOBALTYPES.STATUSZOOM, payload: false });
  };
  useEffect(() => {
    if (statusZoom === true) {
      setNameGroup(Groups.deGroup.nameGroup);
      setMaZoom(Groups.deGroup.maZoom);
      //setArrayUser(Groups.deGroup.user_zoom);
    } else {
      setNameGroup("");
      setMaZoom("");
    }
  }, [statusZoom]);

  return (
    <div
      className="card d-flex"
      style={{ width: "18rem", justifyContent: "center" }}>
      <div className="color mt-0 p-3 bg-info text-light">
        {statusZoom ? "Chỉnh sửa" : "Tạo nhóm"}
      </div>

      <div className="card-body">
        {/* <label htmlFor="exampleFormControlInput1" className="form-label">
          Tên nhóm
        </label> */}

        <input
          className="form-control"
          type="text"
          placeholder="Tên nhóm"
          value={nameGroup}
          onChange={(e) => setNameGroup(e.target.value)}
        />
        <input
          className="form-control mt-1"
          type="text"
          placeholder="Mã nhóm"
          value={maZoom}
          onChange={(e) => setMaZoom(e.target.value)}
        />
        <Select
          //defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          name="colors"
          options={userOption}
          className="basic-multi-select mt-1"
          classNamePrefix="select"
          onChange={(opt) => setArrayUser(opt)}
        />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={handleSubmit} type="button" className="btn  mt-2">
            {statusZoom ? "Sửa thông tin" : "Thêm"}
          </button>
          {statusZoom && (
            <button onClick={handleCancel} type="button" className="btn  mt-2">
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;

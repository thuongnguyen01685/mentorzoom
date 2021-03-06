import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useEffect } from "react";
import { updateProfileUser } from "../../redux/actions/profileAction";

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, setAvatar] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });
    setAvatar(file);
  };
  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
    setOnEdit(false);
  };
  return (
    <div className="edit_profile">
      <button className="btn  btn_close" onClick={() => setOnEdit(false)}>
        Đóng
      </button>
      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Thay đổi</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className="form_group">
          <label htmlFor="fullname" className="text-light">
            Họ và tên
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50px",
                right: "5px",
                transform: "translateY(-50%)",
              }}></small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mobile" className="text-light">
            Số điện thoại
          </label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="text-light">
            Địa Chỉ
          </label>
          <input
            type="text"
            name="address"
            value={address}
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website" className="text-light">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={website}
            className="form-control"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="story" className="text-light">
            Story
          </label>
          <textarea
            cols="30"
            rows="4"
            name="story"
            value={story}
            className="form-control"
            onChange={handleInput}
          />
          <small className="text-danger d-block text-right">
            {story.length}/200
          </small>
        </div>
        {/* <label htmlFor="gender">Gender</label> */}
        {/* <div className="input-group-prepend px-0 mb-4">
          <select
            name="gender"
            id="gender"
            value={gender}
            className="custom-select text-capitalize"
            onChange={handleInput}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div> */}
        <button className="btn btn-outline w-100" type="submit">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "../profile/FollowBtn";
import LoadIcon from "../../images/loading.gif";
import { getSuggestions } from "../../redux/actions/suggestionAction";

const RightSidebar = () => {
  const { auth, suggestions, Groups } = useSelector((state) => state);
  const dispatch = useDispatch();

  const maZoom = localStorage.getItem("@ma_zoom");

  //const group = Groups.getGroup.filter((items) => items.maZoom === maZoom);

  let temp = [];

  suggestions.users.map((item) => {
    let temp2 = Groups.getGroup
      .filter((items) => items.maZoom === maZoom)
      .map((item) => item.ArrayUser);

    if (temp2 !== []) {
      if (!temp2[0]) {
        temp2[0] = [];
      }
      if (temp2[0].includes(item.email) == true) {
        temp.push(item);
      } else {
        return temp;
      }
    }
  });

  return (
    <div className="my-4">
      <UserCard user={auth.user} />
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-danger">Đề xuất cho bạn</h5>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>
      {suggestions.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {temp.map((user) => (
            <UserCard user={user} key={user._id}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;

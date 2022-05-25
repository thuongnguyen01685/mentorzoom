import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Box from "../components/group/box";
import Groups from "../components/group/groups";
import { getGroups } from "../redux/actions/groupAction";

const Group = () => {
  const dispatch = useDispatch();
  const { auth, groups } = useSelector((state) => state);

  const token = localStorage.getItem("@token_key");

  useEffect(() => {
    if (auth.token) {
      dispatch(getGroups({ token }));
    }
  }, [auth.token, dispatch, auth]);
  return (
    <div>
      <Groups />
    </div>
  );
};

export default Group;

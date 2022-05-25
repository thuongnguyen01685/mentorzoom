import React, { useEffect } from "react";
import { useState } from "react";
import { getDataAPI } from "../../utils/fetchData";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      getDataAPI(`search?fullname=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg },
          });
        });
    } else {
      setUsers([]);
    }
  }, [search, auth.token, dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataAPI(`search?fullname=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        name="search"
        type="text"
        value={search}
        id="search"
        title="Tìm kiếm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>Tìm kiếm</span>
      </div>
      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}>
        &times;
      </div>
      <button type="submit" style={{ display: "none" }}>
        Search
      </button>
      {load && <img className="loading" src={LoadIcon} alt="loading" />}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;

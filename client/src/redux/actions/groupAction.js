import {
  deleteDataAPI,
  deleteDataFostech,
  editDataFostech,
  getDataAPI,
  getDataFostech,
  postDataAPI,
  postDataFostech,
} from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const GROUP_TYPES = {
  ADD_GROUP: "ADD_GROUP",
  GET_GROUP: "GET_GROUP",
  UPDATE_GROUP: "UPDATE_GROUP",
  DE_GROUP: "DE_GROUP",
  DELETE_GROUP: "DELETE_GROUP",
};

export const addGroup =
  ({ auth, nameGroup, maZoom, userFostech }) =>
  async (dispatch) => {
    try {
      const userJoin = [];
      userJoin.push(auth.user.email, ...userFostech);
      // console.log(userJoin);
      // console.log({ auth, nameGroup, maZoom });
      const res = await postDataAPI(
        "groups",
        {
          nameGroup: nameGroup,
          maZoom: maZoom,
          user: auth.user.fullname,
          ArrayUser: userJoin,
        },
        auth.token
      );
      dispatch({ type: GROUP_TYPES.ADD_GROUP, payload: res.data });
    } catch (error) {
      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: { error: error.response.data.msg },
      // });
    }
  };
export const getGroups = (token) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: true },
    });
    const res = await getDataAPI("groups", token);
    dispatch({ type: GROUP_TYPES.GET_GROUP, payload: res.data.groups });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { loading: false },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.reponse.data.msg },
    });
    // console.log(error);
  }
};

export const editGroup = (id, post) => async (dispatch) => {
  // try {
  //   const contentEdit = {
  //     ten_zoom: post.nameGroup,
  //     ma_zoom: post.maZoom,
  //   };
  //   await editDataFostech("mentorzoom", id, contentEdit);
  // } catch (error) {
  //   console.log(error);
  // }
};

export const deleteGroup =
  ({ id, auth, item }) =>
  async (dispatch) => {
    dispatch({ type: GROUP_TYPES.DELETE_GROUP, payload: item });

    try {
      const res = await deleteDataAPI(`group/${id}`, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

import {
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
};

export const addGroup =
  ({ auth, nameGroup, maZoom, userFostech, token }) =>
  async (dispatch) => {
    try {
      const userJoin = [];
      userJoin.push(auth.user.email, ...userFostech);
      console.log(userJoin);
      // console.log({ auth, nameGroup, maZoom });
      const res = await postDataFostech("mentorzoom", token, {
        ten_zoom: nameGroup,
        ma_zoom: maZoom,
        ten_kh: auth.user.fullname,
        user_zoom: userJoin,
      });

      dispatch({ type: GROUP_TYPES.ADD_GROUP, payload: res.data });
    } catch (error) {
      // dispatch({
      //   type: GLOBALTYPES.ALERT,
      //   payload: { error: error.response.data.msg },
      // });
      console.log(error);
    }
  };
export const getGroups = (token) => async (dispatch) => {
  try {
    // console.log(token);
    const res = await getDataFostech("mentorzoom", token);
    // console.log(res);
    dispatch({ type: GROUP_TYPES.GET_GROUP, payload: res.data });
  } catch (error) {
    // dispatch({
    //   type: GLOBALTYPES.ALERT,
    //   payload: { error: error.reponse.data.msg },
    // });
    console.log(error);
  }
};

export const editGroup = (id, post) => async (dispatch) => {
  try {
    const contentEdit = {
      ten_zoom: post.nameGroup,
      ma_zoom: post.maZoom,
    };

    await editDataFostech("mentorzoom", id, contentEdit);
  } catch (error) {
    console.log(error);
  }
};

export const deleteZoom = (id) => async (dispatch) => {
  try {
    await deleteDataFostech("mentorzoom", id);
  } catch (error) {
    console.log(error);
  }
};

import getLogin, {
  getDataFostech,
  getInfo,
  postDataAPI,
} from "../../utils/fetchData";
import valid from "../../utils/valid";
import { GLOBALTYPES } from "./globalTypes";
import { Buffer } from "buffer";

export const PROFILE_TYPES = {
  GET_PROFILE: "GET_PROFILE",
  GET_USERFOSTECH: "GET_USERFOSTECH",
};

export const login = (username, password) => {
  var credentials = Buffer.from(username + ":" + password).toString("base64");
  var basicAuth = "Basic " + credentials;
  const email = username;

  const add = async (dispatch) => {
    try {
      const res = await getLogin(`auth/local`, "GET", "", {
        Authorization: basicAuth,
      });
      if (res.data) {
        const jsonToken = res.data.token;
        await localStorage.setItem("@token_key", jsonToken);

        const token = localStorage.getItem("@token_key");
        dispatch({
          type: GLOBALTYPES.AUTH_FOSTECH,
          payload: jsonToken,
        });
        // const id_app = await getDataAPI("app", jsonToken);

        // dispatch({
        //   type: GLOBALTYPES.ID_APP,
        //   payload: id_app.data[0],
        // });

        //get properties in profile
        // const profile = await getInfo("profile", token);
        // dispatch({
        //   type: PROFILE_TYPES.GET_PROFILE,
        //   payload: profile.data,
        // });
      }
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const ress = await postDataAPI("login", { email, password });
      localStorage.setItem("firstLogin", true);

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: ress.data.access_token,
          user: ress.data.user,
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: ress.data.msg,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return add;
};

// export const login = (data) => async (dispatch) => {
//   try {
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
//     const res = await postDataAPI("login", data);
//     localStorage.setItem("firstLogin", true);

//     dispatch({
//       type: GLOBALTYPES.AUTH,
//       payload: {
//         token: res.data.access_token,
//         user: res.data.user,
//       },
//     });

//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         success: res.data.msg,
//       },
//     });
//   } catch (error) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: error.response.data.msg,
//       },
//     });
//   }
// };

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  const token = localStorage.getItem("@token_key");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBALTYPES.AUTH_FOSTECH, payload: token });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("register", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("@token_key");
    localStorage.removeItem("@ma_zoom");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const loginFostech = (username, password, fullname) => {
  const email = username;
  var credentials = Buffer.from(username + ":" + password).toString("base64");
  var basicAuth = "Basic " + credentials;

  const add = async (dispatch) => {
    try {
      const res = await getLogin(`auth/local`, "GET", "", {
        Authorization: basicAuth,
      });
      if (res.data) {
        const jsonToken = res.data.token;
        await localStorage.setItem("@token_key", jsonToken);

        dispatch({
          type: GLOBALTYPES.AUTH_FOSTECH,
          payload: jsonToken,
        });

        const check = valid({ email, password, fullname });
        if (check.errLength > 0)
          return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
        try {
          dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
          const res = await postDataAPI("register", {
            email,
            password,
            fullname,
          });
          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              token: res.data.access_token,
              user: res.data.user,
            },
          });
          localStorage.setItem("firstLogin", true);
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
              success: res.data.msg,
            },
          });
        } catch (error) {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
              error: error.response.data.msg,
            },
          });
        }

        //const id_app = await getDataAPI("app", jsonToken);

        // dispatch({
        //   type: GLOBALTYPES.ID_APP,
        //   payload: id_app.data[0],
        // });

        //get properties in profile
        // const profile = await getDataAPI("profile", jsonToken);
        // dispatch({
        //   type: PROFILE_TYPES.GET_PROFILE,
        //   payload: profile.data,
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return add;
};

export const getUserFostech = (token) => async (dispatch) => {
  try {
    const res = await getDataFostech("customer", token);
    console.log(res);
    dispatch({
      type: PROFILE_TYPES.GET_USERFOSTECH,
      payload: res.data.filter(
        (items) => items.email !== "" && items.email !== undefined
      ),
    });
  } catch (error) {
    console.log(error);
  }
};

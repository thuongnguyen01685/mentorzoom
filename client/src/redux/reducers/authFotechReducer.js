import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {};
const authFostechReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH_FOSTECH:
      return action.payload;
    default:
      return state;
  }
};

export default authFostechReducer;

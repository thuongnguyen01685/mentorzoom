import { PROFILE_TYPES } from "../actions/authAction";
import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  userFostech: [],
};
const ListUserFostechReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.GET_USERFOSTECH: {
      return {
        userFostech: action.payload,
      };
    }

    default:
      return state;
  }
};

export default ListUserFostechReducer;
